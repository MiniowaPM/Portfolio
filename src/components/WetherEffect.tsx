import { Sky } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

export function WeatherEffects({ isStorm }: { isStorm: boolean }) {
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  const ambientLightRef = useRef<THREE.AmbientLight>(null);

  const currentSunPos = useRef(new THREE.Vector3(5, 5, 8));
  const [skySunPos, setSkySunPos] = useState<[number, number, number]>([5, 5, 8]);

  const targetStormColor = new THREE.Color('#4a5c75'); // Chłodny granat księżyca
  const targetCalmColor = new THREE.Color('#ffffff'); // Ciepłe słońce

  useFrame((_, delta) => {
    // Ustawienia docelowe w zależności od pogody
    const targetY = isStorm ? -0.5 : 5; // Słońce wschodzi (5) lub zachodzi (-0.5)
    const targetAmbient = isStorm ? 0.25 : 1.5; // Zmrok
    const targetDirIntensity = isStorm ? 0.1 : 1.0; // Słabsze światło księżyca

    if (ambientLightRef.current) {
      ambientLightRef.current.intensity = THREE.MathUtils.lerp(
        ambientLightRef.current.intensity,
        targetAmbient,
        delta * 1.5
      );
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        targetDirIntensity,
        delta * 1.5
      );
      const currentColor = dirLightRef.current.color;
      currentColor.lerp(isStorm ? targetStormColor : targetCalmColor, delta * 1.5);
    }

    if (dirLightRef.current) {
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        targetDirIntensity,
        delta * 1.5
      );

      const currentColor = dirLightRef.current.color;
      currentColor.lerp(isStorm ? targetStormColor : targetCalmColor, delta * 1.5);
    }

    currentSunPos.current.y = THREE.MathUtils.lerp(currentSunPos.current.y, targetY, delta * 1.5);

    if (Math.abs(skySunPos[1] - currentSunPos.current.y) > 0.05) {
      setSkySunPos([5, currentSunPos.current.y, 8]);
    }
  });
  return (
    <>
      {/* Słońce / Niebo */}
      <Sky
        distance={450000}
        sunPosition={skySunPos}
        inclination={0}
        azimuth={0.25}
        turbidity={isStorm ? 5.0 : 0.1}
        rayleigh={isStorm ? 2.0 : 0.5}
      />

      <ambientLight ref={ambientLightRef} intensity={1.5} />

      <directionalLight ref={dirLightRef} position={skySunPos} intensity={1} castShadow />
    </>
  );
}
