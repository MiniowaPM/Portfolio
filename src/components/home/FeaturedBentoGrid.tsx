import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { FEATURED_PROJECTS } from '../../data/projectData';
import { translations } from '../../i18n/translations';
import {
  AppleAppStoreIcon,
  GooglePlayIcon,
  PlayIcon,
  RotateIcon,
  PauseIcon,
  CameraIcon,
} from '../ui/BrandIcons';
import { OceanWaveCanvas } from './OceanWaveCanvas';
import { DroneShutterCanvas } from './DroneShutterCanvas';

// Animated Equalizer Bars for Voice Pulse
const VoiceEqualizerBars: React.FC<{ isPlaying?: boolean }> = ({ isPlaying = true }) => (
  <div className="flex h-4 items-center gap-1">
    {[0.6, 1, 0.45, 0.85, 0.65].map((scale, i) => (
      <motion.span
        key={i}
        animate={
          isPlaying
            ? { height: ['4px', `${Math.round(14 * scale + 3)}px`, '4px'] }
            : { height: '4px' }
        }
        transition={{
          repeat: Infinity,
          duration: 0.5 + i * 0.12,
          ease: 'easeInOut',
        }}
        className="w-1 rounded-full bg-[#D2E823]"
      />
    ))}
  </div>
);

export const FeaturedBentoGrid: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];

  const planProj = FEATURED_PROJECTS.find((p) => p.slug === 'plan-pm')!;
  const oceanProj = FEATURED_PROJECTS.find((p) => p.slug === 'ocean-simulation')!;
  const droneProj = FEATURED_PROJECTS.find((p) => p.slug === 'world-of-drones')!;
  const aleksyProj = FEATURED_PROJECTS.find((p) => p.slug === 'aleksy')!;

  // =========================================================================
  // 1. PlanPM 3D Cylindrical Wheel Showcase (All 11 Screens, Forward & Backward)
  // =========================================================================
  const [activePlanIdx, setActivePlanIdx] = useState(0);
  const [isPlanHovered, setIsPlanHovered] = useState(false);
  const [planProgress, setPlanProgress] = useState(0);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);

  const handleNextPlanScreen = useCallback(() => {
    setActivePlanIdx((prev) => (prev + 1) % planProj.images.length);
    setPlanProgress(0);
  }, [planProj.images.length]);

  const handlePrevPlanScreen = useCallback(() => {
    setActivePlanIdx((prev) => (prev - 1 + planProj.images.length) % planProj.images.length);
    setPlanProgress(0);
  }, [planProj.images.length]);

  useEffect(() => {
    if (isPlanHovered) return;
    const intervalTime = 50;
    const totalDuration = 5500;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setPlanProgress((prev) => {
        if (prev + step >= 100) {
          handleNextPlanScreen();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlanHovered, handleNextPlanScreen]);

  // =========================================================================
  // 2. Real-Time Ocean Simulation — Fast 1.05s Dark Navy Gerstner Wave
  // =========================================================================
  const [activeOceanIdx, setActiveOceanIdx] = useState(0);
  const [displayOceanIdx, setDisplayOceanIdx] = useState(0);
  const [isWaveSurging, setIsWaveSurging] = useState(false);
  const [isOceanHovered, setIsOceanHovered] = useState(false);
  const [oceanProgress, setOceanProgress] = useState(0);

  const triggerOceanWaveTo = useCallback(
    (targetIdx: number) => {
      if (isWaveSurging || targetIdx === activeOceanIdx) return;
      setActiveOceanIdx(targetIdx);
      setIsWaveSurging(true);
      setOceanProgress(0);
    },
    [activeOceanIdx, isWaveSurging]
  );

  const handleOceanPeakReached = useCallback(() => {
    // Under the full dark blue water blanket, swap underlying photo
    setDisplayOceanIdx(activeOceanIdx);
  }, [activeOceanIdx]);

  const handleOceanWaveComplete = useCallback(() => {
    setIsWaveSurging(false);
  }, []);

  useEffect(() => {
    if (isOceanHovered || isWaveSurging) return;
    const intervalTime = 50;
    const totalDuration = 5000;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setOceanProgress((prev) => {
        if (prev + step >= 100) {
          triggerOceanWaveTo((activeOceanIdx + 1) % oceanProj.images.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isOceanHovered, isWaveSurging, activeOceanIdx, oceanProj.images.length, triggerOceanWaveTo]);

  // =========================================================================
  // 3. World of Drones — 8-Blade Mechanical Camera Aperture Shutter
  // =========================================================================
  const [activeDroneIdx, setActiveDroneIdx] = useState(0);
  const [pendingDroneIdx, setPendingDroneIdx] = useState(0);
  const [droneDirection, setDroneDirection] = useState<'forward' | 'backward'>('forward');
  const [isShutterActive, setIsShutterActive] = useState(false);
  const [isDroneHovered, setIsDroneHovered] = useState(false);
  const [droneProgress, setDroneProgress] = useState(0);

  const triggerDroneScanTo = useCallback(
    (targetIdx: number) => {
      if (isShutterActive || targetIdx === activeDroneIdx) return;
      const total = droneProj.images.length;
      const forwardDistance = (targetIdx - activeDroneIdx + total) % total;
      const isForward = forwardDistance <= total / 2;

      setDroneDirection(isForward ? 'forward' : 'backward');
      setPendingDroneIdx(targetIdx);
      setIsShutterActive(true);
      setDroneProgress(0);
    },
    [activeDroneIdx, isShutterActive, droneProj.images.length]
  );

  const handleShutterPeak = useCallback(() => {
    setActiveDroneIdx(pendingDroneIdx);
  }, [pendingDroneIdx]);

  const handleShutterComplete = useCallback(() => {
    setIsShutterActive(false);
  }, []);

  useEffect(() => {
    if (isDroneHovered || isShutterActive) return;
    const intervalTime = 50;
    const totalDuration = 5200;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setDroneProgress((prev) => {
        if (prev + step >= 100) {
          triggerDroneScanTo((activeDroneIdx + 1) % droneProj.images.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isDroneHovered, isShutterActive, activeDroneIdx, droneProj.images.length, triggerDroneScanTo]);

  // =========================================================================
  // 4. ALEKSY — Full Concentric Acoustic Wave Curtain
  // =========================================================================
  const [activeAleksyIdx, setActiveAleksyIdx] = useState(0);
  const [displayAleksyIdx, setDisplayAleksyIdx] = useState(0);
  const [isAleksySurging, setIsAleksySurging] = useState(false);
  const [isAleksyHovered, setIsAleksyHovered] = useState(false);
  const [aleksProgress, setAleksProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  const triggerAleksyWaveTo = useCallback(
    (targetIdx: number) => {
      if (isAleksySurging || targetIdx === activeAleksyIdx) return;
      setActiveAleksyIdx(targetIdx);
      setIsAleksySurging(true);
      setAleksProgress(0);

      // Under full wave blanket (~750ms), swap underlying image
      setTimeout(() => {
        setDisplayAleksyIdx(targetIdx);
      }, 750);

      // Finish acoustic expansion (1.6s)
      setTimeout(() => {
        setIsAleksySurging(false);
      }, 1600);
    },
    [activeAleksyIdx, isAleksySurging]
  );

  useEffect(() => {
    if (isAleksyHovered || isAleksySurging) return;
    const intervalTime = 50;
    const totalDuration = 5500;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setAleksProgress((prev) => {
        if (prev + step >= 100) {
          triggerAleksyWaveTo((activeAleksyIdx + 1) % aleksyProj.images.length);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isAleksyHovered, isAleksySurging, activeAleksyIdx, aleksyProj.images.length, triggerAleksyWaveTo]);

  // Modal keyboard listeners (Escape, Arrow Left/Right) & background scroll lock
  useEffect(() => {
    if (!isPlanModalOpen && !isVideoModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPlanModalOpen(false);
        setIsVideoModalOpen(false);
      }
      if (isPlanModalOpen) {
        if (e.key === 'ArrowRight') handleNextPlanScreen();
        if (e.key === 'ArrowLeft') handlePrevPlanScreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isPlanModalOpen, isVideoModalOpen, handleNextPlanScreen, handlePrevPlanScreen]);

  return (
    <div id="work" className="w-full">
      {/* =========================================================================
          SHOWCASE 1: PlanPM — Mobile Application (Soft Rose #E9C0E9 Full-Bleed Band)
      ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#E9C0E9] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Editorial Text on Canvas */}
          <div className="flex flex-col lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#502274]/15 px-4 py-1.5 font-sans text-[13px] font-bold text-[#502274]">
              <span>{t.featured.title} · Production Mobile App</span>
            </div>

            <h2 className="mt-4 font-display text-[38px] font-black leading-[1.05] tracking-[-0.035em] text-[#502274] sm:text-[48px] md:text-[54px]">
              {planProj.title}
            </h2>

            <p className="mt-5 max-w-lg font-sans text-[17px] font-medium leading-[1.6] text-[#1E2330] sm:text-[18.5px]">
              {planProj.shortDescription[locale]}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {planProj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#502274] px-4 py-1.5 font-sans text-[13px] font-bold text-[#FFFFFF]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${planProj.slug}`}
                className="flex h-13 items-center rounded-full bg-[#502274] px-7 font-sans text-[15px] font-bold text-[#FFFFFF] shadow-md transition-transform hover:scale-[1.03] active:scale-95"
              >
                Case Study →
              </Link>

              <a
                href="https://play.google.com/store/apps/details?id=com.piotrwittig.plan_pm&hl=pl"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center gap-2 rounded-full bg-[#FFFFFF] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
              >
                <GooglePlayIcon className="h-4 w-4" />
                <span>Google Play ↗</span>
              </a>

              <a
                href="https://apps.apple.com/pl/app/plan-pm/id6759010559"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center gap-2 rounded-full bg-[#FFFFFF] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
              >
                <AppleAppStoreIcon className="h-4 w-4" />
                <span>App Store ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3D Cylindrical Wheel Carousel Stage */}
          <div
            className="flex flex-col items-center justify-center lg:col-span-6"
            onMouseEnter={() => setIsPlanHovered(true)}
            onMouseLeave={() => setIsPlanHovered(false)}
          >
            {/* 3D Wheel Stage with Perspective */}
            <div
              className="relative flex h-[520px] w-full max-w-[600px] items-center justify-center select-none"
              style={{ perspective: '1200px' }}
            >
              {planProj.images.map((imgSrc, imgIdx) => {
                const total = planProj.images.length;
                // Calculate shortest circular difference [-5 .. +5]
                let diff = (imgIdx - activePlanIdx) % total;
                if (diff > total / 2) diff -= total;
                if (diff < -total / 2) diff += total;

                // Circular 3D cylinder positions
                let x: number;
                let scale: number;
                let rotateY: number;
                let zIndex: number;
                let opacity: number;
                let brightness: number;

                if (diff === 0) {
                  // Active center phone (sharp 1:1 render, no filter)
                  x = 0;
                  scale = 1;
                  rotateY = 0;
                  zIndex = 30;
                  opacity = 1;
                  brightness = 1;
                } else if (diff === -1) {
                  // Left adjacent phone
                  x = -132;
                  scale = 0.86;
                  rotateY = 14;
                  zIndex = 20;
                  opacity = 0.92;
                  brightness = 0.92;
                } else if (diff === 1) {
                  // Right adjacent phone
                  x = 132;
                  scale = 0.86;
                  rotateY = -14;
                  zIndex = 20;
                  opacity = 0.92;
                  brightness = 0.92;
                } else if (diff === -2) {
                  // Far left phone
                  x = -240;
                  scale = 0.72;
                  rotateY = 24;
                  zIndex = 10;
                  opacity = 0.6;
                  brightness = 0.82;
                } else if (diff === 2) {
                  // Far right phone
                  x = 240;
                  scale = 0.72;
                  rotateY = -24;
                  zIndex = 10;
                  opacity = 0.6;
                  brightness = 0.82;
                } else {
                  // Parked invisibly around the back of the cylinder
                  x = diff > 0 ? 320 : -320;
                  scale = 0.5;
                  rotateY = diff > 0 ? -35 : 35;
                  zIndex = 1;
                  opacity = 0;
                  brightness = 0.6;
                }

                return (
                  <motion.div
                    key={`plan-wheel-phone-${imgIdx}`}
                    animate={{
                      x,
                      scale,
                      rotateY,
                      zIndex,
                      opacity,
                      filter: diff === 0 ? 'none' : `brightness(${brightness})`,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 240,
                      damping: 24,
                    }}
                    onClick={() => {
                      if (diff === 0) {
                        setIsPlanModalOpen(true);
                      } else {
                        setActivePlanIdx(imgIdx);
                        setPlanProgress(0);
                      }
                    }}
                    title={
                      diff === 0
                        ? (locale === 'en' ? 'Click to zoom screenshot' : 'Kliknij, aby powiększyć zrzut ekranu')
                        : (locale === 'en' ? 'Click to bring to front' : 'Kliknij, aby wysunąć na środek')
                    }
                    className={`absolute w-[180px] cursor-pointer overflow-hidden rounded-[36px] bg-[#1E2330] p-2 shadow-[0_24px_50px_rgba(80,34,116,0.32)] sm:w-[220px] ${
                      diff === 0 ? 'hover:scale-[1.03]' : 'hover:opacity-100'
                    }`}
                    style={{
                      pointerEvents: Math.abs(diff) <= 2 ? 'auto' : 'none',
                      backfaceVisibility: 'hidden',
                      WebkitBackfaceVisibility: 'hidden',
                    }}
                  >
                    <div className="relative aspect-[9/20] w-full overflow-hidden rounded-[28px] bg-black">
                      <img
                        src={imgSrc}
                        alt={`PlanPM screen ${imgIdx + 1}`}
                        className="h-full w-full object-cover"
                        style={{
                          transform: 'translateZ(0)',
                        }}
                      />
                      {/* Top Phone Speaker Notch */}
                      <div className="absolute top-2 left-1/2 h-3 w-14 -translate-x-1/2 rounded-full bg-black/60 backdrop-blur-sm" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom 11-Screen Interactive Navigator with Autoplay Progress Bar */}
            <div className="mt-4 flex flex-col items-center gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrevPlanScreen}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#502274]/20 text-sm font-bold text-[#502274] transition-colors hover:bg-[#502274]/35 active:scale-95"
                  title="Previous screen (Rotate Wheel Right)"
                >
                  ←
                </button>

                <div className="flex items-center gap-1.5 rounded-full bg-[#502274]/15 px-4 py-2 font-sans text-[12.5px] font-bold text-[#502274]">
                  <span>
                    {isPlanHovered ? <PauseIcon className="h-3 w-3" /> : <RotateIcon className="h-3 w-3" />}
                  </span>
                  <span>
                    {locale === 'en'
                      ? `Screen ${activePlanIdx + 1} of ${planProj.images.length}`
                      : `Ekran ${activePlanIdx + 1} z ${planProj.images.length}`}
                  </span>
                  {/* Miniature progress line */}
                  <div className="ml-2 h-1.5 w-16 overflow-hidden rounded-full bg-[#502274]/20">
                    <div
                      className="h-full bg-[#502274] transition-all duration-75 ease-linear"
                      style={{ width: `${isPlanHovered ? 100 : planProgress}%` }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleNextPlanScreen}
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[#502274]/20 text-sm font-bold text-[#502274] transition-colors hover:bg-[#502274]/35 active:scale-95"
                  title="Next screen (Rotate Wheel Left)"
                >
                  →
                </button>
              </div>

              {/* 11 Screen Dots Bar */}
              <div className="flex items-center gap-1.5">
                {planProj.images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActivePlanIdx(idx);
                      setPlanProgress(0);
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activePlanIdx === idx ? 'w-6 bg-[#502274]' : 'w-2 bg-[#502274]/30 hover:bg-[#502274]/60'
                    }`}
                    title={`Jump to screen ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE 2: Real-Time Ocean Simulation — Fast 1.05s Dark Navy Gerstner Wave
      ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#0B3B59] py-24 md:py-32">
        <div className="mx-auto grid max-w-[1240px] grid-cols-1 items-center gap-12 px-4 md:px-6 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Direct Text on Canvas */}
          <div className="flex flex-col lg:col-span-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#B8E8FC]/15 px-4 py-1.5 font-sans text-[13px] font-bold text-[#B8E8FC]">
              <span>Real-Time Graphics · GPU Shaders & Physics</span>
            </div>

            <h2 className="mt-4 font-display text-[38px] font-black leading-[1.05] tracking-[-0.035em] text-[#B8E8FC] sm:text-[48px] md:text-[54px]">
              {oceanProj.title}
            </h2>

            <p className="mt-5 max-w-lg font-sans text-[17px] font-medium leading-[1.6] text-[#E2F4FD] sm:text-[18.5px]">
              {oceanProj.shortDescription[locale]}
            </p>

            {/* Tech Stack Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {oceanProj.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full bg-[#B8E8FC] px-4 py-1.5 font-sans text-[13px] font-bold text-[#0B3B59]"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Pills */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <Link
                to={`/projects/${oceanProj.slug}`}
                className="flex h-13 items-center rounded-full bg-[#B8E8FC] px-7 font-sans text-[15px] font-bold text-[#0B3B59] shadow-md transition-transform hover:scale-[1.03] active:scale-95"
              >
                Case Study →
              </Link>

              <a
                href="https://github.com/JakubLopyta/ship-simulator"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-13 items-center gap-2 rounded-full bg-[#FFFFFF]/15 px-6 font-sans text-[14.5px] font-bold text-[#FFFFFF] shadow-sm transition-transform hover:bg-[#FFFFFF]/25 hover:scale-[1.03] active:scale-95"
              >
                <span>GitHub ↗</span>
              </a>
            </div>
          </div>

          {/* Right Column: Procedural Gerstner Wave Canvas Stage */}
          <div
            className="flex items-center justify-center lg:col-span-6"
            onMouseEnter={() => setIsOceanHovered(true)}
            onMouseLeave={() => setIsOceanHovered(false)}
          >
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-[36px] bg-[#072437] p-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.45)] select-none">
              <div
                onClick={() => triggerOceanWaveTo((activeOceanIdx + 1) % oceanProj.images.length)}
                className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[28px] bg-[#051724]"
                title={locale === 'en' ? 'Click to surge wave to next photo' : 'Kliknij, aby podnieść falę do kolejnego ujęcia'}
              >
                {/* Fixed Permanent Image in DOM (Never unmounts, zero flicker) */}
                <img
                  src={oceanProj.images[displayOceanIdx]}
                  alt={oceanProj.title}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Real-Time Procedural 60fps Ocean Wave Canvas (Dark Navy Gerstner waves + foam physics) */}
                <OceanWaveCanvas
                  isActive={isWaveSurging}
                  onPeakReached={handleOceanPeakReached}
                  onComplete={handleOceanWaveComplete}
                />

                {/* Floating Wave Trigger & Thumbnails Bar with Progress */}
                <div
                  className="absolute right-3.5 bottom-3.5 z-40 flex items-center gap-2 rounded-full bg-[#0B3B59]/90 p-1.5 shadow-xl backdrop-blur-md"
                  onClick={(e) => e.stopPropagation()}
                >
                  {oceanProj.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => triggerOceanWaveTo(idx)}
                      className={`relative h-9 w-12 cursor-pointer overflow-hidden rounded-full border-2 transition-all ${
                        activeOceanIdx === idx
                          ? 'border-[#B8E8FC] opacity-100 scale-105 shadow-md'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                      {activeOceanIdx === idx && (
                        <div className="absolute bottom-0 left-0 h-1 w-full bg-black/40">
                          <div
                            className="h-full bg-[#B8E8FC] transition-all duration-75"
                            style={{ width: `${isOceanHovered ? 100 : oceanProgress}%` }}
                          />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE 3: Edge AI & Hardware — World of Drones & ALEKSY
      ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#D2E823] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* -------------------------------------------------------------
                Left Showcase: World of Drones with 65-Drone Swarm Flyover
            ------------------------------------------------------------- */}
            <div
              className="flex flex-col justify-between"
              onMouseEnter={() => setIsDroneHovered(true)}
              onMouseLeave={() => setIsDroneHovered(false)}
            >
              <div>
                <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]">
                  GlobalLogic Internship · Embedded IoT
                </span>
                <h3 className="mt-3 font-display text-[34px] font-black leading-[1.1] tracking-[-0.03em] text-[#254F1A] sm:text-[40px]">
                  {droneProj.title}
                </h3>
                <p className="mt-4 font-sans text-[16.5px] font-medium leading-[1.6] text-[#1E2330]">
                  {droneProj.shortDescription[locale]}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {droneProj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#254F1A] px-3.5 py-1.5 font-sans text-[12.5px] font-bold text-[#D2E823]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Mechanical Camera Aperture Shutter Viewport */}
              <div className="mt-8 select-none">
                <div
                  onClick={() =>
                    triggerDroneScanTo((activeDroneIdx + 1) % droneProj.images.length)
                  }
                  title={
                    locale === 'en'
                      ? 'Click to trigger camera aperture shutter'
                      : 'Kliknij, aby wyzwolić przysłonę obiektywu'
                  }
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[32px] bg-[#B5CA1A] p-2 shadow-xl"
                >
                  <div className="relative h-full w-full overflow-hidden rounded-[24px]">
                    {/* Clean Unobstructed Project Photo */}
                    <img
                      src={droneProj.images[activeDroneIdx]}
                      alt={droneProj.title}
                      className={`h-full w-full rounded-[24px] object-cover transition-transform duration-500 ${
                        isShutterActive ? 'scale-105' : 'hover:scale-[1.02]'
                      }`}
                    />

                    {/* 8-Blade Mechanical Camera Aperture Iris Canvas */}
                    <DroneShutterCanvas
                      isActive={isShutterActive}
                      direction={droneDirection}
                      onPeakReached={handleShutterPeak}
                      onComplete={handleShutterComplete}
                    />

                    {/* Thumbnail Navigator (All 6 Photos) */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute right-3.5 bottom-3.5 z-40 flex items-center gap-1.5 rounded-full bg-black/75 p-1.5 backdrop-blur-md"
                    >
                      {droneProj.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => triggerDroneScanTo(idx)}
                          className={`h-7 w-9 cursor-pointer overflow-hidden rounded-full border transition-all ${
                            activeDroneIdx === idx
                              ? 'scale-110 border-[#D2E823] opacity-100 shadow-sm'
                              : 'border-transparent opacity-40 hover:opacity-100'
                          }`}
                          title={`Photo ${idx + 1}`}
                        >
                          <img src={img} alt="" className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>

                    {/* Autoplay / Shutter Badge with Progress Line */}
                    <div className="absolute top-3.5 right-3.5 z-40 flex flex-col gap-1 rounded-2xl bg-black/75 px-3 py-1.5 font-sans text-[11px] font-bold text-[#D2E823] backdrop-blur-md">
                      <div className="flex items-center gap-1.5">
                        <span>
                          {isDroneHovered ? <PauseIcon className="h-3 w-3" /> : <CameraIcon className="h-3.5 w-3.5" />}
                        </span>
                        <span>
                          {locale === 'en'
                            ? `Aperture (${activeDroneIdx + 1}/6)`
                            : `Przysłona (${activeDroneIdx + 1}/6)`}
                        </span>
                      </div>
                      <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                        <div
                          className="h-full bg-[#D2E823] transition-all duration-75 ease-linear"
                          style={{ width: `${isDroneHovered ? 100 : droneProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to={`/projects/${droneProj.slug}`}
                    className="inline-flex h-12 items-center rounded-full bg-[#254F1A] px-7 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>
            </div>

            {/* -------------------------------------------------------------
                Right Showcase: ALEKSY with Full Acoustic Wave Curtain
            ------------------------------------------------------------- */}
            <div
              className="flex flex-col justify-between"
              onMouseEnter={() => setIsAleksyHovered(true)}
              onMouseLeave={() => setIsAleksyHovered(false)}
            >
              <div>
                <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]">
                  Edge AI · Voice Assistant
                </span>
                <h3 className="mt-3 font-display text-[34px] font-black leading-[1.1] tracking-[-0.03em] text-[#254F1A] sm:text-[40px]">
                  {aleksyProj.title}
                </h3>
                <p className="mt-4 font-sans text-[16.5px] font-medium leading-[1.6] text-[#1E2330]">
                  {aleksyProj.shortDescription[locale]}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {aleksyProj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#254F1A] px-3.5 py-1.5 font-sans text-[12.5px] font-bold text-[#D2E823]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Acoustic Voice Ripple Viewport */}
              <div className="mt-8 select-none">
                <div
                  onClick={() => triggerAleksyWaveTo((activeAleksyIdx + 1) % aleksyProj.images.length)}
                  title={locale === 'en' ? 'Click to trigger Hej Aleksy voice pulse' : 'Kliknij, aby wywołać impuls głosowy Hej Aleksy'}
                  className="relative aspect-[16/10] w-full cursor-pointer overflow-hidden rounded-[32px] bg-[#254F1A] p-2 shadow-xl"
                >
                  <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[24px]">
                    {/* Stable Permanent Image in DOM */}
                    <img
                      src={aleksyProj.images[displayAleksyIdx]}
                      alt={aleksyProj.title}
                      className="h-full w-full rounded-[24px] object-cover transition-transform duration-500 hover:scale-[1.02]"
                    />

                    {/* Full Concentric Acoustic Wave Curtain Covering the Frame */}
                    <AnimatePresence>
                      {isAleksySurging && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center overflow-hidden rounded-[24px]"
                        >
                          {/* Circle 1: Outer Plum Blanket */}
                          <motion.div
                            initial={{ scale: 0.1 }}
                            animate={{ scale: [0.1, 2.8, 4.2] }}
                            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute h-64 w-64 rounded-full bg-[#502274]"
                          />

                          {/* Circle 2: Mid Forest Green Wave */}
                          <motion.div
                            initial={{ scale: 0.1 }}
                            animate={{ scale: [0.1, 2.2, 3.6] }}
                            transition={{ duration: 1.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute h-64 w-64 rounded-full bg-[#254F1A]"
                          />

                          {/* Circle 3: Bright Electric Lime Sound Pulse */}
                          <motion.div
                            initial={{ scale: 0.1 }}
                            animate={{ scale: [0.1, 1.8, 3.0] }}
                            transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute h-64 w-64 rounded-full bg-[#D2E823]"
                          />

                          {/* Center Acoustic Shockwave Centerpiece */}
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: [0.5, 1.2, 0.8], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.2, delay: 0.25 }}
                            className="absolute z-30 flex flex-col items-center gap-2"
                          >
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-black/85 shadow-2xl backdrop-blur-md border border-[#D2E823]/30">
                              <svg
                                className="h-8 w-8 fill-[#D2E823]"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                              >
                                <path d="M12 14c1.66 0 3-1.34 3-3V5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3z" />
                                <path d="M17 11c0 2.76-2.24 5-5 5s-5-2.24-5-5H5c0 3.53 2.61 6.43 6 6.92V21h2v-3.08c3.39-.49 6-3.39 6-6.92h-2z" />
                              </svg>
                            </div>
                            <span className="rounded-full bg-black/80 px-4 py-1 font-display text-[14px] font-black text-[#D2E823] shadow-md">
                              Hej Aleksy!
                            </span>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Top Voice Equalizer Badge with Live Wave & Progress Line */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerAleksyWaveTo((activeAleksyIdx + 1) % aleksyProj.images.length);
                      }}
                      className="absolute top-3.5 right-3.5 z-30 flex cursor-pointer flex-col gap-1 rounded-2xl bg-black/75 px-3.5 py-1.5 font-sans text-[12px] font-bold text-[#D2E823] shadow-lg backdrop-blur-md transition-transform hover:scale-105"
                    >
                      <div className="flex items-center gap-2">
                        <VoiceEqualizerBars isPlaying={!isAleksyHovered} />
                        <span>Hej Aleksy! ({activeAleksyIdx + 1}/3)</span>
                      </div>
                      <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                        <div
                          className="h-full bg-[#D2E823] transition-all duration-75 ease-linear"
                          style={{ width: `${isAleksyHovered ? 100 : aleksProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Bottom Photo Pill Dots */}
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="absolute bottom-3.5 left-3.5 z-30 flex items-center gap-1.5 rounded-full bg-black/70 px-3 py-1.5 backdrop-blur-md"
                    >
                      {aleksyProj.images.map((_, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => triggerAleksyWaveTo(idx)}
                          className={`h-2.5 cursor-pointer rounded-full transition-all ${
                            activeAleksyIdx === idx ? 'w-6 bg-[#D2E823]' : 'w-2.5 bg-white/40 hover:bg-white/80'
                          }`}
                          title={`Photo ${idx + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    to={`/projects/${aleksyProj.slug}`}
                    className="inline-flex h-12 items-center rounded-full bg-[#254F1A] px-7 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    Case Study →
                  </Link>
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="inline-flex h-12 cursor-pointer items-center gap-2 rounded-full bg-[#E9C0E9] px-6 font-sans text-[14.5px] font-bold text-[#502274] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    <PlayIcon className="h-4 w-4 fill-current" />
                    <span>Watch Demo ▶</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Video Modal */}
      <AnimatePresence>
        {isVideoModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setIsVideoModalOpen(false)}
          >
            <div
              className="relative flex aspect-[9/16] h-[80vh] max-h-[720px] max-w-[90vw] flex-col overflow-hidden rounded-[36px] bg-[#1E2330] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                aria-label="Close video"
              >
                ✕
              </button>

              <iframe
                src="https://www.youtube.com/embed/V51wDqSVl7A?autoplay=1"
                title="ALEKSY Edge Voice Assistant Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PlanPM Fullscreen Screenshot Lightbox */}
      <AnimatePresence>
        {isPlanModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setIsPlanModalOpen(false)}
          >
            <div
              className="relative flex max-h-[92vh] flex-col items-center justify-center overflow-hidden rounded-[36px] bg-[#1E2330] p-4 shadow-2xl border border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsPlanModalOpen(false)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                aria-label="Close screenshot"
              >
                ✕
              </button>

              <div className="relative aspect-[9/20] h-[78vh] max-h-[760px] overflow-hidden rounded-[26px] bg-black">
                <img
                  src={planProj.images[activePlanIdx].replace('/images/PlanPM/', '/images/PlanPM/full/')}
                  alt={`PlanPM Screen ${activePlanIdx + 1}`}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-3 flex items-center gap-4 text-white">
                <button
                  type="button"
                  onClick={handlePrevPlanScreen}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg font-bold transition-colors hover:bg-white/20 active:scale-95"
                  title="Previous screen"
                >
                  ←
                </button>
                <span className="font-sans text-[13px] font-bold text-white/80">
                  {activePlanIdx + 1} / {planProj.images.length}
                </span>
                <button
                  type="button"
                  onClick={handleNextPlanScreen}
                  className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-lg font-bold transition-colors hover:bg-white/20 active:scale-95"
                  title="Next screen"
                >
                  →
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
