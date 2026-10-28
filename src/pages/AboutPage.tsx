import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon } from '../components/ui/BrandIcons';
import { Footer } from '../components/layout/Footer';
import { LightboxModal } from '../components/ui/LightboxModal';
import { useLocale } from '../context/useLocale';
import { PHOTO_DATA } from '../data/photoData';
import { translations } from '../i18n/translations';

interface RoleBadgeProps {
  roleText: string;
  pillColor: string;
  dateColor: string;
}

const RoleBadge: React.FC<RoleBadgeProps> = ({ roleText, pillColor, dateColor }) => {
  const parts = roleText.split(' · ');
  const title = parts[0];
  const date = parts[1];

  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <span className={`inline-flex items-center rounded-full px-3.5 py-1 font-sans text-[12px] font-bold ${pillColor}`}>
        {title}
      </span>
      {date && (
        <span className={`font-sans text-[12px] font-bold tracking-tight whitespace-nowrap ${dateColor}`}>
          {date}
        </span>
      )}
    </div>
  );
};

export const AboutPage: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [activeCategory, setActiveCategory] = useState<'all' | 'sports' | 'team' | 'lifestyle'>('all');

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mikolaj.molodecki133@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${t.about.title} — Mikołaj Mołodecki`;
  }, [t.about.title]);

  const sportsPhotos = PHOTO_DATA[1] || [];
  const teamPhotos = PHOTO_DATA[2] || [];
  const lifestylePhotos = PHOTO_DATA[3] || [];

  const displayPhotos =
    activeCategory === 'sports'
      ? sportsPhotos
      : activeCategory === 'team'
        ? teamPhotos
        : activeCategory === 'lifestyle'
          ? lifestylePhotos
          : [...sportsPhotos, ...teamPhotos, ...lifestylePhotos];

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
              {t.caseStudy.backToOverview}
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
          1. COMMERCIAL & INDUSTRIAL EXPERIENCE (Warm Alabaster #F3F3F1)
      ========================================================================= */}
      <section className="w-full bg-[#F3F3F1] py-20 md:py-28 border-b border-black/5">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]">
              {locale === 'en' ? 'Track Record' : 'Doświadczenie Zawodowe'}
            </span>
            <h2 className="mt-2 font-display text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-[#1E2330] sm:text-[44px]">
              {t.about.workTitle}
            </h2>
            <p className="mt-3 font-sans text-[16px] font-medium text-[#4A4F5C]">
              {t.about.workSubtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* 1. GlobalLogic */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#D2E823] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10">
              <div>
                <RoleBadge
                  roleText={t.about.globallogicRole}
                  pillColor="bg-[#254F1A]/15 text-[#254F1A]"
                  dateColor="text-[#254F1A]/75"
                />
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#254F1A]">
                  {t.about.globallogicTitle}
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-[#1E2330]">
                  {t.about.globallogicDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-[#254F1A]/15">
                {['Agile/Scrum', 'Autodesk Fusion', 'Nano AI', 'FastAPI', 'React', 'CI/CD'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/70 px-3 py-1 font-sans text-[11.5px] font-bold text-[#254F1A]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. Altcom S.J. */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#0B3B59] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <RoleBadge
                  roleText={t.about.altcomRole}
                  pillColor="bg-white/15 text-[#B8E8FC]"
                  dateColor="text-[#B8E8FC]/75"
                />
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#B8E8FC]">
                  {t.about.altcomTitle}
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-[#E2F4FD]">
                  {t.about.altcomDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['UNIX/Linux', 'NAS Storage', 'Routing', 'DHCP/DNS', 'Helpdesk'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-bold text-[#B8E8FC]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. MVB */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#1E2330] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <RoleBadge
                  roleText={t.about.mvbRole}
                  pillColor="bg-white/15 text-[#D2E823]"
                  dateColor="text-white/70"
                />
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#FFFFFF]">
                  {t.about.mvbTitle}
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-white/80">
                  {t.about.mvbDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['Server RACK', 'Structured Cabling', 'Network Hardware', 'Workstations'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-bold text-white/90">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. EDUCATION & ACADEMIC FOUNDATION
      ========================================================================= */}
      <section className="w-full bg-[#FFFFFF] py-20 md:py-28 border-b border-black/5">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#0B3B59]">
              {locale === 'en' ? 'Education' : 'Wykształcenie'}
            </span>
            <h2 className="mt-2 font-display text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-[#1E2330] sm:text-[44px]">
              {t.about.eduHeading}
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Politechnika Morska */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#0B3B59] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <RoleBadge
                  roleText={t.about.pmDegree}
                  pillColor="bg-white/15 text-[#B8E8FC]"
                  dateColor="text-[#B8E8FC]/75"
                />
                <h3 className="mt-4 font-display text-[26px] font-black tracking-[-0.03em] text-[#B8E8FC]">
                  {t.about.pmTitle}
                </h3>
                <p className="mt-4 font-sans text-[15.5px] font-medium leading-[1.65] text-[#E2F4FD]">
                  {t.about.pmDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['Inżynier', 'Unity 3D', 'HLSL Shaders', 'Gerstner Waves', 'Hydrodynamics'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[12px] font-bold text-white">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Technikum Technologii Cyfrowych */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#254F1A] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <RoleBadge
                  roleText={t.about.ttcDegree}
                  pillColor="bg-white/15 text-[#D2E823]"
                  dateColor="text-[#D2E823]/75"
                />
                <h3 className="mt-4 font-display text-[26px] font-black tracking-[-0.03em] text-[#D2E823]">
                  {t.about.ttcTitle}
                </h3>
                <p className="mt-4 font-sans text-[15.5px] font-medium leading-[1.65] text-white/90">
                  {t.about.ttcDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['Dyplom z wyróżnieniem', 'Internet of Things (IoT)', 'INF.02', 'INF.03', 'Radiowęzeł'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[12px] font-bold text-[#D2E823]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications & Volunteering Row */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-[28px] bg-[#F3F3F1] p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#254F1A] text-[#D2E823] font-sans font-black text-[13px]">
                PL-900
              </div>
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  Microsoft Certified
                </span>
                <p className="font-sans text-[14.5px] font-bold text-[#1E2330]">
                  {t.about.certPl900}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-[28px] bg-[#F3F3F1] p-6 shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B3B59] text-[#B8E8FC] font-sans font-black text-[12px]">
                PySci
              </div>
              <div>
                <span className="font-sans text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                  Conference Volunteering
                </span>
                <p className="font-sans text-[14.5px] font-bold text-[#1E2330]">
                  {t.about.certEuroscipy}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          3. KNI SCIENCE CLUB ACTIVITY (Soft Rose #E9C0E9)
      ========================================================================= */}
      <section className="w-full bg-[#E9C0E9] py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="rounded-[40px] bg-white p-8 shadow-sm md:p-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#502274]">
                  {locale === 'en' ? 'Student Initiative & Community' : 'Inicjatywa Studencka i Społeczność'}
                </span>
                <h2 className="mt-2 font-display text-[32px] font-black tracking-[-0.03em] text-[#502274] sm:text-[40px]">
                  {t.about.kniHeading}
                </h2>
              </div>
              <span className="self-start rounded-full bg-[#502274]/10 px-4 py-1.5 font-sans text-[13px] font-bold text-[#502274]">
                {t.about.kniRole}
              </span>
            </div>

            <p className="mt-6 font-sans text-[16.5px] font-medium leading-[1.7] text-[#1E2330]">
              {t.about.kniDesc}
            </p>

            <div className="mt-8 flex flex-wrap gap-2 pt-6 border-t border-black/5">
              {[
                locale === 'en' ? 'Flat team structure (no rigid leads)' : 'Płaska struktura partnerska (bez sztywnych leadów)',
                locale === 'en' ? 'Conference organization' : 'Współorganizacja konferencji',
                locale === 'en' ? 'Hackathons (HackYeah 2026)' : 'Hackathony (HackYeah 2026)',
                locale === 'en' ? 'PlanPM (1,000+ downloads)' : 'PlanPM (ponad 1000 pobrań)',
                'NavigatorPM',
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full bg-[#E9C0E9]/40 px-4 py-1.5 font-sans text-[13px] font-bold text-[#502274]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          4. ATHLETICS, E-SPORTS & PASSIONS
      ========================================================================= */}
      <section className="w-full bg-[#F3F3F1] py-20 md:py-28 border-b border-black/5">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <div className="max-w-2xl">
            <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#780016]">
              {locale === 'en' ? 'Focus, Reflexes & Tenacity' : 'Dyscyplina i Refleks'}
            </span>
            <h2 className="mt-2 font-display text-[34px] font-black leading-[1.08] tracking-[-0.035em] text-[#1E2330] sm:text-[44px]">
              {t.about.passionsHeading}
            </h2>
            <p className="mt-3 font-sans text-[16px] font-medium text-[#4A4F5C]">
              {t.about.passionsDesc}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* 1. Volleyball & Outdoors (Deep Burgundy #780016) */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#780016] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <span className="rounded-full bg-white/15 px-3 py-1 font-sans text-[12px] font-bold text-[#E9C0E9]">
                  {locale === 'en' ? 'Sports & Outdoors' : 'Siatkówka i Outdoor'}
                </span>
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#E9C0E9]">
                  AZS Politechnika Morska
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-white">
                  {t.about.sportsVball}
                </p>
                <p className="mt-3 font-sans text-[14.5px] font-medium leading-[1.6] text-white/80">
                  {t.about.sportsOutdoors}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['AZS Siatkówka', 'Półfinały AMP', 'Kajaki', 'Narciarstwo alpejskie'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-bold text-[#E9C0E9]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 2. E-sports & Precision (Charcoal #1E2330) */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#1E2330] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <span className="rounded-full bg-white/15 px-3 py-1 font-sans text-[12px] font-bold text-[#D2E823]">
                  {locale === 'en' ? 'High-Level Gaming' : 'E-sport i Gry Precyzyjne'}
                </span>
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#FFFFFF]">
                  {t.about.esportsTitle}
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-white/90">
                  {t.about.esportsLoL}
                </p>
                <p className="mt-3 font-sans text-[14.5px] font-medium leading-[1.6] text-white/80">
                  {t.about.esportsOsu}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['League of Legends (Master)', 'osu! Top 10k', 'Sub-second Reflexes', 'High Pressure Focus'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-bold text-[#D2E823]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 3. Game Development in Unity (Canopy Green #254F1A) */}
            <div className="flex flex-col justify-between rounded-[36px] bg-[#254F1A] p-8 shadow-sm transition-transform duration-300 hover:-translate-y-1.5 md:p-10 text-white">
              <div>
                <span className="rounded-full bg-white/15 px-3 py-1 font-sans text-[12px] font-bold text-[#D2E823]">
                  {locale === 'en' ? 'Game Development' : 'Tworzenie Gier'}
                </span>
                <h3 className="mt-4 font-display text-[24px] font-black tracking-[-0.03em] text-[#D2E823]">
                  Unity & C#
                </h3>
                <p className="mt-4 font-sans text-[15px] font-medium leading-[1.65] text-white/90">
                  {t.about.gamedevDesc}
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/10">
                {['Unity', 'C#', 'HLSL Shaders', 'Physics Simulation', 'Real-time Graphics'].map((tag) => (
                  <span key={tag} className="rounded-full bg-white/15 px-3 py-1 font-sans text-[11.5px] font-bold text-[#D2E823]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          5. PHOTO GALLERY SECTION (Soft Rose #E9C0E9) with Smooth PopLayout
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
              <button
                type="button"
                onClick={() => setActiveCategory('lifestyle')}
                className={`cursor-pointer rounded-full px-5 py-2 font-sans text-[13.5px] font-bold transition-all ${
                  activeCategory === 'lifestyle'
                    ? 'bg-[#780016] text-[#FFFFFF] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#1E2330] hover:bg-[#F3F3F1]'
                }`}
              >
                {locale === 'en' ? 'Life & Moments' : 'Życie i Pasje'}
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
                      Zoom
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

      {/* =========================================================================
          6. CONTACT CTA SECTION (Deep Burgundy #780016)
      ========================================================================= */}
      <section className="w-full bg-[#780016] py-20 text-center">
        <div className="mx-auto max-w-[1240px] px-4 md:px-6">
          <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#E9C0E9]">
            {locale === 'en' ? 'Get In Touch' : 'Nawiążmy Kontakt'}
          </span>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-[36px] font-black leading-[1.05] tracking-[-0.035em] text-[#E9C0E9] sm:text-[48px]">
            {locale === 'en' ? "Let's build something remarkable." : 'Zbudujmy coś niezwykłego.'}
          </h2>
          <p className="mx-auto mt-3 max-w-xl font-sans text-[16px] font-medium text-[#F3F3F1]">
            {t.contact.subtext}
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
            <button
              type="button"
              onClick={handleCopyEmail}
              className="flex h-12 min-w-[170px] cursor-pointer items-center justify-center gap-2 rounded-full bg-[#D2E823] px-7 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              {isCopied ? (
                <>
                  <CheckIcon className="h-4 w-4 text-[#254F1A]" />
                  <span>{t.contact.copied}</span>
                </>
              ) : (
                <>
                  <CopyIcon className="h-4 w-4 text-[#1E2330]" />
                  <span>{t.contact.copyEmail}</span>
                </>
              )}
            </button>

            <a
              href="https://github.com/MiniowaPM"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#FFFFFF] px-6 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <GitHubIcon className="h-4 w-4" />
              <span>GitHub</span>
            </a>

            <a
              href="https://www.linkedin.com/in/miko%C5%82aj-mo%C5%82odecki-2b135043b/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#FFFFFF] px-6 font-sans text-[14.5px] font-bold text-[#1E2330] shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <LinkedInIcon className="h-4 w-4" />
              <span>LinkedIn</span>
            </a>

            <a
              href="/content/Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-12 items-center gap-2 rounded-full bg-[#254F1A] px-6 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              <span>{t.contact.downloadCv}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer theme="dark" />

      {/* Full-Screen Image Lightbox */}
      <LightboxModal
        isOpen={lightboxOpen}
        images={displayPhotos.map((p) => ({
          src: p.src,
          caption: p.caption[locale],
        }))}
        currentIndex={lightboxIndex}
        onNavigate={setLightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};
