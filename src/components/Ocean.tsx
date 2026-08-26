import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFFT } from '../hooks/useFFT';

import fragmentShader from '../shaders/ocean/fragment.glsl';
import vertexShader from '../shaders/ocean/vertex.glsl';

export const Ocean = ({
  windSpeed = 4.0,
  fetch = 5000.0,
  depthWaterColor = '#061d3d',
  surfaceWaterColor = '#1ca3ec',
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const depthTargetColor = useRef(new THREE.Color(depthWaterColor));
  const surfaceTargetColor = useRef(new THREE.Color(surfaceWaterColor));

  const targetSettings = useMemo(
    () => ({
      resolution: 512,
      size: 500.0,
      windSpeed,
      windDirection: Math.PI / 4,
      fetch,
      depth: 200.0,
    }),
    [windSpeed, fetch]
  );

  useFFT(materialRef, targetSettings);

  const uniforms = useMemo(
    () => ({
      uDisplacementMap: { value: null },
      uTime: { value: 0.0 },
      uDepthColor: { value: new THREE.Color(depthWaterColor) },
      uSurfaceColor: { value: new THREE.Color(surfaceWaterColor) },
      uSkyColor: { value: new THREE.Color('#87CEEB') },
      uFoamColor: { value: new THREE.Color('#ffffff') },
      uSunPosition: { value: new THREE.Vector3(5.0, 10.0, -10.0).normalize() },
    }),
    []
  );

  const offsets = useMemo(() => {
    const grid = [];
    const gridSize = 3;
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

  useEffect(() => {
    depthTargetColor.current.set(depthWaterColor);
    surfaceTargetColor.current.set(surfaceWaterColor);
  }, [depthWaterColor, surfaceWaterColor]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      materialRef.current.uniforms.uDepthColor.value.lerp(depthTargetColor.current, delta * 0.5);
      materialRef.current.uniforms.uSurfaceColor.value.lerp(
        surfaceTargetColor.current,
        delta * 0.5
      );
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
