import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFFT } from '../hooks/useFFT';

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

  const offsets = useMemo(() => {
    const grid = [];
    const gridSize = 4;
    const tileSize = 500;

    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        grid.push([x * tileSize, z * tileSize]);
      }
    }
    return grid;
  }, []);

  const oceanGeometry = useMemo(() => new THREE.PlaneGeometry(500, 500, 512, 512), []);

  const oceanMaterial = useMemo(() => {
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: uniforms,
      wireframe: false,
    });

    return material;
  }, [uniforms]);

  useEffect(() => {
    materialRef.current = oceanMaterial;
  }, [oceanMaterial]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return (
    <group>
      {offsets.map(([x, z], index) => (
        <mesh
          key={index}
          position={[x, 0, z]}
          rotation={[-Math.PI / 2, 0, 0]}
          geometry={oceanGeometry}
          material={oceanMaterial}
        />
      ))}
    </group>
  );
};
