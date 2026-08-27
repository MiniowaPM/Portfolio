import { Environment, OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { BottomTelemetryBar } from '../components/BottomTelemetryBar';
import { Compass } from '../components/Compass';
import { IslandHUD, IslandMeshes } from '../components/IslandSystem';
import { Ocean } from '../components/Ocean';
import { Rain } from '../components/Rain';
import { Ship } from '../components/Ship';
import { TopNavbar } from '../components/TopNavbar';
import { type IslandData } from '../data/islandsData';
import { ControlPanel } from './ControlPanel';
import { WeatherEffects } from './WetherEffect';

function MainScene() {
  const [isStorm, setIsStorm] = useState(false);
  const [windSpeed, setWindSpeed] = useState(4.0);
  const [fetch, setFetch] = useState(5000.0);

  const [discoveredIsland, setDiscoveredIsland] = useState<IslandData | null>(null);
  const [activeIsland, setActiveIsland] = useState<IslandData | null>(null);
  const shipPositionRef = useRef(new THREE.Vector3(0, 0, 0));

  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [heading, setHeading] = useState(0);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'calm');
    document.documentElement.classList.remove('dark');
  }, []);

  const handleToggleStorm = () => {
    const nextStorm = !isStorm;
    setIsStorm(nextStorm);

    document.documentElement.setAttribute('data-theme', nextStorm ? 'storm' : 'calm');

    if (nextStorm) {
      setWindSpeed(22.0);
      setFetch(100000.0);
    } else {
      setWindSpeed(4.0);
      setFetch(5000.0);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-900">
      <TopNavbar activeIsland={activeIsland} />
      <button
        onClick={() => setIsPanelVisible(!isPanelVisible)}
        className={`btn btn-circle glass pointer-events-auto absolute top-24 z-50 border border-white/20 shadow-2xl transition-all duration-300 ${
          isPanelVisible
            ? 'bg-primary text-primary-content left-90'
            : 'bg-base-100/80 hover:bg-base-100 left-8'
        }`}
        title={isPanelVisible ? 'Hide Control Panel' : 'Open Control Panel'}
      >
        ⚙️
      </button>
      <Compass heading={heading} />
      <AnimatePresence>
        {isPanelVisible && (
          <motion.div
            initial={{ opacity: 0, x: -100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="pointer-events-auto absolute top-0 left-2 z-40"
          >
            <ControlPanel
              windSpeed={windSpeed}
              onWindSpeedChange={setWindSpeed}
              fetch={fetch}
              onFetchChange={setFetch}
              isStorm={isStorm}
              onToggleStorm={handleToggleStorm}
              volume={volume}
              onVolumeChange={setVolume}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <IslandHUD
        discoveredIsland={discoveredIsland}
        activeIsland={activeIsland}
        setActiveIsland={setActiveIsland}
      />
      <BottomTelemetryBar shipPositionRef={shipPositionRef} isStorm={isStorm} />
      <Canvas camera={{ position: [0, 20, 30], fov: 45, far: 2000 }} shadows>
        <Environment preset={isStorm ? 'night' : 'city'} />
        <OrbitControls
          makeDefault
          enablePan={false}
          maxPolarAngle={Math.PI / 2 - 0.5}
          minDistance={10}
          maxDistance={300}
        />{' '}
        <HeadingUpdater onUpdate={setHeading} />
        <WeatherEffects isStorm={isStorm} />
        <Ocean windSpeed={windSpeed} fetch={fetch} isStorm={isStorm} />
        <Ship shipPositionRef={shipPositionRef} />
        <Rain active={isStorm} count={50000} speed={0.5} color="#8282ff" />
        <IslandMeshes shipPositionRef={shipPositionRef} onIslandStateChange={setDiscoveredIsland} />
      </Canvas>
    </div>
  );
}

function HeadingUpdater({ onUpdate }: { onUpdate: (heading: number) => void }) {
  useFrame((state) => {
    const camera = state.camera;
    const direction = camera.getWorldDirection(new THREE.Vector3());
    let angle = Math.atan2(direction.x, direction.z) * (180 / Math.PI);
    if (angle < 0) angle += 360;
    onUpdate(Math.round(angle));
  });
  return null;
}

export default MainScene;
