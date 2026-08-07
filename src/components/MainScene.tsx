import { OrbitControls, Sky } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Ocean } from '../components/Ocean';

function MainScene() {
  return (
    <div className="h-screen w-screen bg-gray-900">
      <Canvas camera={{ position: [0, 5, 15], fov: 45 }}>
        <Sky distance={450000} sunPosition={[5, 1, 8]} inclination={0} azimuth={0.25} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Ocean />
        <OrbitControls makeDefault maxPolarAngle={Math.PI / 2 - 0.1} />
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
