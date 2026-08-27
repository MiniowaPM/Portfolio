import React, { useState } from 'react';
import * as THREE from 'three';

interface BottomTelemetryBarProps {
  shipPositionRef: React.MutableRefObject<THREE.Vector3>;
  isStorm: boolean;
}

export const BottomTelemetryBar: React.FC<BottomTelemetryBarProps> = ({
  shipPositionRef,
  isStorm,
}) => {
  const [pos, setPos] = React.useState({ x: 0, z: 0 });
  const [fps, setFps] = useState(0);

  React.useEffect(() => {
    let animationFrameId: number;

    let frames = 0;
    let lastTime = performance.now();

    const updatePosition = () => {
      if (shipPositionRef.current) {
        setPos({
          x: Math.round(shipPositionRef.current.x),
          z: Math.round(shipPositionRef.current.z),
        });
      }
      frames++;
      const currentTime = performance.now();
      if (currentTime > lastTime + 1000) {
        setFps(Math.round((frames * 1000) / (currentTime - lastTime)));
        frames = 0;
        lastTime = currentTime;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);

    return () => cancelAnimationFrame(animationFrameId);
  }, [shipPositionRef]);

  const getFpsColor = () => {
    if (fps >= 50) return 'bg-success'; // Powyżej 50 FPS - Zielony
    if (fps >= 30) return 'bg-warning'; // Pomiędzy 30 a 50 - Żółty
    return 'bg-error'; // Poniżej 30 FPS - Czerwony
  };

  return (
    <footer className="pointer-events-none absolute bottom-4 left-1/2 z-40 w-[90%] max-w-4xl -translate-x-1/2">
      <div className="glass pointer-events-auto flex flex-wrap items-center justify-between rounded-2xl border border-white/10 px-6 py-3 font-mono text-xs opacity-90 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <span className="opacity-65">GPS POSITION:</span>
          <span className="text-primary font-bold">X: {pos.x}m</span>
          <span className="text-primary font-bold">Z: {pos.z}m</span>
        </div>

        {/* Status pogody / środowiska */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="opacity-65">ENVIRONMENT:</span>
          <span
            className={`rounded-md px-2 py-0.5 font-bold ${isStorm ? 'bg-error/20 text-error' : 'bg-success/20 text-success'}`}
          >
            {isStorm ? '⚡ STORM ACTIVE' : '☀️ CALM SEAS'}
          </span>
        </div>

        {/* Silnik / FPS */}
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 animate-pulse rounded-full ${getFpsColor()}`}></span>
          <span className="opacity-80">ENGINE: {fps > 0 ? fps : '--'} FPS (WebGL)</span>
        </div>
      </div>
    </footer>
  );
};
