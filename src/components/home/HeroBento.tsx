import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { PHOTO_DATA } from '../../data/photoData';
import { translations } from '../../i18n/translations';
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon, RotateIcon, PauseIcon } from '../ui/BrandIcons';

export const HeroBento: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [exitingIndex, setExitingIndex] = useState<number | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [progress, setProgress] = useState(0);

  const heroPhotos = PHOTO_DATA[0] || [];
  const currentPhoto = heroPhotos[photoIndex] || heroPhotos[0];

  const handleNextPhoto = useCallback(() => {
    setExitingIndex(photoIndex);
    setPhotoIndex((prev) => (prev + 1) % heroPhotos.length);
    setProgress(0);
  }, [photoIndex, heroPhotos.length]);

  // Autoplay countdown timer (3.8s) with pause-on-hover
  useEffect(() => {
    if (isHovered) return;
    const intervalTime = 40;
    const totalDuration = 3800;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNextPhoto();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovered, handleNextPhoto]);

  // Reset exiting card state once animation completes
  useEffect(() => {
    if (exitingIndex !== null) {
      const timeout = setTimeout(() => {
        setExitingIndex(null);
      }, 650);
      return () => clearTimeout(timeout);
    }
  }, [exitingIndex]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mikolaj.molodecki133@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  const handleScrollToWork = () => {
    const el = document.getElementById('work');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative flex w-full flex-col justify-center bg-[#254F1A] pt-28 pb-12 sm:pt-32 lg:h-screen lg:max-h-screen lg:min-h-[640px] lg:pt-20 lg:pb-6">
      <div className="mx-auto grid w-full max-w-[1240px] grid-cols-1 items-center gap-8 px-4 md:px-6 lg:grid-cols-12 lg:gap-12">
        {/* Left Column (7 Cols): Headline & Action Pills */}
        <div className="flex flex-col lg:col-span-7">
          {/* Location & Institution Tag */}
          <div className="mb-3 inline-flex w-fit items-center gap-2 rounded-full bg-[#FFFFFF]/10 px-4 py-1.5 font-sans text-[13px] font-semibold text-[#D2E823]">
            <span>{t.hero.location}</span>
          </div>

          {/* Heavy Geometric Display Headline (Sized to fit perfectly on 100vh) */}
          <div className="min-h-[110px] sm:min-h-[130px] lg:min-h-[145px]">
            <h1 className="font-display text-[34px] font-black leading-[1.02] tracking-[-0.035em] text-[#D2E823] sm:text-[46px] md:text-[54px] lg:text-[56px]">
              {t.hero.headline}
            </h1>
          </div>

          {/* Lead Paragraph with locked line height */}
          <div className="mt-3 min-h-[65px] sm:min-h-[75px] lg:min-h-[80px]">
            <p className="max-w-xl font-sans text-[16px] font-medium leading-[1.5] text-[#FFFFFF] sm:text-[17.5px]">
              {t.hero.lead}
            </p>
          </div>

          {/* Chunky Action Pills Row */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Primary CTA: Explore Work ↓ */}
            <button
              type="button"
              onClick={handleScrollToWork}
              className="flex h-12 cursor-pointer items-center rounded-full bg-[#E9C0E9] px-7 font-sans text-[15px] font-bold text-[#1E2330] shadow-lg transition-transform hover:scale-[1.03] active:scale-95"
            >
              {t.hero.selectedWork}
            </button>

            {/* GitHub */}
            <a
              href="https://github.com/MiniowaPM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#D2E823] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/miko%C5%82aj-mo%C5%82odecki-2b135043b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#D2E823] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>

            {/* Copy Email */}
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex h-12 min-w-[135px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D2E823] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
            >
              {isCopied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-[#254F1A]" />
                  <span>{t.hero.copied}</span>
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4 text-[#1E2330]" />
                  <span>{t.hero.copyEmail}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Column (5 Cols): True Physical Card Deck Shuffle Animation with Autoplay */}
        <div className="flex justify-center lg:col-span-5">
          <div
            onClick={handleNextPhoto}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            title={locale === 'en' ? 'Click to shuffle next photo (Autoplay active)' : 'Kliknij, aby przetasować (Autoodtwarzanie aktywne)'}
            className="group relative aspect-[4/4.7] w-full max-w-[320px] cursor-pointer sm:max-w-[350px] lg:max-h-[52vh] select-none"
          >
            {/* Render all cards in the deck with their fixed positions */}
            {heroPhotos.map((photo, idx) => {
              const diff = (idx - photoIndex + heroPhotos.length) % heroPhotos.length;
              const isExiting = idx === exitingIndex;

              // Color accents for the outer card borders
              const cardBgColors = ['#D2E823', '#FFFFFF', '#E9C0E9', '#B8E8FC', '#D2E823'];
              const borderBg = cardBgColors[idx % cardBgColors.length];

              // Determine motion styling based on position in deck
              if (isExiting) {
                return (
                  <motion.div
                    key={`hero-card-${photo.src}`}
                    initial={{ x: 0, y: 0, rotate: -1.5, scale: 1, zIndex: 35, opacity: 1 }}
                    animate={{
                      x: [-20, -220, -14],
                      y: [10, 40, 28],
                      rotate: [-1.5, -22, -5],
                      scale: [1, 0.92, 0.86],
                      zIndex: [35, 35, 8],
                      opacity: [1, 0.95, 0.85],
                    }}
                    transition={{
                      duration: 0.62,
                      times: [0, 0.45, 1],
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ backgroundColor: borderBg }}
                    className="pointer-events-none absolute inset-0 rounded-[36px] p-2.5 shadow-2xl"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#1E2330]">
                      <img src={photo.src} alt="" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>
                );
              }

              // Card 0: Front top card
              if (diff === 0) {
                return (
                  <motion.div
                    key={`hero-card-${photo.src}`}
                    animate={{
                      x: 0,
                      y: 0,
                      rotate: isHovered ? 0 : -1.5,
                      scale: isHovered ? 1.02 : 1,
                      zIndex: 30,
                      opacity: 1,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    style={{ backgroundColor: borderBg }}
                    className="absolute inset-0 rounded-[36px] p-2.5 shadow-2xl"
                  >
                    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#1E2330]">
                      <img
                        src={photo.src}
                        alt={currentPhoto.caption[locale] || 'Mikołaj Mołodecki'}
                        className="h-full w-full object-cover select-none"
                      />

                      {/* Top Autoplay / Shuffle Pill with Progress Line */}
                      <div className="absolute top-3.5 right-3.5 z-10 flex flex-col gap-1 rounded-2xl bg-black/75 px-3 py-1.5 font-sans text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                        <div className="flex items-center gap-1.5">
                          <span className={`${isHovered ? 'text-amber-400' : 'text-[#D2E823]'}`}>
                            {isHovered ? <PauseIcon className="h-3 w-3" /> : <RotateIcon className="h-3 w-3" />}
                          </span>
                          <span className="text-[10.5px]">
                            {isHovered
                              ? locale === 'en' ? 'Paused' : 'Wstrzymano'
                              : locale === 'en' ? 'Autoplay' : 'Autoodtwarzanie'}
                          </span>
                        </div>
                        {/* Smooth Progress Bar */}
                        <div className="h-1 w-full overflow-hidden rounded-full bg-white/20">
                          <div
                            className="h-full bg-[#D2E823] transition-all duration-75 ease-linear"
                            style={{ width: `${isHovered ? 100 : progress}%` }}
                          />
                        </div>
                      </div>

                      {/* Bottom Floating Caption Pill */}
                      <div className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between rounded-full bg-[#FFFFFF] px-4 py-2 shadow-md">
                        <span className="truncate font-sans text-[13px] font-bold text-[#1E2330]">
                          {photo.caption[locale]}
                        </span>
                        <span className="shrink-0 rounded-full bg-[#F3F3F1] px-2 py-0.5 font-sans text-[11px] font-black text-[#254F1A]">
                          {photoIndex + 1} / {heroPhotos.length}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              }

              // Card 1: Directly behind, peeking on the right
              if (diff === 1) {
                return (
                  <motion.div
                    key={`hero-card-${photo.src}`}
                    animate={{
                      x: 14,
                      y: 16,
                      rotate: 4,
                      scale: 0.93,
                      zIndex: 20,
                      opacity: 1,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    style={{ backgroundColor: borderBg }}
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px] p-2 shadow-xl"
                  >
                    <div className="h-full w-full overflow-hidden rounded-[28px] bg-[#1E2330]">
                      <img src={photo.src} alt="" className="h-full w-full object-cover" />
                    </div>
                  </motion.div>
                );
              }

              // Card 2: Deeper behind, peeking on the left
              if (diff === 2) {
                return (
                  <motion.div
                    key={`hero-card-${photo.src}`}
                    animate={{
                      x: -14,
                      y: 28,
                      rotate: -5,
                      scale: 0.86,
                      zIndex: 10,
                      opacity: 0.85,
                    }}
                    transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                    style={{ backgroundColor: borderBg }}
                    className="pointer-events-none absolute inset-0 overflow-hidden rounded-[36px] p-2 shadow-md"
                  >
                    <div className="h-full w-full overflow-hidden rounded-[28px] bg-[#1E2330]">
                      <img src={photo.src} alt="" className="h-full w-full object-cover opacity-70" />
                    </div>
                  </motion.div>
                );
              }

              // Other cards: parked silently behind
              return (
                <motion.div
                  key={`hero-card-${photo.src}`}
                  animate={{
                    x: 0,
                    y: 35,
                    rotate: 0,
                    scale: 0.8,
                    zIndex: 1,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="pointer-events-none absolute inset-0 rounded-[36px]"
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
