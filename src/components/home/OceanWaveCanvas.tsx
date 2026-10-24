import React, { useEffect, useRef } from 'react';

interface OceanWaveCanvasProps {
  isActive: boolean;
  onPeakReached: () => void;
  onComplete: () => void;
}

export const OceanWaveCanvas: React.FC<OceanWaveCanvasProps> = ({
  isActive,
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
    const duration = 1050; // 1.05s punchy, energetic ocean surge

    // Resize canvas to match display resolution
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    const width = canvas.width;
    const height = canvas.height;

    // Rising air bubbles inside water body
    const bubbles: {
      x: number;
      y: number;
      r: number;
      speed: number;
      driftSpeed: number;
      driftOffset: number;
      alpha: number;
    }[] = [];
    for (let i = 0; i < 50; i++) {
      bubbles.push({
        x: Math.random() * width,
        y: height + Math.random() * height * 0.5,
        r: (Math.random() * 4.5 + 1.5) * dpr,
        speed: (Math.random() * 2.5 + 1.5) * dpr,
        driftSpeed: Math.random() * 0.03 + 0.015,
        driftOffset: Math.random() * Math.PI * 2,
        alpha: Math.random() * 0.5 + 0.35,
      });
    }

    // Foam particles on crest
    const particles: { x: number; y: number; r: number; speedY: number; alpha: number }[] = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * width,
        y: height,
        r: Math.random() * 2.5 + 1,
        speedY: Math.random() * 2 + 1,
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const render = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Halfway through (at peak coverage): trigger the silent image swap underneath
      if (progress >= 0.5 && !peakReachedRef.current) {
        peakReachedRef.current = true;
        onPeakReached();
      }

      ctx.clearRect(0, 0, width, height);

      // Surge height: 0 -> 1 -> 0 using smooth sine curve
      // When surge is 1, water level is completely above the frame (-60px)
      const surge = Math.sin(progress * Math.PI);
      const waterLine = height * (1 - surge) - 60 * surge;

      const t = elapsed * 0.004;

      // Helper function to build wave path
      const buildWavePath = (
        amplitude: number,
        frequency: number,
        speed: number,
        offsetY: number
      ) => {
        ctx.beginPath();
        ctx.moveTo(0, height);

        for (let x = 0; x <= width; x += 6) {
          const y =
            waterLine +
            offsetY +
            Math.sin(x * frequency + t * speed) * amplitude +
            Math.sin(x * (frequency * 1.6) - t * (speed * 0.8)) * (amplitude * 0.45) +
            Math.cos(x * (frequency * 0.5) + t * (speed * 1.2)) * (amplitude * 0.3);

          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.closePath();
      };

      // 1. Foam Crest Tip (drawn first, peeking out only at the very top 0..12px)
      buildWavePath(10 * dpr, 0.018 / dpr, 4.5, 0);
      ctx.fillStyle = '#B8E8FC';
      ctx.fill();
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 3.5 * dpr;
      ctx.stroke();

      // 2. Turquoise Sub-Crest (drawn second at +12px)
      buildWavePath(14 * dpr, 0.014 / dpr, -3.8, 12 * dpr);
      ctx.fillStyle = '#0EA5E9';
      ctx.fill();

      // 3. Azure Transition (drawn third at +22px)
      buildWavePath(18 * dpr, 0.01 / dpr, 3.4, 22 * dpr);
      ctx.fillStyle = '#0284C7';
      ctx.fill();

      // 4. Main Deep Ocean Body with Vertical Depth Gradient
      buildWavePath(22 * dpr, 0.007 / dpr, -2.8, 30 * dpr);
      const depthGradient = ctx.createLinearGradient(0, Math.max(0, waterLine), 0, height);
      depthGradient.addColorStop(0, '#0D476D');
      depthGradient.addColorStop(0.35, '#0B3B59');
      depthGradient.addColorStop(0.7, '#062338');
      depthGradient.addColorStop(1, '#03121E');
      ctx.fillStyle = depthGradient;
      ctx.fill();

      // 5. Volumetric Underwater God Rays (clipped to ocean body)
      if (surge > 0.15) {
        ctx.save();
        buildWavePath(22 * dpr, 0.007 / dpr, -2.8, 30 * dpr);
        ctx.clip();

        const numRays = 7;
        for (let i = 0; i < numRays; i++) {
          const rayOriginX = (width / numRays) * (i + 0.5) + Math.sin(t * 1.5 + i) * 35 * dpr;
          const rayAngle = 0.25 + Math.sin(t + i * 0.8) * 0.08; // angled downward beam
          const rayWidthTop = (25 + Math.sin(t * 2 + i) * 8) * dpr;
          const rayWidthBottom = (70 + Math.sin(t * 1.8 + i) * 15) * dpr;
          const rayLength = height * 1.2;

          ctx.beginPath();
          ctx.moveTo(rayOriginX - rayWidthTop / 2, waterLine);
          ctx.lineTo(rayOriginX + rayWidthTop / 2, waterLine);
          ctx.lineTo(
            rayOriginX + Math.sin(rayAngle) * rayLength + rayWidthBottom / 2,
            waterLine + Math.cos(rayAngle) * rayLength
          );
          ctx.lineTo(
            rayOriginX + Math.sin(rayAngle) * rayLength - rayWidthBottom / 2,
            waterLine + Math.cos(rayAngle) * rayLength
          );
          ctx.closePath();

          const rayGrad = ctx.createLinearGradient(
            rayOriginX,
            waterLine,
            rayOriginX + Math.sin(rayAngle) * rayLength,
            waterLine + Math.cos(rayAngle) * rayLength
          );
          const rayAlpha = (0.16 + Math.sin(t * 2.5 + i) * 0.06) * Math.min(surge * 1.4, 1);
          rayGrad.addColorStop(0, `rgba(184, 232, 252, ${rayAlpha})`);
          rayGrad.addColorStop(0.4, `rgba(56, 189, 248, ${rayAlpha * 0.6})`);
          rayGrad.addColorStop(1, 'rgba(11, 59, 89, 0)');

          ctx.fillStyle = rayGrad;
          ctx.fill();
        }

        // 6. Realistic Underwater Rising Bubbles (with rim & specular highlight)
        bubbles.forEach((b) => {
          b.y -= b.speed;
          const driftX = b.x + Math.sin(elapsed * b.driftSpeed + b.driftOffset) * (8 * dpr);

          // Recycle bubble when it reaches surface
          if (b.y < waterLine) {
            b.y = height + Math.random() * 40 * dpr;
            b.x = Math.random() * width;
          }

          if (b.y >= waterLine && b.y <= height) {
            // Bubble translucent body
            ctx.beginPath();
            ctx.arc(driftX, b.y, b.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(184, 232, 252, ${b.alpha * 0.25 * surge})`;
            ctx.fill();

            // Crisp glass rim
            ctx.strokeStyle = `rgba(224, 242, 254, ${b.alpha * 0.7 * surge})`;
            ctx.lineWidth = 1.2 * dpr;
            ctx.stroke();

            // Specular dot highlight
            ctx.beginPath();
            ctx.arc(driftX - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255, 255, 255, ${b.alpha * 0.9 * surge})`;
            ctx.fill();
          }
        });

        ctx.restore();
      }

      // 7. Surface spray foam particles
      if (surge > 0.1) {
        ctx.fillStyle = '#FFFFFF';
        particles.forEach((p) => {
          p.x += Math.sin(t + p.y) * 0.6;
          p.y = waterLine + Math.sin(p.x * 0.02 + t * 4) * 15 - Math.random() * 12;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * dpr, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * surge})`;
          ctx.fill();
        });
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
  }, [isActive, onPeakReached, onComplete]);

  if (!isActive) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    />
  );
};
