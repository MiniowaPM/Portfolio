import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { FullScreenQuad } from 'three-stdlib';

import evolutionFragmentShader from '../shaders/ocean/evolution.glsl';
import ifftFragmentShader from '../shaders/ocean/ifft.glsl';
import { generateButterflyData, generateTMASpectrum, type TMASettings } from '../shaders/ocean/tma';

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

export const useFFT = (materialRef: RefObject<THREE.ShaderMaterial | null>) => {
  const { gl } = useThree();

  const computeData = useRef<{
    pingTarget: THREE.WebGLRenderTarget;
    pongTarget: THREE.WebGLRenderTarget;
    evolutionMaterial: THREE.ShaderMaterial;
    ifftMaterial: THREE.ShaderMaterial;
    quad: FullScreenQuad;
  } | null>(null);

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

    // --- PHASE 1: CPU PRECOMPUTATION ---
    const tmaSettings: TMASettings = {
      resolution: RESOLUTION,
      size: 1000.0,
      windSpeed: 22.0,
      windDirection: Math.PI / 4,
      fetch: 500000.0,
      depth: 200.0,
    };

    const h0Texture = generateTMASpectrum(tmaSettings);

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
        uH0: { value: h0Texture },
        uTime: { value: 0 },
        uSize: { value: tmaSettings.size },
        uDepth: { value: tmaSettings.depth },
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

    computeData.current = { pingTarget, pongTarget, evolutionMaterial, ifftMaterial, quad };

    return () => {
      pingTarget.dispose();
      pongTarget.dispose();
      evolutionMaterial.dispose();
      ifftMaterial.dispose();
      quad.dispose();
      h0Texture.dispose();
      butterflyTexture.dispose();
    };
  }, [gl]);

  // ==== RENDER LOOP ====
  useFrame((state) => {
    if (!computeData.current) return;
    const { pingTarget, pongTarget, evolutionMaterial, ifftMaterial, quad } = computeData.current;

    // ==========================================
    // STAGE 1: TIME EVOLUTION
    // ==========================================
    // Write H(k, t) directly to pingTarget
    evolutionMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    quad.material = evolutionMaterial;
    gl.setRenderTarget(pingTarget);
    quad.render(gl);

    // Ustawiamy pętlę pod IFFT
    let readTarget = pingTarget;
    let writeTarget = pongTarget;
    quad.material = ifftMaterial;

    // ==========================================
    // STAGE 2: HORIZONTAL FFT PASSES (X)
    // ==========================================
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

    // ==========================================
    // STAGE 3: VERTICAL FFT PASSES (Y)
    // ==========================================
    ifftMaterial.uniforms.uDirection.value = 1;
    for (let i = 0; i < STAGES; i++) {
      ifftMaterial.uniforms.uStage.value = i;
      ifftMaterial.uniforms.uPingPong.value = readTarget.texture;
      // Reverse checkerboard sign only in the last pass (Y direction, last stage)
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

    // Store the final read target for ship buoyancy
    oceanPhysics.readTarget = readTarget;
  });
};
