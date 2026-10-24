import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { PHOTO_DATA } from '../../data/photoData';
import { translations } from '../../i18n/translations';
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';

export const HeroBento: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const heroPhotos = PHOTO_DATA[0] || [];
  const currentPhoto = heroPhotos[photoIndex] || heroPhotos[0];

  const handleNextPhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % heroPhotos.length);
  };

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
              <span>GitHub ↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/miko%C5%82aj-mo%C5%82odecki-2b135043b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#D2E823] px-5 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-[1.03] active:scale-95"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn ↗</span>
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

        {/* Right Column (5 Cols): Playful Tilted Portrait Card Stack */}
        <div className="flex justify-center lg:col-span-5">
          <div className="relative w-full max-w-[330px] sm:max-w-[360px]">
            {/* Background Peek Layer 2: Translucent White card */}
            <div
              className="pointer-events-none absolute inset-0 -rotate-3 rounded-[36px] bg-[#FFFFFF]/30 shadow-lg transition-transform duration-300"
              aria-hidden="true"
            />
            {/* Background Peek Layer 1: Soft Rose card */}
            <div
              className="pointer-events-none absolute inset-0 rotate-2 rounded-[36px] bg-[#E9C0E9] shadow-xl transition-transform duration-300"
              aria-hidden="true"
            />

            {/* Main Interactive Card */}
            <div
              onClick={handleNextPhoto}
              title="Click to cycle photo"
              className="group relative w-full -rotate-1 cursor-pointer rounded-[36px] bg-[#D2E823] p-2.5 shadow-2xl transition-transform duration-300 hover:rotate-0 hover:scale-[1.02] lg:max-h-[54vh]"
            >
              <div className="relative aspect-[4/4.6] w-full overflow-hidden rounded-[28px] bg-[#1E2330] lg:max-h-[50vh]">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={photoIndex}
                    src={currentPhoto.src}
                    alt={currentPhoto.caption[locale] || 'Mikołaj Mołodecki'}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="h-full w-full object-cover select-none"
                  />
                </AnimatePresence>

                {/* Top Shuffle Badge */}
                <div className="absolute top-3.5 right-3.5 z-10 flex items-center gap-1 rounded-full bg-black/60 px-3 py-1 font-sans text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                  <span>↻</span>
                  <span>{locale === 'en' ? 'Shuffle' : 'Przełącz'}</span>
                </div>

                {/* Bottom Floating Caption Pill */}
                <div className="absolute right-3.5 bottom-3.5 left-3.5 flex items-center justify-between rounded-full bg-[#FFFFFF] px-4 py-2 shadow-md">
                  <span className="truncate font-sans text-[13px] font-bold text-[#1E2330]">
                    {currentPhoto.caption[locale]}
                  </span>
                  <span className="rounded-full bg-[#F3F3F1] px-2 py-0.5 font-sans text-[11px] font-black text-[#254F1A]">
                    {photoIndex + 1} / {heroPhotos.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
