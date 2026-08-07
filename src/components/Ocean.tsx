import { shaderMaterial } from '@react-three/drei';
import { extend, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

import fragmentShader from '../shaders/ocean/fragment.glsl';
import vertexShader from '../shaders/ocean/vertex.glsl';

const OceanMaterial = shaderMaterial(
  {
    uTime: 0,
    uDepthColor: new THREE.Color('#1e4877'),
    uSurfaceColor: new THREE.Color('#4d9eea'),
  },
  vertexShader,
  fragmentShader
);

extend({ OceanMaterial });

declare module '@react-three/fiber' {
  interface ThreeElements {
    oceanMaterial: ThreeElements['shaderMaterial'] & {
      uTime?: number;
      uDepthColor?: THREE.Color | string;
      uSurfaceColor?: THREE.Color | string;
    };
  }
}

type OceanMaterialType = THREE.ShaderMaterial & {
  uTime: number;
};

export const Ocean = () => {
  const materialRef = useRef<OceanMaterialType>(null);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uTime = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      {/* Płaszczyzna 100x100 z siatką 256x256 segmentów pod algorytm FFT */}
      <planeGeometry args={[100, 100, 256, 256]} />
      <oceanMaterial ref={materialRef} wireframe={false} />
    </mesh>
  );
};
