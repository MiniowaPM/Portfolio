import React, { useEffect, useRef } from 'react';

interface DroneShutterCanvasProps {
  isActive: boolean;
  direction: 'forward' | 'backward';
  onPeakReached: () => void;
  onComplete: () => void;
}

export const DroneShutterCanvas: React.FC<DroneShutterCanvasProps> = ({
  isActive,
  direction,
  onPeakReached,
  onComplete,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const peakReachedRef = useRef(false);

  useEffect(() => {
    if (!isActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    peakReachedRef.current = false;
    let animationFrameId: number;
    const startTime = performance.now();
    const duration = 1050; // 1.05s crisp mechanical aperture transition

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const width = canvas.width;
    const height = canvas.height;
    const cx = width / 2;
    const cy = height / 2;
    const maxRadius = Math.hypot(cx, cy) * 1.08;

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const numBlades = 8;
    const dirSign = direction === 'forward' ? 1 : -1;

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Swap underlying image at exact midpoint while shutter is 100% closed
      if (progress >= 0.5 && !peakReachedRef.current) {
        peakReachedRef.current = true;
        onPeakReached();
      }

      ctx.clearRect(0, 0, width, height);

      // Compute closure (0 = fully open, 1 = fully locked shut)
      // Hold at 1.0 between progress 0.43 and 0.57 so the lock is rock-solid
      let closure: number;
      if (progress < 0.43) {
        closure = easeInOutCubic(progress / 0.43);
      } else if (progress <= 0.57) {
        closure = 1;
      } else {
        closure = 1 - easeInOutCubic((progress - 0.57) / 0.43);
      }

      // Current aperture inradius (0 when fully closed)
      const r = maxRadius * (1 - closure);

      // Blade rotation twist angle based on direction
      const twistAngle = dirSign * closure * (Math.PI / 3.2);
      const sectorAngle = (Math.PI * 2) / numBlades;
      const tanHalfSector = Math.tan(Math.PI / numBlades);
      const reach = maxRadius * 1.6;

      // Draw each of the 8 overlapping iris blades
      for (let i = 0; i < numBlades; i++) {
        const theta = i * sectorAngle + twistAngle;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(theta);

        // Blade polygon in local rotated coordinates:
        // V0: exact octagon vertex
        // V1: tangential leading cutting edge extending across neighbor blade
        // V2: outer corner
        // V3: outer trailing ray along sector boundary
        const v0x = r;
        const v0y = -r * tanHalfSector;

        ctx.beginPath();
        ctx.moveTo(v0x, v0y);
        ctx.lineTo(r, reach);
        ctx.lineTo(reach, reach);
        ctx.lineTo(reach, -reach * tanHalfSector);
        ctx.closePath();

        // Deep shadow cast onto adjacent blade
        ctx.shadowColor = 'rgba(0, 0, 0, 0.7)';
        ctx.shadowBlur = 14 * dpr;
        ctx.shadowOffsetX = -3 * dpr;
        ctx.shadowOffsetY = 2 * dpr;

        // Metallic dark forest / carbon gradient for each blade
        const grad = ctx.createLinearGradient(r, v0y, r + maxRadius * 0.7, reach * 0.4);
        if (i % 2 === 0) {
          grad.addColorStop(0, '#1E4215');
          grad.addColorStop(0.5, '#142D0E');
          grad.addColorStop(1, '#0B1908');
        } else {
          grad.addColorStop(0, '#193812');
          grad.addColorStop(0.5, '#11260C');
          grad.addColorStop(1, '#081306');
        }
        ctx.fillStyle = grad;
        ctx.fill();

        // Reset shadow before drawing crisp mechanical bevels
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw precision chamfered inner cutting edge (V0 -> V1)
        ctx.beginPath();
        ctx.moveTo(v0x, v0y);
        ctx.lineTo(r, reach * 0.65);
        ctx.strokeStyle = `rgba(210, 232, 35, ${0.45 + closure * 0.4})`;
        ctx.lineWidth = 1.8 * dpr;
        ctx.stroke();

        // Subtle secondary mechanical groove parallel to blade edge
        ctx.beginPath();
        ctx.moveTo(r + 14 * dpr, v0y + 6 * dpr);
        ctx.lineTo(r + 14 * dpr, reach * 0.45);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.07)';
        ctx.lineWidth = 1 * dpr;
        ctx.stroke();

        // Pivot rivet near outer housing
        const rivetX = r + 52 * dpr;
        const rivetY = 18 * dpr;
        ctx.beginPath();
        ctx.arc(rivetX, rivetY, 2.2 * dpr, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(210, 232, 35, 0.35)';
        ctx.fill();

        ctx.restore();
      }

      // Center optical lock ring when aperture is nearly or fully closed
      if (closure > 0.65) {
        const lockAlpha = Math.min((closure - 0.65) / 0.35, 1);
        const ringRadius = (28 + (1 - lockAlpha) * 14) * dpr;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(-twistAngle * 1.4);

        // Outer dashed calibration ring
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(210, 232, 35, ${lockAlpha * 0.85})`;
        ctx.lineWidth = 2 * dpr;
        ctx.setLineDash([8 * dpr, 6 * dpr]);
        ctx.stroke();
        ctx.setLineDash([]);

        // Inner precision lens ring
        ctx.beginPath();
        ctx.arc(0, 0, ringRadius * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${lockAlpha * 0.5})`;
        ctx.lineWidth = 1.2 * dpr;
        ctx.stroke();

        // Center focal dot at full lock
        if (closure > 0.95) {
          ctx.beginPath();
          ctx.arc(0, 0, 3 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = '#D2E823';
          ctx.fill();
        }

        ctx.restore();
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(render);
      } else {
        onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isActive, direction, onPeakReached, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full rounded-[24px]"
    />
  );
};
