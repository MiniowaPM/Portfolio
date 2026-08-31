import { useFrame } from '@react-three/fiber';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import * as THREE from 'three';
import { type IslandData, ISLANDS } from '../../data/islandsData';

interface IslandSystemProps {
  shipPositionRef: React.MutableRefObject<THREE.Vector3>;
  onIslandStateChange?: (discovered: IslandData | null) => void;
}

// ==========================================
// 1. 3D MESHES (Rendered inside <Canvas>)
// ==========================================
export const IslandMeshes: React.FC<IslandSystemProps> = ({
  shipPositionRef,
  onIslandStateChange,
}) => {
  useFrame(() => {
    if (!shipPositionRef.current) return;

    let closest: IslandData | null = null;
    const shipPos = shipPositionRef.current;

    for (const island of ISLANDS) {
      const islandPos = new THREE.Vector3(...island.position);
      const distance = shipPos.distanceTo(islandPos);

      if (distance < island.triggerDistance) {
        closest = island;
        break;
      }
    }

    if (onIslandStateChange) {
      onIslandStateChange(closest);
    }
  });

  return (
    <>
      {ISLANDS.map((island) => (
        <group key={island.id} position={island.position}>
          <mesh position={[0, 10, 0]}>
            <coneGeometry args={[15, 35, 4]} />
            <meshStandardMaterial color="#2d6a4f" wireframe={false} />
          </mesh>
        </group>
      ))}
    </>
  );
};

// ==========================================
// 2. UI / HTML (Stały, czytelny panel HUD po prawej)
// ==========================================
interface IslandHUDProps {
  discoveredIsland: IslandData | null;
  activeIsland: IslandData | null;
  setActiveIsland: (island: IslandData | null) => void;
}

export const IslandHUD: React.FC<IslandHUDProps> = ({
  discoveredIsland,
  activeIsland,
  setActiveIsland,
}) => {
  return (
    <div className="pointer-events-none absolute inset-0 z-40 flex justify-between p-8">
      {/* Panel po prawej stronie */}
      <div className="absolute top-1/2 right-8 flex -translate-y-1/2 flex-col items-end">
        <AnimatePresence mode="wait">
          {discoveredIsland && !activeIsland && (
            <motion.div
              key="radar-alert"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', stiffness: 280, damping: 25 }}
              className="glass border-primary/40 bg-primary/10 pointer-events-auto flex w-95 flex-col gap-4 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-3">
                <div className="bg-primary/20 flex h-10 w-10 animate-pulse items-center justify-center rounded-full text-xl">
                  ⚓
                </div>
                <div>
                  <span className="text-primary text-xs font-bold tracking-widest uppercase">
                    Island in Range
                  </span>
                  <h3 className="text-lg font-extrabold">{discoveredIsland.title}</h3>
                </div>
              </div>

              <p className="text-xs leading-relaxed opacity-80">
                You have dropped anchor near this destination. Click below to inspect the island
                archives and portfolio data.
              </p>

              <button
                onClick={() => setActiveIsland(discoveredIsland)}
                className="btn btn-primary btn-md w-full font-bold shadow-lg"
              >
                Explore Island Archives →
              </button>
            </motion.div>
          )}

          {activeIsland && (
            <motion.div
              key="active-modal"
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 40 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="glass pointer-events-auto flex w-[90vw] max-w-130 flex-col gap-6 rounded-3xl border border-white/20 p-8 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-black tracking-wide">{activeIsland.title}</h2>
                  <p className="text-primary mt-1 text-xs font-semibold tracking-widest uppercase">
                    {activeIsland.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setActiveIsland(null)}
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  ✕
                </button>
              </div>

              <p className="text-sm leading-relaxed opacity-90">{activeIsland.description}</p>

              <div className="flex flex-col gap-2 rounded-2xl border border-white/5 bg-black/20 p-4">
                {activeIsland.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-xs opacity-90">
                    <span className="mt-0.5">•</span>
                    <span>{detail}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {activeIsland.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="badge badge-sm badge-outline border-white/20 px-3 py-2 text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="card-actions mt-2 justify-end gap-2">
                <button onClick={() => setActiveIsland(null)} className="btn btn-sm btn-ghost">
                  Close / Sail Away
                </button>
                <a
                  href={activeIsland.link}
                  className="btn btn-sm btn-primary px-5 font-bold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Details →
                </a>
              </div>
            </motion.div>
          )}

          {!discoveredIsland && !activeIsland && (
            <motion.div
              key="radar-idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="glass rounded-2xl border border-white/5 px-5 py-3 text-right backdrop-blur-md"
            >
              <div className="font-mono text-[10px] tracking-widest uppercase opacity-60">
                Radar Status
              </div>
              <div className="mt-0.5 flex items-center justify-end gap-2 text-xs font-semibold">
                <span className="bg-success h-2 w-2 animate-ping rounded-full"></span>
                <span>Searching for Islands...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
