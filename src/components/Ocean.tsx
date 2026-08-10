import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFFT } from '../shaders/ocean/useFFT';

import fragmentShader from '../shaders/ocean/fragment.glsl';
import vertexShader from '../shaders/ocean/vertex.glsl';

export const Ocean = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFFT(materialRef);

  const uniforms = useMemo(
    () => ({
      uDisplacementMap: { value: null },
      uTime: { value: 0.0 },
      uDepthColor: { value: new THREE.Color('#061d3d') }, // Deep ocean blue
      uSurfaceColor: { value: new THREE.Color('#1ca3ec') }, // Clear water blue
      uSkyColor: { value: new THREE.Color('#87CEEB') },
      uFoamColor: { value: new THREE.Color('#ffffff') },
      uSunPosition: { value: new THREE.Vector3(5.0, 10.0, -10.0).normalize() },
    }),
    []
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      {/* 256x256 grid, 1000x1000 size to accommodate large storm waves */}
      <planeGeometry args={[1000, 1000, 512, 512]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        wireframe={false}
      />
    </mesh>
  );
};
