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

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const t = translations[locale];

  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const [prevSlug, setPrevSlug] = useState(slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<{
    url: string;
    isPortrait: boolean;
    title: string;
  } | null>(null);

  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setSelectedImageIndex(0);
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

  const selectedImage = project.images[selectedImageIndex] || project.images[0] || null;
  const isPortrait = project.slug === 'plan-pm';

  const renderLinkIcon = (label: string) => {
    const l = label.toLowerCase();
    if (l.includes('google play')) return <GooglePlayIcon className="h-4 w-4" />;
    if (l.includes('app store')) return <AppleAppStoreIcon className="h-4 w-4" />;
    if (l.includes('github') || l.includes('source code')) return <GitHubIcon className="h-4 w-4" />;
    if (l.includes('demo')) return <PlayIcon className="h-3.5 w-3.5" />;
    return null;
  };

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
          BODY SECTION: Interactive Media Showcase + 3 White Editorial Cards
      ========================================================================= */}
      <section className="w-full bg-[#F3F3F1] py-24 md:py-32">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          {/* Main Media Showcase */}
          {selectedImage && (
            <div className="overflow-hidden rounded-[36px] bg-[#FFFFFF] p-4 shadow-sm md:p-6">
              <div
                onClick={() => setIsLightboxOpen(true)}
                className="group relative flex min-h-[360px] w-full max-h-[640px] cursor-pointer items-center justify-center overflow-hidden rounded-[26px] bg-[#1E2330] p-3 md:min-h-[480px]"
              >
                <img
                  src={selectedImage}
                  alt={project.title}
                  className="max-h-[600px] w-auto max-w-full rounded-[18px] object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 rounded-full bg-black/60 px-4 py-1.5 font-sans text-[12px] font-bold text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  Full Screen
                </div>
              </div>

              {/* Thumbnails Row */}
              {project.images.length > 1 && (
                <div className="mt-5 flex gap-3 overflow-x-auto pb-1">
                  {project.images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative shrink-0 cursor-pointer overflow-hidden rounded-[16px] border-2 transition-all ${
                        isPortrait ? 'h-28 w-14 bg-black p-1' : 'h-20 w-32 bg-black'
                      } ${
                        selectedImageIndex === idx
                          ? 'scale-105 opacity-100 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                      style={{
                        borderColor: selectedImageIndex === idx ? colors.bg : 'transparent',
                      }}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className={`h-full w-full ${isPortrait ? 'object-contain' : 'object-cover'}`}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 3 White Editorial Cards */}
          <div className="mt-14 space-y-8">
            {/* 1. System Architecture & Implementation */}
            <div className="rounded-[36px] bg-[#FFFFFF] p-8 shadow-sm md:p-12">
              <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-[#1E2330] sm:text-[34px]">
                {t.caseStudy.architectureTitle}
              </h2>
              <div className="mt-6 space-y-4 font-sans text-[16.5px] font-medium leading-[1.7] text-[#4A4F5C]">
                {project.caseStudy.architecture[locale].map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </div>
            </div>

            {/* 2. Technical Challenges */}
            <div className="rounded-[36px] bg-[#FFFFFF] p-8 shadow-sm md:p-12">
              <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-[#1E2330] sm:text-[34px]">
                {t.caseStudy.challengesTitle}
              </h2>
              <div className="mt-6 space-y-4 font-sans text-[16.5px] font-medium leading-[1.7] text-[#4A4F5C]">
                {project.caseStudy.challenges[locale].map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </div>
            </div>

            {/* 3. Results & Engineering Takeaways */}
            <div className="rounded-[36px] bg-[#FFFFFF] p-8 shadow-sm md:p-12">
              <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-[#1E2330] sm:text-[34px]">
                {t.caseStudy.resultsTitle}
              </h2>
              <div className="mt-6 space-y-4 font-sans text-[16.5px] font-medium leading-[1.7] text-[#4A4F5C]">
                {project.caseStudy.results[locale].map((point, idx) => (
                  <p key={idx}>{point}</p>
                ))}
              </div>
            </div>

            {/* 4. Behind The Scenes Team Photos (where applicable) */}
            {project.caseStudy.relatedTeamPhotos &&
              project.caseStudy.relatedTeamPhotos.length > 0 && (
                <div className="rounded-[36px] bg-[#FFFFFF] p-8 shadow-sm md:p-12">
                  <h2 className="font-display text-[28px] font-black tracking-[-0.03em] text-[#1E2330] sm:text-[34px]">
                    {t.caseStudy.teamPhotosTitle}
                  </h2>
                  <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {project.caseStudy.relatedTeamPhotos.map((photo, idx) => (
                      <div
                        key={idx}
                        className="overflow-hidden rounded-[24px] bg-[#1E2330] shadow-md"
                      >
                        <img
                          src={photo}
                          alt="Team development"
                          className="h-64 w-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
          </div>
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

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={project.images.map((img) => ({
          src: project.slug === 'plan-pm' ? img.replace('/images/PlanPM/', '/images/PlanPM/full/') : img,
          caption: project.title,
        }))}
        currentIndex={selectedImageIndex}
        onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </div>
  );
};

export default ProjectDetailPage;
