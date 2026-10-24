import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { AppleAppStoreIcon, GitHubIcon, GooglePlayIcon, PlayIcon } from '../components/ui/BrandIcons';
import { LightboxModal } from '../components/ui/LightboxModal';
import { useLocale } from '../context/useLocale';
import { FEATURED_PROJECTS } from '../data/projectData';
import { translations } from '../i18n/translations';

const COLOR_PAIRS: Record<
  string,
  { bg: string; title: string; body: string; pillBg: string; pillText: string }
> = {
  'ocean-simulation': {
    bg: '#0B3B59',
    title: '#B8E8FC',
    body: '#E2F4FD',
    pillBg: '#B8E8FC',
    pillText: '#0B3B59',
  },
  'plan-pm': {
    bg: '#E9C0E9',
    title: '#502274',
    body: '#1E2330',
    pillBg: '#502274',
    pillText: '#FFFFFF',
  },
  'world-of-drones': {
    bg: '#D2E823',
    title: '#254F1A',
    body: '#1E2330',
    pillBg: '#254F1A',
    pillText: '#D2E823',
  },
  aleksy: {
    bg: '#502274',
    title: '#E9C0E9',
    body: '#F3F3F1',
    pillBg: '#E9C0E9',
    pillText: '#502274',
  },
  'navigator-pm': {
    bg: '#254F1A',
    title: '#D2E823',
    body: '#FFFFFF',
    pillBg: '#D2E823',
    pillText: '#1E2330',
  },
};

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { locale } = useLocale();
  const t = translations[locale];

  const project = FEATURED_PROJECTS.find((p) => p.slug === slug);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

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

  const colors =
    COLOR_PAIRS[project.slug] || {
      bg: '#254F1A',
      title: '#D2E823',
      body: '#FFFFFF',
      pillBg: '#D2E823',
      pillText: '#1E2330',
    };

  const selectedImage = project.images[selectedImageIndex] || project.images[0] || null;

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
              ← {t.caseStudy.backToOverview}
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

            {/* Tech Stack Pills */}
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-[#FFFFFF]/15 px-3.5 py-2 font-sans text-[13px] font-bold text-[#FFFFFF]"
              >
                {tech}
              </span>
            ))}

            {/* External Links */}
            {project.links.map((link, idx) => (
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
            ))}
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
                className="group relative flex min-h-[360px] w-full max-h-[640px] cursor-pointer items-center justify-center overflow-hidden rounded-[26px] bg-[#1E2330] p-2 md:min-h-[480px]"
              >
                <img
                  src={selectedImage}
                  alt={project.title}
                  className="max-h-[600px] w-auto max-w-full rounded-[18px] object-contain shadow-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute top-4 right-4 rounded-full bg-black/50 px-4 py-1.5 font-sans text-[12px] font-bold text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                  Full Screen ↗
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
                      className={`relative h-20 w-32 shrink-0 cursor-pointer overflow-hidden rounded-[16px] border-2 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-[#254F1A] scale-105 opacity-100 shadow-md'
                          : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        className="h-full w-full object-cover"
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

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        images={project.images.map((img) => ({
          src: img,
          caption: project.title,
        }))}
        currentIndex={selectedImageIndex}
        onNavigate={(newIdx) => setSelectedImageIndex(newIdx)}
      />
    </div>
  );
};

export default ProjectDetailPage;
