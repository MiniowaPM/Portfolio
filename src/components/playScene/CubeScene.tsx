import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const TestCube = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="#3b82f6" />
    </mesh>
  );
};

function CubeScene() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Canvas camera={{ position: [0, 2, 6], fov: 50 }} shadows>
        <Environment preset="city" />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} castShadow />
        <TestCube />
        <OrbitControls makeDefault />
      </Canvas>

      <div className="pointer-events-none absolute top-20 left-0 flex h-full w-full items-center justify-center">
        <h1 className="mt-64 text-4xl font-bold tracking-widest text-white/50">Cube Scene</h1>
      </div>
    </div>
  );
}

export default CubeScene;
