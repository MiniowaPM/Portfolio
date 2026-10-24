import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LightboxModal } from '../components/ui/LightboxModal';
import { useLocale } from '../context/useLocale';
import { PHOTO_DATA } from '../data/photoData';
import { translations } from '../i18n/translations';

export const AboutPage: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [activeCategory, setActiveCategory] = useState<'all' | 'sports' | 'team'>('all');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sportsPhotos = PHOTO_DATA[1] || [];
  const teamPhotos = PHOTO_DATA[2] || [];

  const displayPhotos =
    activeCategory === 'sports'
      ? sportsPhotos
      : activeCategory === 'team'
        ? teamPhotos
        : [...sportsPhotos, ...teamPhotos];

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full">
      {/* =========================================================================
          TOP HERO BANNER (Canopy Green #254F1A + Electric Lime #D2E823)
      ========================================================================= */}
      <section className="w-full bg-[#254F1A] pt-36 pb-20 md:pt-44 md:pb-28">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-2.5 font-sans text-[14px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              ← {t.caseStudy.backToOverview}
            </Link>
          </div>

          <h1 className="font-display text-[44px] font-black leading-[1.0] tracking-[-0.04em] text-[#D2E823] sm:text-[56px] md:text-[68px]">
            {t.about.title}
          </h1>

          <p className="mt-6 max-w-2xl font-sans text-[18px] font-medium leading-[1.6] text-[#FFFFFF] sm:text-[20px]">
            {t.about.subtitle}
          </p>
        </div>
      </section>

      {/* =========================================================================
          4 COLOR-BLOCKED STORY CARDS (Warm Alabaster #F3F3F1)
      ========================================================================= */}
      <section className="w-full bg-[#F3F3F1] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 1. Maritime University of Szczecin (Maritime Cobalt #0B3B59) */}
            <div className="rounded-[36px] bg-[#0B3B59] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
              <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#B8E8FC]/80">
                {locale === 'en' ? 'Academic Foundation' : 'Fundament Akademicki'}
              </span>
              <h2 className="mt-3 font-display text-[26px] font-black tracking-[-0.03em] text-[#B8E8FC] sm:text-[30px]">
                {t.about.educationTitle}
              </h2>
              <p className="mt-4 font-sans text-[16px] font-medium leading-[1.65] text-[#E2F4FD]">
                {t.about.educationText}
              </p>
            </div>

            {/* 2. KNI Science Club Leadership (Soft Rose #E9C0E9) */}
            <div className="rounded-[36px] bg-[#E9C0E9] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
              <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#502274]/80">
                {locale === 'en' ? 'Leadership & Research' : 'Koło Naukowe & Badania'}
              </span>
              <h2 className="mt-3 font-display text-[26px] font-black tracking-[-0.03em] text-[#502274] sm:text-[30px]">
                {t.about.kniTitle}
              </h2>
              <p className="mt-4 font-sans text-[16px] font-medium leading-[1.65] text-[#1E2330]">
                {t.about.kniText}
              </p>
            </div>

            {/* 3. GlobalLogic IoT & Edge AI Internship (Electric Lime #D2E823) */}
            <div className="rounded-[36px] bg-[#D2E823] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
              <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]/80">
                {locale === 'en' ? 'Commercial Industry' : 'Doświadczenie Przemysłowe'}
              </span>
              <h2 className="mt-3 font-display text-[26px] font-black tracking-[-0.03em] text-[#254F1A] sm:text-[30px]">
                {t.about.internshipTitle}
              </h2>
              <p className="mt-4 font-sans text-[16px] font-medium leading-[1.65] text-[#1E2330]">
                {t.about.internshipText}
              </p>
            </div>

            {/* 4. Volleyball, Skiing & Kayaking (Deep Burgundy #780016) */}
            <div className="rounded-[36px] bg-[#780016] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
              <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#E9C0E9]/80">
                {locale === 'en' ? 'Athletics & Passion' : 'Sport i Pasje'}
              </span>
              <h2 className="mt-3 font-display text-[26px] font-black tracking-[-0.03em] text-[#E9C0E9] sm:text-[30px]">
                {t.about.sportsTitle}
              </h2>
              <p className="mt-4 font-sans text-[16px] font-medium leading-[1.65] text-[#FFFFFF]">
                {t.about.sportsText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PHOTO GALLERY SECTION (Soft Rose #E9C0E9) with Smooth PopLayout
      ========================================================================= */}
      <section className="w-full bg-[#E9C0E9] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <span className="font-sans text-[14px] font-black uppercase tracking-wider text-[#780016]">
                {locale === 'en' ? 'Real Moments' : 'Prawdziwe Momenty'}
              </span>
              <h2 className="mt-2 font-display text-[38px] font-black leading-[1.02] tracking-[-0.035em] text-[#780016] sm:text-[48px]">
                {t.about.galleryTitle}
              </h2>
              <p className="mt-2 font-sans text-[16px] font-medium text-[#1E2330]">
                {t.about.gallerySubtitle}
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-bold transition-all ${
                  activeCategory === 'all'
                    ? 'bg-[#780016] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#1E2330] hover:bg-[#F3F3F1]'
                }`}
              >
                {locale === 'en' ? 'All' : 'Wszystkie'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('sports')}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-bold transition-all ${
                  activeCategory === 'sports'
                    ? 'bg-[#780016] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#1E2330] hover:bg-[#F3F3F1]'
                }`}
              >
                {locale === 'en' ? 'Sports' : 'Sport'}
              </button>
              <button
                type="button"
                onClick={() => setActiveCategory('team')}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-bold transition-all ${
                  activeCategory === 'team'
                    ? 'bg-[#780016] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#1E2330] hover:bg-[#F3F3F1]'
                }`}
              >
                {locale === 'en' ? 'Team & Science' : 'Zespół i Uczelnia'}
              </button>
            </div>
          </div>

          {/* 3-Column Photo Grid with popLayout mode */}
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {displayPhotos.map((photo, idx) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{
                    layout: { type: 'spring', stiffness: 380, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                  }}
                  whileHover={{ y: -6 }}
                  onClick={() => handleOpenLightbox(idx)}
                  className="group cursor-pointer overflow-hidden rounded-[32px] bg-[#FFFFFF] p-3 shadow-sm hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3.2] w-full overflow-hidden rounded-[24px] bg-[#1E2330]">
                    <img
                      src={photo.src}
                      alt={photo.caption[locale] || 'Gallery Photo'}
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 rounded-full bg-black/40 px-3 py-1 font-sans text-[11px] font-bold text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                      Zoom ↗
                    </div>
                  </div>
                  <div className="p-3">
                    <p className="font-sans text-[14px] font-bold text-[#1E2330]">
                      {photo.caption[locale]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={displayPhotos.map((p) => ({
          src: p.src,
          caption: p.caption[locale],
        }))}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
};

export default AboutPage;
