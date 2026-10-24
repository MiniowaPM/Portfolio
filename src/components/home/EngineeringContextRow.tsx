import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { PHOTO_DATA } from '../../data/photoData';
import { TrophyIcon, RocketIcon, GlobeIcon, VolleyballIcon, RotateIcon, PauseIcon } from '../ui/BrandIcons';

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

const TECH_PILLS = [
  { name: 'Flutter & Dart', bg: '#502274', text: '#FFFFFF' },
  { name: 'HLSL GPU Shaders', bg: '#0B3B59', text: '#B8E8FC' },
  { name: 'C# & Unity Engine', bg: '#254F1A', text: '#D2E823' },
  { name: 'Edge AI & PyTorch', bg: '#780016', text: '#E9C0E9' },
  { name: 'FastAPI & Python', bg: '#D2E823', text: '#254F1A' },
  { name: 'TypeScript & React', bg: '#1E2330', text: '#FFFFFF' },
  { name: 'Linux & NVIDIA Jetson', bg: '#502274', text: '#E9C0E9' },
  { name: 'STM32 & Raspberry Pi', bg: '#254F1A', text: '#FFFFFF' },
  { name: 'Supabase & SQL', bg: '#0B3B59', text: '#FFFFFF' },
  { name: 'CI/CD & Git Actions', bg: '#E9C0E9', text: '#502274' },
];

export const EngineeringContextRow: React.FC = () => {
  const { locale } = useLocale();

  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [totalYearly, setTotalYearly] = useState<number>(347);
  const [publicReposCount, setPublicReposCount] = useState<number>(9);
  const [hoveredDay, setHoveredDay] = useState<ContributionDay | null>(null);

  // Team Photo Cycling Deck
  const teamPhotos = useMemo(() => [...PHOTO_DATA[1], ...PHOTO_DATA[2]], []);
  const [teamPhotoIdx, setTeamPhotoIdx] = useState(4); // e.g. "Award winners! 🏆"
  const [isTeamHovered, setIsTeamHovered] = useState(false);
  const [teamProgress, setTeamProgress] = useState(0);

  const handleNextTeamPhoto = useCallback(() => {
    setTeamPhotoIdx((prev) => (prev + 1) % teamPhotos.length);
    setTeamProgress(0);
  }, [teamPhotos.length]);

  useEffect(() => {
    if (isTeamHovered) return;
    const intervalTime = 50;
    const totalDuration = 4200;
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setTeamProgress((prev) => {
        if (prev >= 100) {
          handleNextTeamPhoto();
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isTeamHovered, handleNextTeamPhoto]);

  // Fetch Contribution Data
  useEffect(() => {
    let isMounted = true;
    fetch('https://github-contributions-api.jogruber.de/v4/MiniowaPM?y=last')
      .then((res) => res.json())
      .then((data) => {
        if (!isMounted) return;
        if (data?.total?.lastYear) setTotalYearly(data.total.lastYear);
        if (Array.isArray(data?.contributions)) setContributions(data.contributions);
      })
      .catch(() => {});

    fetch('https://api.github.com/users/MiniowaPM')
      .then((res) => res.json())
      .then((userData) => {
        if (isMounted && typeof userData?.public_repos === 'number') {
          setPublicReposCount(userData.public_repos);
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  // Compute Active Days, Peak Day & 26-Week Matrix
  const { activeDaysCount, peakDayCount, monthlyTotals, recentWeeks } = useMemo(() => {
    if (!contributions.length) {
      return {
        activeDaysCount: 130,
        peakDayCount: 18,
        monthlyTotals: [
          { month: 'Nov', count: 28 },
          { month: 'Dec', count: 18 },
          { month: 'Jan', count: 42 },
          { month: 'Feb', count: 36 },
          { month: 'Mar', count: 54 },
          { month: 'Apr', count: 40 },
          { month: 'May', count: 32 },
          { month: 'Jun', count: 24 },
          { month: 'Jul', count: 19 },
          { month: 'Aug', count: 26 },
          { month: 'Sep', count: 38 },
          { month: 'Oct', count: 45 },
        ],
        recentWeeks: [] as ContributionDay[][],
      };
    }

    let active = 0;
    let peak = 0;
    const monthsMap: Record<string, number> = {};

    contributions.forEach((day) => {
      if (day.count > 0) active++;
      if (day.count > peak) peak = day.count;

      const monthKey = new Date(day.date).toLocaleString('en', { month: 'short' });
      monthsMap[monthKey] = (monthsMap[monthKey] || 0) + day.count;
    });

    const monthList = Object.entries(monthsMap).map(([month, count]) => ({
      month,
      count,
    }));

    // Last 26 weeks (26 * 7 = 182 days) for full card width coverage
    const recent = contributions.slice(-182);
    const weeks: ContributionDay[][] = [];
    for (let i = 0; i < recent.length; i += 7) {
      weeks.push(recent.slice(i, i + 7));
    }

    return {
      activeDaysCount: active || 130,
      peakDayCount: peak || 18,
      monthlyTotals: monthList.length ? monthList : [],
      recentWeeks: weeks,
    };
  }, [contributions]);

  const getColorForLevel = (level: number) => {
    switch (level) {
      case 1:
        return '#A3D977';
      case 2:
        return '#5CAE3B';
      case 3:
        return '#254F1A';
      case 4:
        return '#D2E823';
      default:
        return '#EBEBE6';
    }
  };

  const currentTeamPhoto = teamPhotos[teamPhotoIdx] || teamPhotos[0];

  return (
    <section className="w-full bg-[#FFFFFF] py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6">
        {/* Section Header */}
        <div className="max-w-2xl">
          <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]">
            {locale === 'en' ? 'Toolkit & Open Source Pulse' : 'Stack & Puls Open Source'}
          </span>
          <h2 className="mt-3 font-display text-[38px] font-black leading-[1.05] tracking-[-0.035em] text-[#1E2330] sm:text-[48px]">
            {locale === 'en'
              ? 'Built across hardware, graphics & systems.'
              : 'Rozwijane na styku sprzętu, grafiki i systemów.'}
          </h2>
        </div>

        {/* Infinite Tech Pill Marquee (Glides seamlessly and pauses on hover) */}
        <div className="mt-10 overflow-hidden py-2">
          <motion.div
            className="flex w-max gap-3 cursor-grab"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 25,
                ease: 'linear',
              },
            }}
            whileHover={{ transition: { duration: 0 } }}
          >
            {[...TECH_PILLS, ...TECH_PILLS].map((pill, idx) => (
              <span
                key={`${pill.name}-${idx}`}
                style={{ backgroundColor: pill.bg, color: pill.text }}
                className="shrink-0 rounded-full px-5 py-2.5 font-sans text-[14.5px] font-bold shadow-sm transition-transform hover:scale-105 select-none"
              >
                {pill.name}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Main Activity Showcase Card */}
        <div className="mt-14 rounded-[40px] bg-[#F3F3F1] p-8 md:p-12">
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Side (7 Cols): Custom GitHub Activity Dashboard */}
            <div className="flex flex-col justify-between lg:col-span-7">
              <div>
                {/* 4 Custom Tactile Live Stat Badges */}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <div className="rounded-[24px] bg-[#FFFFFF] p-4 shadow-sm">
                    <span className="block font-sans text-[12px] font-bold text-[#71717A]">
                      {locale === 'en' ? 'Yearly Commits' : 'Roczne Commity'}
                    </span>
                    <span className="mt-1 block font-display text-[28px] font-black tracking-tight text-[#254F1A]">
                      {totalYearly}+
                    </span>
                  </div>

                  <div className="rounded-[24px] bg-[#FFFFFF] p-4 shadow-sm">
                    <span className="block font-sans text-[12px] font-bold text-[#71717A]">
                      {locale === 'en' ? 'Active Days' : 'Aktywne Dni'}
                    </span>
                    <span className="mt-1 block font-display text-[28px] font-black tracking-tight text-[#254F1A]">
                      {activeDaysCount}
                    </span>
                  </div>

                  <div className="rounded-[24px] bg-[#FFFFFF] p-4 shadow-sm">
                    <span className="block font-sans text-[12px] font-bold text-[#71717A]">
                      {locale === 'en' ? 'Peak Day Output' : 'Rekord Dzienny'}
                    </span>
                    <span className="mt-1 block font-display text-[28px] font-black tracking-tight text-[#254F1A]">
                      {peakDayCount}
                    </span>
                  </div>

                  <div className="rounded-[24px] bg-[#FFFFFF] p-4 shadow-sm">
                    <span className="block font-sans text-[12px] font-bold text-[#71717A]">
                      {locale === 'en' ? 'Public Repos' : 'Publiczne Repozytoria'}
                    </span>
                    <span className="mt-1 block font-display text-[28px] font-black tracking-tight text-[#254F1A]">
                      {publicReposCount}
                    </span>
                  </div>
                </div>

                {/* Custom Monthly Activity Bar Chart with guaranteed visible heights */}
                <div className="mt-6 rounded-[28px] bg-[#FFFFFF] p-6 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-[13.5px] font-bold text-[#1E2330]">
                      {locale === 'en' ? 'Monthly Coding Momentum' : 'Aktywność Miesięczna'}
                    </span>
                    <span className="rounded-full bg-[#D2E823] px-3 py-1 font-sans text-[11.5px] font-bold text-[#254F1A]">
                      Live GitHub Pulse
                    </span>
                  </div>

                  {/* 12 Vertical Columns */}
                  <div className="mt-6 flex h-28 items-end justify-between gap-1.5 sm:gap-2.5">
                    {monthlyTotals.map((item, idx) => {
                      const maxCount = Math.max(...monthlyTotals.map((m) => m.count), 1);
                      const barPixelHeight = Math.max(14, Math.min(84, Math.round((item.count / maxCount) * 84)));

                      return (
                        <div key={idx} className="group relative flex h-full flex-1 flex-col items-center justify-end">
                          {/* Tooltip on hover */}
                          <div className="absolute -top-7 z-20 hidden rounded-full bg-[#1E2330] px-2.5 py-0.5 font-sans text-[11px] font-bold text-white shadow-lg group-hover:block whitespace-nowrap">
                            {item.count} commits
                          </div>

                          {/* Rendered Bar */}
                          <div
                            style={{ height: `${barPixelHeight}px` }}
                            className="w-full min-h-[14px] rounded-full bg-[#254F1A] transition-all duration-300 group-hover:bg-[#D2E823] group-hover:scale-y-105"
                          />

                          {/* Month Label */}
                          <span className="mt-2 font-sans text-[11px] font-bold text-[#71717A]">
                            {item.month}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Tactile 26-Week Heatmap Matrix spanning full card width */}
                <div className="mt-6 rounded-[28px] bg-[#FFFFFF] p-6 shadow-sm">
                  <div className="flex h-7 items-center justify-between">
                    <span className="font-sans text-[13px] font-bold text-[#1E2330]">
                      {locale === 'en' ? 'Recent 26 Weeks Activity' : 'Ostatnie 26 Tygodni (Pół Roku)'}
                    </span>
                    <div className="flex h-6 min-w-[170px] items-center justify-end">
                      {hoveredDay ? (
                        <span className="rounded-full bg-[#1E2330] px-3 py-0.5 font-sans text-[11px] font-bold text-white">
                          {hoveredDay.date}: {hoveredDay.count} commits
                        </span>
                      ) : (
                        <span className="font-sans text-[11.5px] font-semibold text-[#71717A]">
                          {locale === 'en' ? 'Hover a day to inspect' : 'Najedź, aby sprawdzić'}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Full-width 26 columns grid */}
                  <div className="mt-4 flex w-full justify-between gap-1 overflow-x-auto pb-1">
                    {recentWeeks.map((week, wIdx) => (
                      <div key={wIdx} className="flex flex-col gap-1.5 flex-1 min-w-[8px] max-w-[16px]">
                        {week.map((day) => (
                          <div
                            key={day.date}
                            style={{ backgroundColor: getColorForLevel(day.level) }}
                            onMouseEnter={() => setHoveredDay(day)}
                            onMouseLeave={() => setHoveredDay(null)}
                            className="aspect-square w-full cursor-pointer rounded-[3px] transition-transform hover:scale-125 hover:z-10"
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Segmented Top Languages Pill Bar */}
                <div className="mt-6 rounded-[28px] bg-[#FFFFFF] p-5 shadow-sm">
                  <span className="block font-sans text-[12.5px] font-bold text-[#71717A]">
                    {locale === 'en' ? 'Core Code Distribution' : 'Główne Technologie'}
                  </span>
                  <div className="mt-3 flex h-4 w-full overflow-hidden rounded-full bg-[#E5E5E0]">
                    <div style={{ width: '38%' }} className="bg-[#0B3B59]" title="C# & HLSL 38%" />
                    <div style={{ width: '28%' }} className="bg-[#502274]" title="Dart & Flutter 28%" />
                    <div style={{ width: '18%' }} className="bg-[#254F1A]" title="Python & AI 18%" />
                    <div style={{ width: '16%' }} className="bg-[#D2E823]" title="TypeScript & React 16%" />
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-4 text-[12px] font-bold text-[#1E2330]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#0B3B59]" /> C# / HLSL (38%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#502274]" /> Dart / Flutter (28%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#254F1A]" /> Python / AI (18%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#D2E823]" /> TypeScript (16%)
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Link to GitHub Profile */}
              <div className="mt-8">
                <a
                  href="https://github.com/MiniowaPM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 items-center rounded-full bg-[#254F1A] px-7 font-sans text-[14.5px] font-bold text-[#D2E823] shadow-md transition-transform hover:scale-105"
                >
                  @MiniowaPM on GitHub ↗
                </a>
              </div>
            </div>

            {/* Right Side (5 Cols): Balanced Deck with Team Shuffle & Key Milestones */}
            <div className="flex flex-col gap-6 lg:col-span-5">
              {/* Card 1: Team Photo Shuffle Deck */}
              <div className="overflow-hidden rounded-[36px] bg-[#FFFFFF] p-4 shadow-md">
                <div
                  onClick={handleNextTeamPhoto}
                  onMouseEnter={() => setIsTeamHovered(true)}
                  onMouseLeave={() => setIsTeamHovered(false)}
                  title={locale === 'en' ? 'Click to shuffle team photo (Autoplay active)' : 'Kliknij, aby wyłonić kolejne zdjęcie zespołu (Autoodtwarzanie aktywne)'}
                  className="relative aspect-[4/3.1] w-full cursor-pointer overflow-hidden rounded-[26px] bg-[#1E2330] select-none"
                >
                  <AnimatePresence mode="popLayout">
                    <motion.img
                      key={teamPhotoIdx}
                      src={currentTeamPhoto.src}
                      alt={currentTeamPhoto.caption[locale]}
                      initial={{ scale: 0.93, y: 14, opacity: 0.8 }}
                      animate={{ scale: 1, y: 0, opacity: 1 }}
                      exit={{ x: -160, y: 30, rotate: -12, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
                      className="h-full w-full object-cover select-none"
                    />
                  </AnimatePresence>

                  {/* Shuffle Badge with Progress Line */}
                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-1 rounded-2xl bg-black/70 px-3 py-1.5 font-sans text-[11px] font-bold text-white shadow-md backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <span className={`${isTeamHovered ? 'text-amber-400' : 'text-[#D2E823]'}`}>
                        {isTeamHovered ? <PauseIcon className="h-3 w-3" /> : <RotateIcon className="h-3 w-3" />}
                      </span>
                      <span>
                        {isTeamHovered
                          ? locale === 'en' ? 'Paused' : 'Wstrzymano'
                          : locale === 'en' ? 'Autoplay' : 'Autoodtwarzanie'}
                      </span>
                    </div>
                    <div className="h-0.5 w-full overflow-hidden rounded-full bg-white/20">
                      <div
                        className="h-full bg-[#D2E823] transition-all duration-75 ease-linear"
                        style={{ width: `${isTeamHovered ? 100 : teamProgress}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="p-4">
                  <span className="font-sans text-[14.5px] font-bold text-[#1E2330]">
                    {currentTeamPhoto.caption[locale]}
                  </span>
                  <Link
                    to="/about"
                    className="mt-2 block font-sans text-[13px] font-black text-[#254F1A] hover:underline"
                  >
                    {locale === 'en' ? 'More team photos & story →' : 'Więcej zdjęć i historia zespołu →'}
                  </Link>
                </div>
              </div>

              {/* Card 2: Key Milestones & Recognition Card (Balances column height perfectly) */}
              <div className="rounded-[36px] bg-[#FFFFFF] p-6 shadow-md">
                <span className="font-sans text-[12.5px] font-black uppercase tracking-wider text-[#254F1A]">
                  {locale === 'en' ? 'Key Milestones & Leadership' : 'Osiągnięcia i Działalność'}
                </span>

                <div className="mt-4 space-y-3.5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#D2E823] text-[#254F1A]">
                      <TrophyIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-sans text-[14px] font-bold text-[#1E2330]">
                        {locale === 'en' ? '1st Place Hackathon Winner' : '1. Miejsce w Hackathonie'}
                      </h4>
                      <p className="font-sans text-[12.5px] text-[#71717A]">
                        {locale === 'en' ? 'Project ŁatwaUstawa (Open Gov APIs & Local LLMs)' : 'Projekt ŁatwaUstawa (API Sejmowe & LLM)'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E9C0E9] text-[#502274]">
                      <RocketIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-sans text-[14px] font-bold text-[#1E2330]">
                        {locale === 'en' ? 'KNI Science Club Lead' : 'Lider w Kole Naukowym KNI'}
                      </h4>
                      <p className="font-sans text-[12.5px] text-[#71717A]">
                        {locale === 'en' ? 'Architecture & Team Lead on PlanPM & NavigatorPM' : 'Architektura i koordynacja PlanPM oraz NavigatorPM'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#B8E8FC] text-[#0B3B59]">
                      <GlobeIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-sans text-[14px] font-bold text-[#1E2330]">
                        {locale === 'en' ? 'GlobalLogic IoT & AI Internship' : 'Staż IoT / Edge AI w GlobalLogic'}
                      </h4>
                      <p className="font-sans text-[12.5px] text-[#71717A]">
                        {locale === 'en' ? 'Autonomous Drone Fleet & 3D Hardware Engineering' : 'Platforma World of Drones i projektowanie obudów 3D'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F3F3F1] text-[#254F1A]">
                      <VolleyballIcon className="h-4 w-4" />
                    </span>
                    <div>
                      <h4 className="font-sans text-[14px] font-bold text-[#1E2330]">
                        {locale === 'en' ? 'AZS Academic Volleyball Semifinalist' : 'Półfinalista AMP w Siatkówce'}
                      </h4>
                      <p className="font-sans text-[12.5px] text-[#71717A]">
                        {locale === 'en' ? 'Maritime University Volleyball Representative' : 'Reprezentant Politechniki Morskiej w Szczecinie'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
