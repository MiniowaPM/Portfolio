import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { FEATURED_PROJECTS } from '../../data/projectData';
import { translations } from '../../i18n/translations';
import { AppleAppStoreIcon, GooglePlayIcon, PlayIcon } from '../ui/BrandIcons';

export const FeaturedBentoGrid: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];

  const planProj = FEATURED_PROJECTS.find((p) => p.slug === 'plan-pm')!;
  const oceanProj = FEATURED_PROJECTS.find((p) => p.slug === 'ocean-simulation')!;
  const droneProj = FEATURED_PROJECTS.find((p) => p.slug === 'world-of-drones')!;
  const aleksyProj = FEATURED_PROJECTS.find((p) => p.slug === 'aleksy')!;

  const [activeOceanIdx, setActiveOceanIdx] = useState(0);
  const [droneMainIdx, setDroneMainIdx] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

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

          {/* Right Column: Free-Floating Uncropped Phones with Spring Hover */}
          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative flex items-end justify-center gap-5 sm:gap-7">
              {/* Phone 1 */}
              <motion.div
                whileHover={{ rotate: -4, y: -16, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-[160px] cursor-pointer overflow-hidden rounded-[32px] bg-[#1E2330] p-2 shadow-[0_24px_50px_rgba(80,34,116,0.25)] sm:w-[200px]"
              >
                <img
                  src={planProj.images[0]}
                  alt="PlanPM screen 1"
                  className="h-auto w-full rounded-[24px] object-cover"
                />
              </motion.div>

              {/* Phone 2 */}
              <motion.div
                whileHover={{ rotate: 4, y: -24, scale: 1.03 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="w-[160px] cursor-pointer overflow-hidden rounded-[32px] bg-[#1E2330] p-2 shadow-[0_24px_50px_rgba(80,34,116,0.25)] sm:w-[200px]"
              >
                <img
                  src={planProj.images[1]}
                  alt="PlanPM screen 2"
                  className="h-auto w-full rounded-[24px] object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE 2: Real-Time Ocean Simulation (Maritime Cobalt #0B3B59 Full-Bleed)
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

          {/* Right Column: Floating Large Shader Stage with Floating Thumbnails */}
          <div className="flex items-center justify-center lg:col-span-6">
            <div className="relative w-full max-w-[560px] overflow-hidden rounded-[36px] bg-[#072437] p-2.5 shadow-[0_24px_50px_rgba(0,0,0,0.35)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[28px] bg-[#051724]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeOceanIdx}
                    src={oceanProj.images[activeOceanIdx]}
                    alt={oceanProj.title}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="h-full w-full object-cover"
                  />
                </AnimatePresence>

                {/* Floating Thumbnails Bar */}
                <div className="absolute right-3.5 bottom-3.5 z-10 flex items-center gap-2 rounded-full bg-[#0B3B59]/90 p-1.5 shadow-lg backdrop-blur-md">
                  {oceanProj.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveOceanIdx(idx)}
                      className={`h-9 w-12 cursor-pointer overflow-hidden rounded-full border-2 transition-all ${
                        activeOceanIdx === idx
                          ? 'border-[#B8E8FC] opacity-100 scale-105'
                          : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SHOWCASE 3: Edge AI & Hardware — World of Drones & ALEKSY (Electric Lime #D2E823)
      ========================================================================= */}
      <section className="relative w-full overflow-hidden bg-[#D2E823] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Showcase: World of Drones */}
            <div className="flex flex-col justify-between">
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

              {/* Floating Hardware Image with Swap Trigger */}
              <div className="mt-8">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[32px] bg-[#B5CA1A] p-2 shadow-xl">
                  <img
                    src={droneProj.images[droneMainIdx]}
                    alt={droneProj.title}
                    className="h-full w-full rounded-[24px] object-cover"
                  />
                  <div
                    onClick={() => setDroneMainIdx((prev) => (prev === 0 ? 1 : 0))}
                    title="Click to toggle enclosure view"
                    className="absolute right-4 bottom-4 z-10 w-28 cursor-pointer overflow-hidden rounded-[18px] bg-[#1E2330] p-1.5 shadow-2xl transition-transform hover:scale-105 sm:w-36"
                  >
                    <img
                      src={droneProj.images[droneMainIdx === 0 ? 1 : 0]}
                      alt="Enclosure 3D"
                      className="h-16 w-full rounded-[12px] object-cover sm:h-20"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/projects/${droneProj.slug}`}
                    className="inline-flex h-12 items-center rounded-full bg-[#254F1A] px-7 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    Case Study →
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Showcase: ALEKSY — Edge Voice Assistant */}
            <div className="flex flex-col justify-between">
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

              {/* Floating Media with Watch Demo Pill */}
              <div className="mt-8">
                <div className="relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden rounded-[32px] bg-[#254F1A] p-2 shadow-xl">
                  <img
                    src={aleksyProj.images[0]}
                    alt={aleksyProj.title}
                    className="h-full w-full rounded-[24px] object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setIsVideoModalOpen(true)}
                    className="absolute z-10 flex h-13 cursor-pointer items-center gap-2.5 rounded-full bg-[#E9C0E9] px-7 font-sans text-[15px] font-black text-[#502274] shadow-2xl transition-transform hover:scale-110 active:scale-95"
                  >
                    <PlayIcon className="h-4 w-4 fill-current" />
                    <span>Watch Demo ▶</span>
                  </button>
                </div>

                <div className="mt-6">
                  <Link
                    to={`/projects/${aleksyProj.slug}`}
                    className="inline-flex h-12 items-center rounded-full bg-[#254F1A] px-7 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105 active:scale-95"
                  >
                    Case Study →
                  </Link>
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
              {/* Close Button */}
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
    </div>
  );
};
