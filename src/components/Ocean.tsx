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
      uDisplacementMap: { value: null }, // To zostanie nadpisane przez useFFT
      uTime: { value: 0.0 },
      uDepthColor: { value: new THREE.Color('#0b1b36') },
      uSurfaceColor: { value: new THREE.Color('#1464b5') },
      // Dodajemy wirtualne słońce do oświetlenia oceanu (potrzebne we fragment shader)
      uSunPosition: { value: new THREE.Vector3(5.0, 5.0, 5.0).normalize() },
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
      {/* Siatka 256x256, aby pokrywała się z pikselami mapy GPGPU */}
      <planeGeometry args={[100, 100, 256, 256]} />
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
