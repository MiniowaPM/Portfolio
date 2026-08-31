import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import fragmentShader from '../../shaders/rain/fragment.glsl';
import vertexShader from '../../shaders/rain/vertex.glsl';

const generateRainData = (count: number) => {
  const pos = new Float32Array(count * 3);
  const rnd = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    pos[i * 3 + 0] = Math.random() * 400;
    pos[i * 3 + 1] = Math.random() * 200;
    pos[i * 3 + 2] = Math.random() * 400;
    rnd[i] = Math.random();
  }
  return { pos, rnd };
};

interface RainProps {
  active: boolean;
  count?: number;
  speed?: number;
  color?: string;
}

export const Rain = ({ active, count = 50000, speed = 1.0, color = '#b3cce6' }: RainProps) => {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const { pos, rnd } = useMemo(() => generateRainData(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0.0 },
      uSpeed: { value: 1.0 },
      uColor: { value: new THREE.Color('#005E91') },
    }),
    []
  );

  useFrame((state) => {
    if (matRef.current && active) {
      matRef.current.uniforms.uTime.value = state.clock.elapsedTime;

      // Dynamiczna aktualizacja parametrów w locie!
      matRef.current.uniforms.uSpeed.value = speed;
      matRef.current.uniforms.uColor.value.set(color);
    }
  });

  if (!active) return null;

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[pos, 3]} />
        <bufferAttribute attach="attributes-aRandom" args={[rnd, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={matRef}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </points>
  );
};
