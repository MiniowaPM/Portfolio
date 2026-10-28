import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AppleAppStoreIcon, GitHubIcon, GooglePlayIcon, PlayIcon } from '../components/ui/BrandIcons';
import { LightboxModal } from '../components/ui/LightboxModal';
import { Footer } from '../components/layout/Footer';
import { useLocale } from '../context/useLocale';
import { FEATURED_PROJECTS } from '../data/projectData';
import { translations } from '../i18n/translations';

const COLOR_PAIRS: Record<
  string,
  {
    bg: string;
    title: string;
    body: string;
    pillBg: string;
    pillText: string;
    tagBg: string;
    tagText: string;
  }
> = {
  'ocean-simulation': {
    bg: '#0B3B59',
    title: '#B8E8FC',
    body: '#E2F4FD',
    pillBg: '#B8E8FC',
    pillText: '#0B3B59',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'plan-pm': {
    bg: '#E9C0E9',
    title: '#502274',
    body: '#1E2330',
    pillBg: '#502274',
    pillText: '#FFFFFF',
    tagBg: 'rgba(80, 34, 116, 0.14)',
    tagText: '#502274',
  },
  'world-of-drones': {
    bg: '#D2E823',
    title: '#254F1A',
    body: '#1E2330',
    pillBg: '#254F1A',
    pillText: '#D2E823',
    tagBg: 'rgba(37, 79, 26, 0.15)',
    tagText: '#254F1A',
  },
  aleksy: {
    bg: '#502274',
    title: '#E9C0E9',
    body: '#F3F3F1',
    pillBg: '#E9C0E9',
    pillText: '#502274',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'navigator-pm': {
    bg: '#254F1A',
    title: '#D2E823',
    body: '#FFFFFF',
    pillBg: '#D2E823',
    pillText: '#1E2330',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  hubmi: {
    bg: '#C52783',
    title: '#FFFFFF',
    body: '#FDF2F8',
    pillBg: '#FFFFFF',
    pillText: '#C52783',
    tagBg: 'rgba(255, 255, 255, 0.2)',
    tagText: '#FFFFFF',
  },
  'maritime-autonomous-simulator': {
    bg: '#0C4A6E',
    title: '#7DD3FC',
    body: '#F0F9FF',
    pillBg: '#7DD3FC',
    pillText: '#082F49',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'latwa-ustawa': {
    bg: '#1E293B',
    title: '#FCD34D',
    body: '#F8FAFC',
    pillBg: '#FCD34D',
    pillText: '#78350F',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'edek-chatbot': {
    bg: '#064E3B',
    title: '#A7F3D0',
    body: '#ECFDF5',
    pillBg: '#A7F3D0',
    pillText: '#064E3B',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  reptilia: {
    bg: '#312E81',
    title: '#C7D2FE',
    body: '#EEF2FF',
    pillBg: '#C7D2FE',
    pillText: '#312E81',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'youtube-but-worst': {
    bg: '#831843',
    title: '#FBCFE8',
    body: '#FDF2F8',
    pillBg: '#FBCFE8',
    pillText: '#831843',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  cryptoapp: {
    bg: '#14532D',
    title: '#BBF7D0',
    body: '#F0FDF4',
    pillBg: '#BBF7D0',
    pillText: '#14532D',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'matrix-calc': {
    bg: '#334155',
    title: '#E2E8F0',
    body: '#F8FAFC',
    pillBg: '#E2E8F0',
    pillText: '#1E293B',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'ticket-procurement-bot': {
    bg: '#1F2937',
    title: '#FED7AA',
    body: '#FFF7ED',
    pillBg: '#FED7AA',
    pillText: '#7C2D12',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
  'vat-sentinel': {
    bg: '#0F172A',
    title: '#38BDF8',
    body: '#F0F9FF',
    pillBg: '#38BDF8',
    pillText: '#0F172A',
    tagBg: 'rgba(255, 255, 255, 0.15)',
    tagText: '#FFFFFF',
  },
};

const parseYouTubeVideo = (url: string) => {
  if (url.includes('/shorts/')) {
    const id = url.split('/shorts/')[1]?.split(/[?#]/)[0];
    return { embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`, isPortrait: true };
  }
  if (url.includes('v=')) {
    const id = url.split('v=')[1]?.split(/[&#]/)[0];
    return { embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`, isPortrait: false };
  }
  if (url.includes('youtu.be/')) {
    const id = url.split('youtu.be/')[1]?.split(/[?#]/)[0];
    return { embedUrl: `https://www.youtube.com/embed/${id}?autoplay=1`, isPortrait: false };
  }
  return { embedUrl: url, isPortrait: false };
};

const resolveHighResImage = (src: string, slug: string): string => {
  if (slug === 'plan-pm' && src.includes('/images/PlanPM/') && !src.includes('/full/')) {
    return src.replace('/images/PlanPM/', '/images/PlanPM/full/');
  }
  return src;
};

const isPhoneScreenImage = (src: string, slug: string): boolean => {
  if (slug === 'plan-pm' || slug === 'latwa-ustawa') return true;
  if (slug === 'navigator-pm') {
    const match = src.match(/\/(\d+)\.png$/);
    if (match) {
      const num = parseInt(match[1], 10);
      return num >= 3 && num <= 9;
    }
  }
  return false;
};

const isVerticalPhotoImage = (_src: string, slug: string): boolean => {
  if (slug === 'edek-chatbot') return true;
  return false;
};

const parseArchitectureModule = (raw: string): { title: string | null; description: string } => {
  const colonIdx = raw.indexOf(':');
  if (colonIdx > 0 && colonIdx < 80) {
    return {
      title: raw.slice(0, colonIdx).trim(),
      description: raw.slice(colonIdx + 1).trim(),
    };
  }
  return { title: null, description: raw };
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const t = translations[locale];

  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [navigatorViewMode, setNavigatorViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    source: 'gallery' | 'team';
    index: number;
  }>({
    isOpen: false,
    source: 'gallery',
    index: 0,
  });
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    isPortrait: boolean;
    title: string;
  } | null>(null);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setSelectedImageIndex(0);
    setNavigatorViewMode('mobile');
    setLightboxState({ isOpen: false, source: 'gallery', index: 0 });
    setActiveVideo(null);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    if (project) {
      document.title = `${project.title} — Mikołaj Mołodecki`;
    }
  }, [slug, project]);

  useEffect(() => {
    if (!activeVideo) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeVideo]);

  if (!project) {
    return (
      <div className="flex min-h-[60vh] w-full flex-col items-center justify-center bg-[#F3F3F1] px-4 pt-36">
        <h1 className="font-display text-[32px] font-black text-[#1E2330]">
          Project Not Found
        </h1>
        <Link
          to="/"
          className="mt-4 rounded-full bg-[#1E2330] px-6 py-3 font-sans text-[14px] font-bold text-[#FFFFFF]"
        >
          {t.caseStudy.backToOverview}
        </Link>
      </div>
    );
  }

  const currentIdx = FEATURED_PROJECTS.findIndex((p) => p.slug === slug);
  const nextProject = FEATURED_PROJECTS[(currentIdx + 1) % FEATURED_PROJECTS.length];
  const prevProject =
    FEATURED_PROJECTS[(currentIdx - 1 + FEATURED_PROJECTS.length) % FEATURED_PROJECTS.length];

  const colors =
    COLOR_PAIRS[project.slug] || {
      bg: '#254F1A',
      title: '#D2E823',
      body: '#FFFFFF',
      pillBg: '#D2E823',
      pillText: '#1E2330',
      tagBg: 'rgba(255, 255, 255, 0.15)',
      tagText: '#FFFFFF',
    };

  const renderLinkIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('google play')) return <GooglePlayIcon className="h-4 w-4" />;
    if (l.includes('app store')) return <AppleAppStoreIcon className="h-4 w-4" />;
    if (l.includes('github') || l.includes('source code')) return <GitHubIcon className="h-4 w-4" />;
    if (l.includes('demo')) return <PlayIcon className="h-3.5 w-3.5" />;
    return null;
  };

  // Partition images by orientation for optimal multi-screen / frameless presentation
  const allGalleryImages = project.images.map((src, originalIndex) => ({
    src: resolveHighResImage(src, project.slug),
    rawSrc: src,
    originalIndex,
    isPhone: isPhoneScreenImage(src, project.slug),
    isVertical: isVerticalPhotoImage(src, project.slug),
  }));

  const phoneImages = allGalleryImages.filter((item) => item.isPhone);
  const verticalImages = allGalleryImages.filter((item) => item.isVertical);
  const landscapeImages = allGalleryImages.filter((item) => !item.isPhone && !item.isVertical);

  const openGalleryLightbox = (originalIdx: number) => {
    setLightboxState({
      isOpen: true,
      source: 'gallery',
      index: originalIdx,
    });
  };

  const openTeamLightbox = (teamIdx: number) => {
    setLightboxState({
      isOpen: true,
      source: 'team',
      index: teamIdx,
    });
  };

  const architecturePoints = project.caseStudy.architecture[locale];
  const challengePoints = project.caseStudy.challenges[locale];
  const resultPoints = project.caseStudy.results[locale];
  const teamPhotos = project.caseStudy.relatedTeamPhotos || [];

  // Helper to render a 3-Up Multi-Phone Stage (for PlanPM and NavigatorPM Mobile)
  const renderMultiPhoneTrio = (items: typeof allGalleryImages) => {
    if (items.length === 0) return null;
    const safeIdx = selectedImageIndex % items.length;
    const prevIdx = (safeIdx - 1 + items.length) % items.length;
    const nextIdx = (safeIdx + 1) % items.length;

    const visibleTrio =
      items.length >= 3
        ? [
            { item: items[prevIdx], role: 'side' as const, localIdx: prevIdx },
            { item: items[safeIdx], role: 'center' as const, localIdx: safeIdx },
            { item: items[nextIdx], role: 'side' as const, localIdx: nextIdx },
          ]
        : items.map((item, idx) => ({ item, role: 'center' as const, localIdx: idx }));

    return (
      <div className="relative overflow-hidden rounded-[36px] bg-[#FFFFFF] p-6 shadow-sm border border-black/[0.05] md:p-10">
        {/* Subtle Ambient Accent Glow */}
        <div
          className="pointer-events-none absolute -top-32 left-1/2 h-72 w-[75%] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: colors.bg }}
        />

        {/* Top Bar Info & Controls */}
        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1 font-sans text-[12px] font-black uppercase tracking-wider"
              style={{ backgroundColor: colors.bg, color: colors.title }}
            >
              {locale === 'en' ? 'Mobile UI Showcase' : 'Interfejs Mobilny'}
            </span>
            <span className="font-sans text-[13.5px] font-bold text-[#687082]">
              {locale === 'en'
                ? `Showing 3 of ${items.length} screens · Click any screen to enlarge`
                : `Widok 3 z ${items.length} ekranów · Kliknij ekran, aby powiększyć`}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedImageIndex((safeIdx - 1 + items.length) % items.length)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F3F3F1] font-sans text-[16px] font-black text-[#1E2330] transition-all hover:bg-[#1E2330] hover:text-white active:scale-95"
              aria-label="Previous screen"
            >
              ‹
            </button>
            <span className="min-w-[54px] text-center font-sans text-[13.5px] font-extrabold text-[#1E2330]">
              {String(safeIdx + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => setSelectedImageIndex((safeIdx + 1) % items.length)}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F3F3F1] font-sans text-[16px] font-black text-[#1E2330] transition-all hover:bg-[#1E2330] hover:text-white active:scale-95"
              aria-label="Next screen"
            >
              ›
            </button>
          </div>
        </div>

        {/* 3-Up Phones Stage */}
        <div className="relative z-10 grid grid-cols-1 items-center justify-items-center gap-6 sm:grid-cols-3 md:gap-8">
          {visibleTrio.map(({ item, role, localIdx }) => {
            const isCenter = role === 'center';
            return (
              <motion.div
                key={`${item.src}-${localIdx}`}
                layout
                initial={{ opacity: 0.7, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  if (!isCenter && items.length >= 3) {
                    setSelectedImageIndex(localIdx);
                  } else {
                    openGalleryLightbox(item.originalIndex);
                  }
                }}
                className={`group relative flex flex-col items-center cursor-pointer transition-all duration-300 ${
                  isCenter
                    ? 'z-20 w-full max-w-[280px] sm:scale-100'
                    : 'z-10 hidden w-full max-w-[248px] opacity-80 hover:opacity-100 sm:flex sm:scale-[0.93]'
                }`}
              >
                {/* Realistic Smartphone Frame */}
                <div
                  className={`relative w-full overflow-hidden rounded-[36px] border-[6px] bg-[#0F172A] shadow-2xl transition-transform duration-300 group-hover:-translate-y-1.5 ${
                    isCenter ? 'border-[#1E2330] ring-4 ring-black/5' : 'border-[#2D3343]'
                  }`}
                >
                  {/* Top Dynamic Speaker Notch */}
                  <div className="absolute top-2 left-1/2 z-20 h-1.5 w-14 -translate-x-1/2 rounded-full bg-black/50 backdrop-blur-sm" />

                  <img
                    src={item.src}
                    alt={`${project.title} screen ${localIdx + 1}`}
                    className="block h-auto w-full object-cover select-none"
                  />

                  {/* Hover Action Pill */}
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-4 py-1.5 font-sans text-[12px] font-extrabold text-[#1E2330] shadow-md">
                      {isCenter
                        ? locale === 'en'
                          ? 'Full Screen'
                          : 'Pełny ekran'
                        : locale === 'en'
                          ? 'Focus Screen'
                          : 'Wybierz ekran'}
                    </span>
                  </div>
                </div>

                {/* Screen Number Label */}
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-0.5 font-sans text-[11.5px] font-extrabold transition-colors ${
                      isCenter ? 'bg-[#1E2330] text-white' : 'bg-[#F3F3F1] text-[#687082]'
                    }`}
                  >
                    {locale === 'en' ? `Screen ${String(localIdx + 1).padStart(2, '0')}` : `Ekran ${String(localIdx + 1).padStart(2, '0')}`}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Screen Selector Pills */}
        <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-2">
          {items.map((item, idx) => {
            const isActive = idx === safeIdx;
            return (
              <button
                key={item.src}
                type="button"
                onClick={() => setSelectedImageIndex(idx)}
                className={`cursor-pointer rounded-full px-3.5 py-1.5 font-sans text-[12px] font-extrabold transition-all ${
                  isActive
                    ? 'scale-105 shadow-sm'
                    : 'bg-[#F3F3F1] text-[#687082] hover:bg-[#E2E4E9] hover:text-[#1E2330]'
                }`}
                style={
                  isActive
                    ? { backgroundColor: colors.bg, color: colors.title }
                    : undefined
                }
              >
                {String(idx + 1).padStart(2, '0')}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  // Helper to render Dual Phone or Dual Vertical Window Stage (LatwaUstawa, E.D.E.K.)
  const renderDualVerticalStage = (
    items: typeof allGalleryImages,
    isPhoneBezel: boolean
  ) => {
    return (
      <div className="relative overflow-hidden rounded-[36px] bg-[#FFFFFF] p-6 shadow-sm border border-black/[0.05] md:p-10">
        <div
          className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[70%] -translate-x-1/2 rounded-full opacity-20 blur-3xl"
          style={{ backgroundColor: colors.bg }}
        />

        <div className="relative z-10 mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              className="inline-flex items-center rounded-full px-3.5 py-1 font-sans text-[12px] font-black uppercase tracking-wider"
              style={{ backgroundColor: colors.bg, color: colors.title }}
            >
              {isPhoneBezel
                ? locale === 'en'
                  ? 'Mobile App Screens'
                  : 'Ekrany Aplikacji Mobilnej'
                : locale === 'en'
                  ? 'Application Interface'
                  : 'Interfejs Aplikacji'}
            </span>
            <span className="font-sans text-[13.5px] font-bold text-[#687082]">
              {locale === 'en' ? 'Click any screen to enlarge' : 'Kliknij wybrany widok, aby powiększyć'}
            </span>
          </div>
        </div>

        <div
          className={`relative z-10 mx-auto grid grid-cols-1 items-start justify-items-center gap-8 sm:grid-cols-2 ${
            isPhoneBezel ? 'max-w-[660px]' : 'max-w-[920px]'
          }`}
        >
          {items.map((item, idx) => (
            <div
              key={item.src}
              onClick={() => openGalleryLightbox(item.originalIndex)}
              className="group flex w-full cursor-pointer flex-col items-center"
            >
              {isPhoneBezel ? (
                <div className="relative w-full max-w-[285px] overflow-hidden rounded-[38px] border-[7px] border-[#1E2330] bg-[#0F172A] shadow-2xl transition-transform duration-300 group-hover:-translate-y-2">
                  <div className="absolute top-2.5 left-1/2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-black/50 backdrop-blur-sm" />
                  <img
                    src={item.src}
                    alt={`${project.title} screen ${idx + 1}`}
                    className="block h-auto w-full object-cover select-none"
                  />
                  <div className="absolute inset-0 flex items-end justify-center bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <span className="rounded-full bg-white/95 px-4 py-1.5 font-sans text-[12px] font-extrabold text-[#1E2330] shadow-md">
                      {locale === 'en' ? 'Full Screen' : 'Pełny ekran'}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full overflow-hidden rounded-[24px] border border-black/10 bg-[#1E2330] shadow-xl transition-transform duration-300 group-hover:-translate-y-1.5">
                  {/* Subtle Window Top Bar */}
                  <div className="flex items-center justify-between border-b border-white/10 bg-[#161A24] px-4 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F56]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#27C93F]" />
                    </div>
                    <span className="font-sans text-[11.5px] font-bold text-white/60">
                      {locale === 'en' ? `View 0${idx + 1}` : `Widok 0${idx + 1}`}
                    </span>
                    <span className="font-sans text-[11px] font-bold text-white/40 group-hover:text-white">
                      ⤢
                    </span>
                  </div>
                  <img
                    src={item.src}
                    alt={`${project.title} view ${idx + 1}`}
                    className="block h-auto w-full object-contain select-none"
                  />
                </div>
              )}

              <span className="mt-3.5 rounded-full bg-[#F3F3F1] px-4 py-1 font-sans text-[12px] font-extrabold text-[#1E2330]">
                {locale === 'en' ? `Screen 0${idx + 1}` : `Widok 0${idx + 1}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Helper to render Frameless / Browser Window Landscape Showcase (Zero Black Bars)
  const renderLandscapeShowcase = (items: typeof allGalleryImages) => {
    if (items.length === 0) return null;
    const safeIdx = selectedImageIndex % items.length;
    const activeItem = items[safeIdx] || items[0];

    return (
      <div className="overflow-hidden rounded-[36px] bg-[#FFFFFF] p-4 shadow-sm border border-black/[0.05] md:p-7">
        {/* Sleek Application / Browser Window Frame that hugs image aspect ratio */}
        <div className="overflow-hidden rounded-[24px] border border-black/10 bg-[#161A24] shadow-xl">
          {/* Window Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-[#1E2330] px-4 py-3 md:px-6">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#FF5F56]" />
              <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
              <span className="h-3 w-3 rounded-full bg-[#27C93F]" />
              <span className="ml-2 hidden rounded-md bg-white/10 px-3 py-0.5 font-sans text-[12px] font-bold text-white/80 sm:inline-block">
                {project.title}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {items.length > 1 && (
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((safeIdx - 1 + items.length) % items.length)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 font-sans text-[14px] font-bold text-white transition-colors hover:bg-white/25"
                    aria-label="Previous image"
                  >
                    ‹
                  </button>
                  <span className="min-w-[42px] text-center font-sans text-[12px] font-bold text-white/80">
                    {safeIdx + 1} / {items.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedImageIndex((safeIdx + 1) % items.length)}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-white/10 font-sans text-[14px] font-bold text-white transition-colors hover:bg-white/25"
                    aria-label="Next image"
                  >
                    ›
                  </button>
                </div>
              )}

              <button
                type="button"
                onClick={() => openGalleryLightbox(activeItem.originalIndex)}
                className="cursor-pointer rounded-full bg-white/15 px-3.5 py-1 font-sans text-[12px] font-bold text-white transition-colors hover:bg-white hover:text-[#1E2330]"
              >
                {locale === 'en' ? 'Full Screen' : 'Pełny ekran'}
              </button>
            </div>
          </div>

          {/* Image Stage — Natural height, zero black void */}
          <div
            onClick={() => openGalleryLightbox(activeItem.originalIndex)}
            className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden bg-[#12151E]"
          >
            <img
              src={activeItem.src}
              alt={`${project.title} preview ${safeIdx + 1}`}
              className="block max-h-[680px] w-full object-contain transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

        {/* Aspect-Matched Preview Cards Strip (Replaces old black thumbnail boxes) */}
        {items.length > 1 && (
          <div
            className={`mt-5 grid gap-3.5 ${
              items.length === 2
                ? 'grid-cols-2 max-w-[540px]'
                : items.length === 3
                  ? 'grid-cols-3 max-w-[720px]'
                  : 'grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6'
            }`}
          >
            {items.map((item, idx) => {
              const isSelected = idx === safeIdx;
              return (
                <button
                  key={item.src}
                  type="button"
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`group relative aspect-[16/10] cursor-pointer overflow-hidden rounded-[16px] border-2 transition-all duration-200 ${
                    isSelected
                      ? 'scale-[1.02] shadow-md ring-2 ring-black/5'
                      : 'border-transparent opacity-65 hover:opacity-100'
                  }`}
                  style={{
                    borderColor: isSelected ? colors.bg : 'transparent',
                  }}
                >
                  <img
                    src={item.src}
                    alt={`Thumbnail ${idx + 1}`}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <span className="absolute bottom-1.5 right-2 rounded-md bg-black/65 px-1.5 py-0.5 font-sans text-[10px] font-bold text-white backdrop-blur-sm">
                    0{idx + 1}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  // Master Media Showcase Dispatcher
  const renderMediaShowcase = () => {
    if (allGalleryImages.length === 0) return null;

    // 1. Mixed Desktop + Mobile Project (NavigatorPM)
    if (phoneImages.length > 0 && landscapeImages.length > 0) {
      return (
        <div className="space-y-5">
          {/* Segmented Platform Switcher */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex rounded-full bg-[#FFFFFF] p-1.5 shadow-sm border border-black/[0.06]">
              <button
                type="button"
                onClick={() => {
                  setNavigatorViewMode('mobile');
                  setSelectedImageIndex(0);
                }}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-extrabold transition-all ${
                  navigatorViewMode === 'mobile'
                    ? 'shadow-sm'
                    : 'text-[#687082] hover:text-[#1E2330]'
                }`}
                style={
                  navigatorViewMode === 'mobile'
                    ? { backgroundColor: colors.bg, color: colors.title }
                    : undefined
                }
              >
                {locale === 'en'
                  ? `Mobile Navigation (${phoneImages.length})`
                  : `Nawigacja Mobilna (${phoneImages.length})`}
              </button>
              <button
                type="button"
                onClick={() => {
                  setNavigatorViewMode('desktop');
                  setSelectedImageIndex(0);
                }}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-extrabold transition-all ${
                  navigatorViewMode === 'desktop'
                    ? 'shadow-sm'
                    : 'text-[#687082] hover:text-[#1E2330]'
                }`}
                style={
                  navigatorViewMode === 'desktop'
                    ? { backgroundColor: colors.bg, color: colors.title }
                    : undefined
                }
              >
                {locale === 'en'
                  ? `Web & System Architecture (${landscapeImages.length})`
                  : `Widok Web i Architektura (${landscapeImages.length})`}
              </button>
            </div>
          </div>

          {navigatorViewMode === 'mobile'
            ? renderMultiPhoneTrio(phoneImages)
            : renderLandscapeShowcase(landscapeImages)}
        </div>
      );
    }

    // 2. Pure Phone App Projects
    if (phoneImages.length > 0) {
      if (phoneImages.length <= 2) {
        return renderDualVerticalStage(phoneImages, true);
      }
      return renderMultiPhoneTrio(phoneImages);
    }

    // 3. Pure Vertical Card Projects (e.g. E.D.E.K. ChatBot)
    if (verticalImages.length > 0 && landscapeImages.length === 0) {
      return renderDualVerticalStage(verticalImages, false);
    }

    // 4. Landscape Desktop / Web / 3D Projects (including World of Drones with hardware trio)
    return renderLandscapeShowcase(landscapeImages);
  };

  const activeLightboxImages =
    lightboxState.source === 'team'
      ? teamPhotos.map((src, idx) => ({
          src,
          caption: `${project.title} — ${
            locale === 'en' ? `Behind the Scenes #${idx + 1}` : `Kulisy Projektu #${idx + 1}`
          }`,
        }))
      : allGalleryImages.map((item, idx) => ({
          src: item.src,
          caption: `${project.title} — ${locale === 'en' ? `View #${idx + 1}` : `Widok #${idx + 1}`}`,
        }));

  return (
    <div className="w-full">
      {/* =========================================================================
          TOP HERO BANNER (Project Signature Color Pair)
      ========================================================================= */}
      <section
        className="w-full pt-36 pb-20 md:pt-44 md:pb-24"
        style={{ backgroundColor: colors.bg }}
      >
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          {/* Back Button */}
          <div className="mb-8">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-2.5 font-sans text-[14px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              {t.caseStudy.backToOverview}
            </Link>
          </div>

          {/* Project Title & Lead */}
          <h1
            className="font-display text-[40px] font-black leading-[1.0] tracking-[-0.04em] sm:text-[54px] md:text-[66px]"
            style={{ color: colors.title }}
          >
            {project.title}
          </h1>

          <p
            className="mt-6 max-w-3xl font-sans text-[18px] font-medium leading-[1.6] sm:text-[20px]"
            style={{ color: colors.body }}
          >
            {project.caseStudy.lead[locale]}
          </p>

          {/* Metadata & Direct Links Pills */}
          <div className="mt-10 flex flex-wrap items-center gap-3">
            {/* Status */}
            <span
              className="rounded-full px-4 py-2 font-sans text-[13.5px] font-bold"
              style={{ backgroundColor: colors.pillBg, color: colors.pillText }}
            >
              {t.caseStudy.status}: {project.status}
            </span>

            {/* Team */}
            <span
              className="rounded-full px-4 py-2 font-sans text-[13.5px] font-bold"
              style={{ backgroundColor: colors.pillBg, color: colors.pillText }}
            >
              {t.caseStudy.team}: {project.team}
            </span>

            {/* Tech Stack Pills (High Contrast) */}
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full px-3.5 py-2 font-sans text-[13px] font-bold transition-colors"
                style={{ backgroundColor: colors.tagBg, color: colors.tagText }}
              >
                {tech}
              </span>
            ))}

            {/* Links or Demo Modal Trigger */}
            {project.links.map((link, idx) => {
              const isDemo = link.label.toLowerCase().includes('demo');
              if (isDemo) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      const parsed = parseYouTubeVideo(link.url);
                      setActiveVideo({
                        url: parsed.embedUrl,
                        isPortrait: parsed.isPortrait,
                        title: project.title,
                      });
                    }}
                    className="flex cursor-pointer items-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-2 font-sans text-[13.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-105 active:scale-95"
                  >
                    {renderLinkIcon(link.label)}
                    <span>{link.label}</span>
                  </button>
                );
              }

              return (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 rounded-full bg-[#FFFFFF] px-5 py-2 font-sans text-[13.5px] font-bold text-[#1E2330] shadow-sm transition-transform hover:scale-105 active:scale-95"
                >
                  {renderLinkIcon(link.label)}
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BODY SECTION: Multi-Screen Media Showcase + Bento Engineering Architecture
      ========================================================================= */}
      <section className="w-full bg-[#F3F3F1] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6 space-y-20">
          {/* 1. Adaptive Media Showcase */}
          {renderMediaShowcase()}

          {/* 2. System Architecture & Implementation — Numbered Bento Module Grid */}
          <div>
            <div className="mb-8 flex flex-col gap-2">
              <span
                className="w-fit rounded-full px-3.5 py-1 font-sans text-[11.5px] font-black uppercase tracking-wider"
                style={{ backgroundColor: colors.bg, color: colors.title }}
              >
                {locale === 'en' ? 'Engineering & Architecture' : 'Architektura i Inżynieria'}
              </span>
              <h2 className="font-display text-[32px] font-black tracking-[-0.035em] text-[#1E2330] sm:text-[40px]">
                {t.caseStudy.architectureTitle}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
              {architecturePoints.map((rawPoint, idx) => {
                const { title, description } = parseArchitectureModule(rawPoint);
                const isLastOdd =
                  architecturePoints.length % 2 === 1 && idx === architecturePoints.length - 1;

                return (
                  <div
                    key={idx}
                    className={`group relative flex flex-col justify-between rounded-[28px] bg-[#FFFFFF] p-7 shadow-sm border border-black/[0.04] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md md:p-8 ${
                      isLastOdd ? 'md:col-span-12' : 'md:col-span-6'
                    }`}
                  >
                    <div>
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <span
                          className="inline-flex h-9 w-11 items-center justify-center rounded-full font-display text-[13.5px] font-black"
                          style={{ backgroundColor: colors.bg, color: colors.title }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="h-[1px] flex-1 bg-black/[0.06]" />
                      </div>

                      {title && (
                        <h3 className="font-display text-[20px] font-black leading-[1.25] tracking-[-0.02em] text-[#1E2330] sm:text-[22px]">
                          {title}
                        </h3>
                      )}

                      <p
                        className={`${
                          title ? 'mt-2.5' : 'mt-1'
                        } font-sans text-[15.5px] font-medium leading-[1.68] text-[#4A4F5C]`}
                      >
                        {description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Technical Challenges & Results — 2-Column Side-by-Side Bento Split */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Left Column: Technical Challenges (Dark Slate Card) */}
            <div className="flex flex-col justify-between rounded-[32px] bg-[#1E2330] p-8 text-white shadow-lg md:p-10 lg:col-span-6">
              <div>
                <span className="inline-flex rounded-full bg-white/10 px-3.5 py-1 font-sans text-[11.5px] font-black uppercase tracking-wider text-[#D2E823]">
                  {locale === 'en' ? 'Problem Solving' : 'Wyzwania Projektowe'}
                </span>
                <h2 className="mt-3 font-display text-[28px] font-black tracking-[-0.03em] text-white sm:text-[34px]">
                  {t.caseStudy.challengesTitle}
                </h2>

                <div className="mt-7 space-y-4">
                  {challengePoints.map((point, idx) => {
                    const parsed = parseArchitectureModule(point);
                    return (
                      <div
                        key={idx}
                        className="rounded-[22px] border border-white/10 bg-white/[0.05] p-5 transition-colors hover:bg-white/[0.08]"
                      >
                        <span className="font-sans text-[11px] font-black uppercase tracking-wider text-[#D2E823]">
                          {locale === 'en'
                            ? `Challenge 0${idx + 1}`
                            : `Wyzwanie 0${idx + 1}`}
                        </span>
                        {parsed.title ? (
                          <div className="mt-1.5">
                            <h4 className="font-sans text-[16px] font-bold text-white">
                              {parsed.title}
                            </h4>
                            <p className="mt-1 font-sans text-[15px] font-medium leading-[1.65] text-white/85">
                              {parsed.description}
                            </p>
                          </div>
                        ) : (
                          <p className="mt-1.5 font-sans text-[15.5px] font-medium leading-[1.65] text-white/90">
                            {point}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Column: Results & Engineering Takeaways (Light Accented Card) */}
            <div className="flex flex-col justify-between rounded-[32px] border border-black/[0.05] bg-[#FFFFFF] p-8 shadow-sm md:p-10 lg:col-span-6">
              <div>
                <span
                  className="inline-flex rounded-full px-3.5 py-1 font-sans text-[11.5px] font-black uppercase tracking-wider"
                  style={{ backgroundColor: colors.bg, color: colors.title }}
                >
                  {locale === 'en' ? 'Impact & Outcomes' : 'Efekty i Wnioski'}
                </span>
                <h2 className="mt-3 font-display text-[28px] font-black tracking-[-0.03em] text-[#1E2330] sm:text-[34px]">
                  {t.caseStudy.resultsTitle}
                </h2>

                <div className="mt-7 space-y-4">
                  {resultPoints.map((point, idx) => {
                    const parsed = parseArchitectureModule(point);
                    return (
                      <div
                        key={idx}
                        className="rounded-[22px] border border-black/[0.04] bg-[#F3F3F1] p-5 transition-colors hover:bg-[#EAEAE5]"
                      >
                        <div className="flex items-center gap-2">
                          <span
                            className="inline-flex h-5 w-5 items-center justify-center rounded-full font-sans text-[11px] font-black"
                            style={{ backgroundColor: colors.bg, color: colors.title }}
                          >
                            ✓
                          </span>
                          <span className="font-sans text-[11px] font-black uppercase tracking-wider text-[#1E2330]">
                            {locale === 'en'
                              ? `Outcome 0${idx + 1}`
                              : `Rezultat 0${idx + 1}`}
                          </span>
                        </div>
                        {parsed.title ? (
                          <div className="mt-2">
                            <h4 className="font-sans text-[16px] font-bold text-[#1E2330]">
                              {parsed.title}
                            </h4>
                            <p className="mt-1 font-sans text-[15px] font-medium leading-[1.65] text-[#3B404E]">
                              {parsed.description}
                            </p>
                          </div>
                        ) : (
                          <p className="mt-2 font-sans text-[15.5px] font-medium leading-[1.65] text-[#3B404E]">
                            {point}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Behind The Scenes Team Photos — Adaptive Bento Collage with Lightbox */}
          {teamPhotos.length > 0 && (
            <div>
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span
                    className="inline-flex rounded-full px-3.5 py-1 font-sans text-[11.5px] font-black uppercase tracking-wider"
                    style={{ backgroundColor: colors.bg, color: colors.title }}
                  >
                    {locale === 'en' ? 'Behind the Scenes' : 'Kulisy i Zespół'}
                  </span>
                  <h2 className="mt-2 font-display text-[32px] font-black tracking-[-0.035em] text-[#1E2330] sm:text-[40px]">
                    {t.caseStudy.teamPhotosTitle}
                  </h2>
                </div>
                <span className="font-sans text-[13.5px] font-bold text-[#687082]">
                  {locale === 'en'
                    ? 'Click any photo to view full size'
                    : 'Kliknij zdjęcie, aby zobaczyć w pełnym rozmiarze'}
                </span>
              </div>

              {/* Adaptive Bento Collage based on photo count */}
              {teamPhotos.length === 2 && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-[920px]">
                  {teamPhotos.map((photo, idx) => (
                    <div
                      key={photo}
                      onClick={() => openTeamLightbox(idx)}
                      className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-[28px] bg-[#1E2330] shadow-md"
                    >
                      <img
                        src={photo}
                        alt={`${project.title} team ${idx + 1}`}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <span className="rounded-full bg-white/95 px-4 py-1.5 font-sans text-[12px] font-extrabold text-[#1E2330]">
                          {locale === 'en' ? 'View Photo' : 'Powiększ zdjęcie'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {teamPhotos.length === 4 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                  {/* Row 1: Landscape (3.jpg) + Portrait (5.jpg) */}
                  {[0, 2, 3, 1].map((photoIdx, slotIdx) => {
                    const photo = teamPhotos[photoIdx];
                    if (!photo) return null;
                    const isWide = slotIdx === 0 || slotIdx === 3;
                    return (
                      <div
                        key={photo}
                        onClick={() => openTeamLightbox(photoIdx)}
                        className={`group relative cursor-pointer overflow-hidden rounded-[28px] bg-[#1E2330] shadow-md ${
                          isWide
                            ? 'md:col-span-7 aspect-[16/11]'
                            : 'md:col-span-5 aspect-[4/5] md:aspect-auto md:h-full min-h-[320px]'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${project.title} behind the scenes ${photoIdx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <span className="rounded-full bg-white/95 px-4 py-1.5 font-sans text-[12px] font-extrabold text-[#1E2330]">
                            {locale === 'en' ? 'View Photo' : 'Powiększ zdjęcie'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {teamPhotos.length !== 2 && teamPhotos.length !== 4 && (
                <div className="grid grid-cols-1 gap-5 md:grid-cols-12">
                  {teamPhotos.map((photo, idx) => {
                    const isTopRow = idx < 2 && teamPhotos.length >= 5;
                    return (
                      <div
                        key={photo}
                        onClick={() => openTeamLightbox(idx)}
                        className={`group relative cursor-pointer overflow-hidden rounded-[28px] bg-[#1E2330] shadow-md ${
                          isTopRow
                            ? 'md:col-span-6 aspect-[16/10]'
                            : 'md:col-span-4 aspect-[4/3]'
                        }`}
                      >
                        <img
                          src={photo}
                          alt={`${project.title} behind the scenes ${idx + 1}`}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                          <span className="rounded-full bg-white/95 px-4 py-1.5 font-sans text-[12px] font-extrabold text-[#1E2330]">
                            {locale === 'en' ? 'View Photo' : 'Powiększ zdjęcie'}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          PREVIOUS / NEXT PROJECT NAVIGATION BANNER
      ========================================================================= */}
      <section className="w-full bg-[#1E2330] py-16 text-white md:py-20 border-t border-white/10">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Previous Project Card */}
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group flex flex-col justify-between rounded-[36px] bg-white/5 p-8 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 md:p-10"
            >
              <div>
                <span className="font-sans text-[12.5px] font-black uppercase tracking-wider text-[#D2E823]">
                  {locale === 'en' ? 'Previous Project' : 'Poprzedni Projekt'}
                </span>
                <h3 className="mt-2 font-display text-[26px] font-black tracking-[-0.03em] text-white transition-colors group-hover:text-[#D2E823] sm:text-[30px]">
                  {prevProject.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-sans text-[15px] font-medium text-white/70">
                  {prevProject.shortDescription[locale]}
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center rounded-full bg-white/10 px-5 py-2 font-sans text-[13px] font-bold text-white transition-colors group-hover:bg-[#D2E823] group-hover:text-[#1E2330]">
                  {locale === 'en' ? 'Previous Case Study' : 'Poprzedni Projekt'}
                </span>
              </div>
            </Link>

            {/* Next Project Card */}
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group flex flex-col justify-between rounded-[36px] bg-white/5 p-8 border border-white/10 transition-all duration-300 hover:bg-white/10 hover:-translate-y-1 md:p-10"
            >
              <div>
                <span className="font-sans text-[12.5px] font-black uppercase tracking-wider text-[#D2E823]">
                  {locale === 'en' ? 'Next Project' : 'Kolejny Projekt'}
                </span>
                <h3 className="mt-2 font-display text-[26px] font-black tracking-[-0.03em] text-white transition-colors group-hover:text-[#D2E823] sm:text-[30px]">
                  {nextProject.title}
                </h3>
                <p className="mt-2 line-clamp-2 font-sans text-[15px] font-medium text-white/70">
                  {nextProject.shortDescription[locale]}
                </p>
              </div>
              <div className="mt-6">
                <span className="inline-flex items-center rounded-full bg-[#D2E823] px-5 py-2 font-sans text-[13px] font-bold text-[#1E2330] shadow-md transition-transform group-hover:scale-105">
                  {locale === 'en' ? 'Next Case Study' : 'Kolejny Projekt'}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer theme="dark" />

      {/* Embedded Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setActiveVideo(null)}
          >
            <div
              className={`relative flex ${
                activeVideo.isPortrait
                  ? 'aspect-[9/16] h-[80vh] max-h-[720px] max-w-[90vw]'
                  : 'aspect-[16/9] w-[90vw] max-w-[1000px]'
              } flex-col overflow-hidden rounded-[36px] bg-[#1E2330] shadow-2xl`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
                aria-label="Close video"
              >
                ✕
              </button>

              <iframe
                src={activeVideo.url}
                title={`${activeVideo.title} Demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Lightbox Modal (Supports both Gallery Screenshots & Behind the Scenes Team Photos) */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        images={activeLightboxImages}
        currentIndex={lightboxState.index}
        onNavigate={(newIdx) => setLightboxState((prev) => ({ ...prev, index: newIdx }))}
      />
    </div>
  );
};

export default ProjectDetailPage;
