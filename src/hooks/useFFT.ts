import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { FullScreenQuad } from 'three-stdlib';

import evolutionFragmentShader from '../shaders/ocean/evolution.glsl';
import ifftFragmentShader from '../shaders/ocean/ifft.glsl';
import {
  generateButterflyData,
  initTMASpectrum,
  updateTMASpectrum,
  type TMAContext,
  type TMASettings,
} from '../shaders/ocean/tma';

const RESOLUTION = 512;
const STAGES = Math.log2(RESOLUTION);

const quadVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

export const oceanPhysics = {
  readTarget: null as THREE.WebGLRenderTarget | null,
  size: 500.0,
  resolution: RESOLUTION,
};

export const useFFT = (
  materialRef: RefObject<THREE.ShaderMaterial | null>,
  targetSettings: TMASettings
) => {
  const { gl } = useThree();

  const computeData = useRef<{
    pingTarget: THREE.WebGLRenderTarget;
    pongTarget: THREE.WebGLRenderTarget;
    evolutionMaterial: THREE.ShaderMaterial;
    ifftMaterial: THREE.ShaderMaterial;
    quad: FullScreenQuad;
    tmaContext: TMAContext;
  } | null>(null);

  const currentSettings = useRef<TMASettings>({ ...targetSettings });

  useEffect(() => {
    const targetOptions: THREE.RenderTargetOptions = {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      type: gl.capabilities.isWebGL2 ? THREE.FloatType : THREE.HalfFloatType,
      depthBuffer: false,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
    };

    const pingTarget = new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, targetOptions);
    const pongTarget = new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, targetOptions);

    const tmaContext = initTMASpectrum(currentSettings.current);

    const butterflyData = generateButterflyData(RESOLUTION);
    const butterflyTexture = new THREE.DataTexture(
      butterflyData,
      RESOLUTION,
      STAGES,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    butterflyTexture.needsUpdate = true;

    // --- PHASE 2: EVOLUTION SHADER ---
    const evolutionMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uH0: { value: tmaContext.texture },
        uTime: { value: 0 },
        uSize: { value: currentSettings.current.size },
        uDepth: { value: currentSettings.current.depth },
        resolution: { value: new THREE.Vector2(RESOLUTION, RESOLUTION) },
      },
      vertexShader: quadVertexShader,
      fragmentShader: evolutionFragmentShader,
    });

    // --- PHASE 3: IFFT SHADER ---
    const ifftMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPingPong: { value: null },
        uTwiddleIndices: { value: butterflyTexture },
        uTwiddleResolution: { value: new THREE.Vector2(RESOLUTION, STAGES) },
        uStage: { value: 0 },
        uDirection: { value: 0 },
        uFinalPass: { value: false },
        resolution: { value: new THREE.Vector2(RESOLUTION, RESOLUTION) },
      },
      vertexShader: quadVertexShader,
      fragmentShader: ifftFragmentShader,
    });

    const quad = new FullScreenQuad(evolutionMaterial);

    computeData.current = {
      pingTarget,
      pongTarget,
      evolutionMaterial,
      ifftMaterial,
      quad,
      tmaContext,
    };

    return () => {
      pingTarget.dispose();
      pongTarget.dispose();
      evolutionMaterial.dispose();
      ifftMaterial.dispose();
      quad.dispose();
      tmaContext.texture.dispose();
      butterflyTexture.dispose();
    };
  }, [gl]);

  // ==== RENDER LOOP ====
  useFrame((state, delta) => {
    if (!computeData.current) return;
    const { pingTarget, pongTarget, evolutionMaterial, ifftMaterial, quad, tmaContext } =
      computeData.current;

    // ==========================================
    // STAGE 0: DYNAMIC WEATHER UPDATE (LERP)
    // ==========================================
    const lerpSpeed = delta * 0.5;
    currentSettings.current.windSpeed = THREE.MathUtils.lerp(
      currentSettings.current.windSpeed,
      targetSettings.windSpeed,
      lerpSpeed
    );
    currentSettings.current.fetch = THREE.MathUtils.lerp(
      currentSettings.current.fetch,
      targetSettings.fetch,
      lerpSpeed
    );

    // Nadpisujemy teksturę H0 w pamięci nowymi, zinterpolowanymi wartościami
    updateTMASpectrum(currentSettings.current, tmaContext);

    // ==========================================
    // STAGE 1: TIME EVOLUTION
    // ==========================================
    evolutionMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    quad.material = evolutionMaterial;
    gl.setRenderTarget(pingTarget);
    quad.render(gl);

    let readTarget = pingTarget;
    let writeTarget = pongTarget;
    quad.material = ifftMaterial;

    ifftMaterial.uniforms.uDirection.value = 0;
    for (let i = 0; i < STAGES; i++) {
      ifftMaterial.uniforms.uStage.value = i;
      ifftMaterial.uniforms.uPingPong.value = readTarget.texture;
      ifftMaterial.uniforms.uFinalPass.value = false;
      gl.setRenderTarget(writeTarget);
      quad.render(gl);
      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    }

    ifftMaterial.uniforms.uDirection.value = 1;
    for (let i = 0; i < STAGES; i++) {
      ifftMaterial.uniforms.uStage.value = i;
      ifftMaterial.uniforms.uPingPong.value = readTarget.texture;
      ifftMaterial.uniforms.uFinalPass.value = i === STAGES - 1;
      gl.setRenderTarget(writeTarget);
      quad.render(gl);
      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    }

    // ==========================================
    // STAGE 4: OUTPUT TO VISUALIZATION
    // ==========================================
    gl.setRenderTarget(null);
    if (materialRef.current) {
      materialRef.current.uniforms.uDisplacementMap.value = readTarget.texture;
    }

    oceanPhysics.readTarget = readTarget;
  });
};
