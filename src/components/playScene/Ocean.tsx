import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFFT } from '../../hooks/useFFT';

import fragmentShader from '../../shaders/ocean/fragment.glsl';
import vertexShader from '../../shaders/ocean/vertex.glsl';

export const Ocean = ({
  windSpeed = 4.0,
  fetch = 5000.0,
  isStorm = false,
  depthWaterColor = '#061d3d',
  surfaceWaterColor = '#1ca3ec',
  skyColor = '#87CEEB',
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const depthTargetColor = useRef(new THREE.Color(depthWaterColor));
  const surfaceTargetColor = useRef(new THREE.Color(surfaceWaterColor));
  const skyTargetColor = useRef(new THREE.Color(skyColor));

  const lightIntensityRef = useRef(1.0);
  const ambientIntensityRef = useRef(1.0);

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
      uLightIntensity: { value: 1.0 },
      uAmbientIntensity: { value: 1.0 },
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
    if (isStorm) {
      depthTargetColor.current.set('#0d1e38');
      surfaceTargetColor.current.set('#16355d');
      skyTargetColor.current.set('#0c131e');
      lightIntensityRef.current = 0.1;
      ambientIntensityRef.current = 0.6;
    } else {
      depthTargetColor.current.set(depthWaterColor);
      surfaceTargetColor.current.set(surfaceWaterColor);
      skyTargetColor.current.set(skyColor);
      lightIntensityRef.current = 1.0;
      ambientIntensityRef.current = 1.0;
    }
  }, [isStorm, depthWaterColor, surfaceWaterColor, skyColor]);

  useEffect(() => {
    materialRef.current = oceanMaterial;
  }, [oceanMaterial]);

  useFrame((state, delta) => {
    if (materialRef.current) {
      const mat = materialRef.current.uniforms;
      mat.uTime.value = state.clock.elapsedTime;

      const sunY = isStorm ? 3.0 : 5.0;
      mat.uSunPosition.value.lerp(new THREE.Vector3(5.0, sunY, -10.0).normalize(), delta * 1.5);

      mat.uDepthColor.value.lerp(depthTargetColor.current, delta * 1.5);
      mat.uSurfaceColor.value.lerp(surfaceTargetColor.current, delta * 1.5);
      mat.uSkyColor.value.lerp(skyTargetColor.current, delta * 1.5);

      mat.uLightIntensity.value = THREE.MathUtils.lerp(
        mat.uLightIntensity.value,
        lightIntensityRef.current,
        delta * 1.5
      );
      mat.uAmbientIntensity.value = THREE.MathUtils.lerp(
        mat.uAmbientIntensity.value,
        ambientIntensityRef.current,
        delta * 1.5
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
