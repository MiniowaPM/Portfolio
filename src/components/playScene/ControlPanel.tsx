import React from 'react';

interface ControlPanelProps {
  windSpeed: number;
  onWindSpeedChange: (val: number) => void;
  fetch: number;
  onFetchChange: (val: number) => void;
  isStorm: boolean;
  onToggleStorm: () => void;
  volume: number;
  onVolumeChange: (val: number) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  windSpeed,
  onWindSpeedChange,
  fetch,
  onFetchChange,
  isStorm,
  onToggleStorm,
  volume,
  onVolumeChange,
}) => {
  return (
    <div className="glass animate-fade-in pointer-events-auto absolute top-24 left-6 z-50 flex w-80 flex-col gap-5 rounded-3xl border border-white/15 p-6 shadow-2xl backdrop-blur-xl">
      {/* Nagłówek */}
      <div>
        <h1 className="flex items-center gap-2 text-xl font-extrabold tracking-wide">
          <span>🌊</span> Ocean Simulator
        </h1>
        <p className="mt-0.5 text-xs opacity-70">Interactive FFT & Weather HUD</p>
      </div>

      {/* Przycisk trybu sztormu */}
      <button
        onClick={onToggleStorm}
        className={`btn font-bold shadow-lg transition-transform active:scale-95 ${
          isStorm ? 'btn-error' : 'btn-primary'
        }`}
      >
        {isStorm ? '☀️ Switch to Calm' : '⚡ Activate Storm'}
      </button>

      {/* Sekcja Audio: Suwak głośności (Input Range) */}
      <div className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-black/20 p-3.5">
        <div className="flex justify-between font-mono text-[10px] tracking-widest uppercase opacity-70">
          <span>Audio Volume</span>
          <span className="text-primary font-bold">{Math.round(volume)}%</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          value={volume}
          onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
          className="range range-primary range-xs"
        />
      </div>

      <div className="divider my-0 opacity-20"></div>

      {/* Suwaki zaawansowane */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-semibold tracking-wider uppercase opacity-80">
            <span>Wind Speed</span>
            <span className="text-primary font-mono">{windSpeed.toFixed(1)} m/s</span>
          </div>
          <input
            type="range"
            min="2"
            max="30"
            step="0.5"
            value={windSpeed}
            onChange={(e) => onWindSpeedChange(parseFloat(e.target.value))}
            className="range range-primary range-xs"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs font-semibold tracking-wider uppercase opacity-80">
            <span>Fetch Distance</span>
            <span className="text-primary font-mono">{(fetch / 1000).toFixed(0)} km</span>
          </div>
          <input
            type="range"
            min="2000"
            max="150000"
            step="1000"
            value={fetch}
            onChange={(e) => onFetchChange(parseFloat(e.target.value))}
            className="range range-primary range-xs"
          />
        </div>
      </div>
    </div>
  );
};
