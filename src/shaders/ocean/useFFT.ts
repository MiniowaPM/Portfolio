import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';
import { FullScreenQuad } from 'three-stdlib';

import evolutionFragmentShader from './evolution.glsl';
import ifftFragmentShader from './ifft.glsl';
import { generateButterflyData, generateTMASpectrum, type TMASettings } from './tma';

const RESOLUTION = 256;
const STAGES = Math.log2(RESOLUTION);

const quadVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

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
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: gl.capabilities.isWebGL2 ? THREE.FloatType : THREE.HalfFloatType,
      depthBuffer: false,
      wrapS: THREE.RepeatWrapping,
      wrapT: THREE.RepeatWrapping,
    };

    const pingTarget = new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, targetOptions);
    const pongTarget = new THREE.WebGLRenderTarget(RESOLUTION, RESOLUTION, targetOptions);

    // --- FAZA 1: CPU PREKOMPUTACJA ---
    const tmaSettings: TMASettings = {
      resolution: RESOLUTION,
      size: 1000.0,
      windSpeed: 15.0,
      windDirection: Math.PI / 4, // 45 stopni
      fetch: 100000.0,
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

    // --- FAZA 2: EWOLUCJA SHADER ---
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

    // --- FAZA 3: IFFT SHADER ---
    const ifftMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPingPong: { value: null },
        uTwiddleIndices: { value: butterflyTexture },
        uTwiddleResolution: { value: new THREE.Vector2(RESOLUTION, STAGES) },
        uStage: { value: 0 },
        uDirection: { value: 0 },
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

  // ==== PĘTLA RENDEROWANIA ====
  useFrame((state) => {
    if (!computeData.current) return;
    const { pingTarget, pongTarget, evolutionMaterial, ifftMaterial, quad } = computeData.current;

    // ==========================================
    // ETAP 1: EWOLUCJA W CZASIE
    // ==========================================
    // Zapisujemy H(k, t) bezpośrednio do pingTarget
    evolutionMaterial.uniforms.uTime.value = state.clock.elapsedTime;
    quad.material = evolutionMaterial;
    gl.setRenderTarget(pingTarget);
    quad.render(gl);

    // Ustawiamy pętlę pod IFFT
    let readTarget = pingTarget;
    let writeTarget = pongTarget;
    quad.material = ifftMaterial;

    // ==========================================
    // ETAP 2: PRZEJŚCIA POZIOME FFT (X)
    // ==========================================
    ifftMaterial.uniforms.uDirection.value = 0;
    for (let i = 0; i < STAGES; i++) {
      ifftMaterial.uniforms.uStage.value = i;
      ifftMaterial.uniforms.uPingPong.value = readTarget.texture;

      gl.setRenderTarget(writeTarget);
      quad.render(gl);

      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    }

    // ==========================================
    // ETAP 3: PRZEJŚCIA PIONOWE FFT (Y)
    // ==========================================
    ifftMaterial.uniforms.uDirection.value = 1;
    for (let i = 0; i < STAGES; i++) {
      ifftMaterial.uniforms.uStage.value = i;
      ifftMaterial.uniforms.uPingPong.value = readTarget.texture;

      gl.setRenderTarget(writeTarget);
      quad.render(gl);

      const temp = readTarget;
      readTarget = writeTarget;
      writeTarget = temp;
    }

    // ==========================================
    // ETAP 4: WYSYŁKA DO WIZUALIZACJI
    // ==========================================
    gl.setRenderTarget(null);
    if (materialRef.current) {
      materialRef.current.uniforms.uDisplacementMap.value = readTarget.texture;
    }
  });
};
