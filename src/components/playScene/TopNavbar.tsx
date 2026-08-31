import React from 'react';
import { ISLANDS, type IslandData } from '../../data/islandsData';

interface TopNavbarProps {
  activeIsland: IslandData | null;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ activeIsland }) => {
  return (
    <header className="pointer-events-none absolute top-0 right-0 left-0 z-50 flex items-center justify-between px-8 py-5">
      {/* Logo / Imię i Nazwisko */}
      <div className="glass pointer-events-auto flex items-center gap-3 rounded-2xl border border-white/10 px-5 py-2.5 shadow-lg">
        <span className="bg-primary h-3 w-3 animate-pulse rounded-full"></span>
        <span className="text-sm font-extrabold tracking-wider">
          MIKOŁAJ M. <span className="font-normal opacity-60">| Creative Dev</span>
        </span>
      </div>

      {/* Status wysp */}
      <div className="glass pointer-events-auto hidden items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 font-mono text-xs shadow-lg md:flex">
        <span className="mr-2 opacity-60">ARCHIPELAGOS:</span>
        {ISLANDS.map((island) => {
          const isActive = activeIsland?.id === island.id;
          return (
            <span
              key={island.id}
              className={`rounded-xl px-2.5 py-1 transition-all ${
                isActive
                  ? 'bg-primary text-primary-content font-bold shadow'
                  : 'bg-white/5 opacity-70'
              }`}
            >
              {island.title.split(':')[0]}
            </span>
          );
        })}
      </div>
    </header>
  );
};
