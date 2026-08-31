import React from 'react';

interface CompassProps {
  heading: number;
}

export const Compass: React.FC<CompassProps> = ({ heading }) => {
  return (
    <div className="pointer-events-none absolute top-5 left-1/2 z-40 hidden -translate-x-1/2 md:block">
      <div className="glass flex items-center gap-3 rounded-full border border-white/10 px-6 py-1.5 shadow-lg backdrop-blur-md">
        <span className="font-mono text-[10px] tracking-widest opacity-60">HEADING</span>
        <div className="text-primary font-mono text-xs font-bold tracking-wider">
          {heading}° {getCardinalDirection(heading)}
        </div>
      </div>
    </div>
  );
};

function getCardinalDirection(angle: number): string {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const index = Math.round((angle % 360) / 45);
  return directions[index % 8];
}
