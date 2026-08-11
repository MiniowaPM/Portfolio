import { Environment, OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ocean } from '../components/Ocean';
import { Ship } from '../components/Ship';

function MainScene() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Canvas camera={{ position: [0, 20, 30], fov: 45, far: 2000 }} shadows>
        <color attach="background" args={['#87CEEB']} />
        <Sky distance={450000} sunPosition={[5, 1, 8]} inclination={0} azimuth={0.25} />
        <Environment preset="city" />
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <OrbitControls
          makeDefault
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.5}
          minDistance={10}
          maxDistance={300}
        />{' '}
        <Ocean />
        <Ship />
      </Canvas>

      {/* Warstwa UI (nakładka HTML/Tailwind) */}
      <div className="pointer-events-none absolute top-0 left-0 flex h-full w-full items-start justify-center p-8">
        <h1 className="text-3xl font-bold tracking-widest text-white drop-shadow-lg">
          SYMULACJA FFT
        </h1>
      </div>
    </div>
  );
}

export default MainScene;
