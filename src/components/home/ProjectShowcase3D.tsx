import React, { useCallback, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useAnimation,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import {
  SiFlutter,
  SiDart,
  SiSupabase,
  SiFastapi,
  SiGithubactions,
  SiCplusplus,
  SiOpengl,
  SiWebgl,
  SiQt,
  SiThreedotjs,
  SiTypescript,
  SiBlender,
  SiPython,
  SiPytorch,
  SiRaspberrypi,
  SiLinux,
  SiReact,
  SiNodedotjs,
} from 'react-icons/si';
import {
  HiCalendarDays,
  HiSparkles,
  HiPaintBrush,
  HiBars3BottomLeft,
  HiUsers,
  HiAdjustmentsHorizontal,
  HiAcademicCap,
  HiCalendar,
  HiMapPin,
  HiBell,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import type { FeaturedProject } from '../../data/projectData';

const TECH_ICON_MAP: Record<string, IconType> = {
  Flutter: SiFlutter,
  Dart: SiDart,
  Supabase: SiSupabase,
  'REST API': SiFastapi,
  'CI/CD': SiGithubactions,
  'C++': SiCplusplus,
  OpenGL: SiOpengl,
  GLSL: SiWebgl,
  Qt: SiQt,
  'Three.js': SiThreedotjs,
  TypeScript: SiTypescript,
  WebGL: SiWebgl,
  Blender: SiBlender,
  Python: SiPython,
  'OpenAI API': SiPytorch,
  'Edge AI': SiRaspberrypi,
  'Embedded Linux': SiLinux,
  React: SiReact,
  'Node.js': SiNodedotjs,
};

interface ScreenMetadata {
  tag: { en: string; pl: string };
  title: { en: string; pl: string };
  Icon: React.ComponentType<{ className?: string }>;
}

// Exact curated UI metadata matching real PlanPM screenshots
const PLAN_PM_SCREENS: Record<string, ScreenMetadata> = {
  '8.jpg': {
    tag: { en: 'Timetable', pl: 'Zajęcia' },
    title: { en: 'Course & Room Details', pl: 'Szczegóły przedmiotu i sali' },
    Icon: HiCalendarDays,
  },
  '7.jpg': {
    tag: { en: 'Home Feed', pl: 'Strona główna' },
    title: { en: 'Campus News & Widgets', pl: 'Aktualności i widżety planu' },
    Icon: HiSparkles,
  },
  '9.jpg': {
    tag: { en: 'Appearance', pl: 'Personalizacja' },
    title: { en: 'Dark Theme & Color Palette', pl: 'Motyw ciemny i kolory zajęć' },
    Icon: HiPaintBrush,
  },
  '10.jpg': {
    tag: { en: 'Navigation', pl: 'Nawigacja' },
    title: { en: 'Student ID & University Portal', pl: 'Legitymacja i Wirtualna Uczelnia' },
    Icon: HiBars3BottomLeft,
  },
  '11.jpg': {
    tag: { en: 'Profile & Groups', pl: 'Ustawienia' },
    title: { en: 'Study Program & Dean Groups', pl: 'Kierunek i grupy dziekańskie' },
    Icon: HiUsers,
  },
  '6.jpg': {
    tag: { en: 'Setup', pl: 'Konfiguracja' },
    title: { en: 'Faculty & Academic Year', pl: 'Wybór wydziału i rocznika' },
    Icon: HiAdjustmentsHorizontal,
  },
  '5.jpg': {
    tag: { en: 'Role Mode', pl: 'Tryb pracy' },
    title: { en: 'Student & Lecturer Views', pl: 'Widok studenta i wykładowcy' },
    Icon: HiAcademicCap,
  },
  '1.jpg': {
    tag: { en: 'Welcome', pl: 'Plan PM' },
    title: { en: 'Maritime University Timetable', pl: 'Mobilny harmonogram Politechniki' },
    Icon: HiCalendar,
  },
  '2.jpg': {
    tag: { en: 'Overview', pl: 'Harmonogram' },
    title: { en: 'Clear Weekly Timetable', pl: 'Przejrzysty plan tygodniowy' },
    Icon: HiCalendarDays,
  },
  '3.jpg': {
    tag: { en: 'Campus Map', pl: 'Lokalizacja' },
    title: { en: 'Room & Building Finder', pl: 'Wyszukiwarka sal i budynków' },
    Icon: HiMapPin,
  },
  '4.jpg': {
    tag: { en: 'Notifications', pl: 'Powiadomienia' },
    title: { en: 'Smart Class Reminders', pl: 'Przypomnienia przed zajęciami' },
    Icon: HiBell,
  },
};

export interface ProjectShowcase3DProps {
  project: FeaturedProject;
  activeIdx: number;
  onOpenLightbox?: () => void;
  locale: 'en' | 'pl';
  accentColor?: string;
}

export const ProjectShowcase3D: React.FC<ProjectShowcase3DProps> = ({
  project,
  activeIdx,
  onOpenLightbox,
  locale,
  accentColor = '#8B5CF6',
}) => {
  const images = project.images;
  const total = images.length;
  const normalizedIdx = ((activeIdx % total) + total) % total;
  const mainImage = images[normalizedIdx];
  const topTechs = project.techStack.slice(0, 3);

  // Retrieve exact matching metadata for the screenshot
  const filename = mainImage.split('/').pop() || '';
  const currentMeta = PLAN_PM_SCREENS[filename] || {
    tag: { en: 'Feature', pl: 'Funkcja' },
    title: { en: `Screen ${normalizedIdx + 1}`, pl: `Ekran ${normalizedIdx + 1}` },
    Icon: HiSparkles,
  };
  const MetaIcon = currentMeta.Icon;

  // Preload next screenshot into decoded browser cache so crossfades never stutter
  useEffect(() => {
    if (total <= 1) return;
    const nextImg = new Image();
    nextImg.src = images[(normalizedIdx + 1) % total];
  }, [normalizedIdx, images, total]);

  // Imperative animation controls so the 3D rig NEVER unmounts on activeIdx change
  const sceneControls = useAnimation();
  const badgeControls = useAnimation();
  const pillControls = useAnimation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Smooth 3D Y-axis swing of the entire unified scene (Phone + Badge + Tech Pills)
    void sceneControls.start({
      rotateY: [-10, -24, -10],
      scale: [1, 0.968, 1],
      z: [0, -16, 0],
      transition: {
        duration: 0.78,
        times: [0, 0.36, 1],
        ease: [0.22, 1, 0.36, 1],
      },
    });

    // Secondary spring inertia on the front floating badge
    void badgeControls.start({
      z: [55, 70, 55],
      y: [0, 3, 0],
      scale: [1, 1.03, 1],
      transition: {
        duration: 0.68,
        times: [0, 0.42, 1],
        delay: 0.05,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    // Staggered micro-wave on the 3 side tech pills
    void pillControls.start((i: number) => ({
      z: [40, 54, 40],
      scale: [1, 1.14, 1],
      transition: {
        duration: 0.52,
        times: [0, 0.45, 1],
        delay: 0.05 + i * 0.06,
        ease: 'easeOut',
      },
    }));
  }, [normalizedIdx, sceneControls, badgeControls, pillControls]);

  // 120 FPS GPU-accelerated cursor tilt (0 React re-renders)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 140, damping: 22 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const tiltY = useTransform(smoothMouseX, [-0.5, 0.5], [-8, 8]);
  const tiltX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  // Glare shifts smoothly without ever crossing beyond the oversized overlay
  const glareShiftX = useTransform(smoothMouseX, [-0.5, 0.5], ['-28%', '28%']);
  // Reactive specular highlight sweeping along the physical side rail
  const railGlareY = useTransform(smoothMouseY, [-0.5, 0.5], ['-35%', '35%']);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX.set(x);
      mouseY.set(y);
    },
    [mouseX, mouseY]
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <div
      className="relative flex h-[580px] w-full max-w-[540px] items-center justify-center select-none"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1200px' }}
    >
      {/* =====================================================================
          CONTINUOUS IDLE FLOATING WRAPPER ("Oddychanie" w nieważkości)
      ===================================================================== */}
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotateZ: [-0.5, 0.5, -0.5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className="relative flex items-center justify-center"
      >
        {/* =====================================================================
            CONTACT GROUND SHADOW (Warstwa cienia podłogowego pod telefonem)
        ===================================================================== */}
        <motion.div
          animate={{
            scale: [0.92, 1.08, 0.92],
            opacity: [0.28, 0.48, 0.28],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -bottom-10 h-8 w-[230px] rounded-[100%] bg-black/45 blur-xl"
        />

        {/* =====================================================================
            INTERACTIVE CURSOR TILT RIG
        ===================================================================== */}
        <motion.div
          style={{
            rotateX: tiltX,
            rotateY: tiltY,
            transformStyle: 'preserve-3d',
          }}
          className="relative cursor-pointer"
          onClick={onOpenLightbox}
          title={
            locale === 'en'
              ? 'Click to enlarge full screenshot'
              : 'Kliknij, aby powiększyć zrzut ekranu'
          }
        >
          {/* =================================================================
              UNIFIED 3D SCENE RIG (Phone z:0 + Badge z:55 + Tech Pills z:40 + Back Widget z:-45)
              All parallel planes rotate together without clipping.
          ================================================================= */}
          <motion.div
            initial={{ rotateY: -10, scale: 1, z: 0 }}
            animate={sceneControls}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative"
          >
            {/* ===============================================================
                LAYER 1: MAIN 3D PHONE CHASSIS (With Physical Extruded Rail)
                Features:
                - 8-slice Z-extrusion from 0px to -14px for seamless curved corners
                - Hardware Power & Volume buttons on the visible right rail
                - Real parallax drop shadow plane at translateZ(-20px)
                - Front Bezel at translateZ(0px) & OLED screen at translateZ(1px)
            =============================================================== */}
            <div
              style={{
                transformStyle: 'preserve-3d',
              }}
              className="relative w-[245px] sm:w-[260px]"
            >
              {/* Layer 1A: 3D Parallax Drop Shadow Plane behind the phone */}
              <div
                style={{
                  transform: 'translateZ(-20px)',
                  boxShadow: `0 32px 70px rgba(0, 0, 0, 0.8), 0 16px 40px ${accentColor}40`,
                }}
                className="pointer-events-none absolute inset-0 rounded-[34px]"
              />

              {/* Layer 1B: Back Chassis Plate */}
              <div
                style={{ transform: 'translateZ(-15px)' }}
                className="pointer-events-none absolute inset-0 rounded-[34px] bg-[#101218] ring-1 ring-white/10"
              />

              {/* Layer 1C: Extruded Metallic Slices (0px to -14px) creating seamless 3D thickness */}
              {[-2, -4, -6, -8, -10, -12, -14].map((zDepth) => {
                const isMidRail = zDepth === -6 || zDepth === -8;
                return (
                  <div
                    key={`chassis-slice-${zDepth}`}
                    style={{ transform: `translateZ(${zDepth}px)` }}
                    className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[34px] ${
                      isMidRail
                        ? 'bg-gradient-to-r from-[#1B1D27] via-[#2B2F3D] to-[#363B4C] ring-1 ring-white/15'
                        : 'bg-[#14161F] ring-1 ring-white/10'
                    }`}
                  >
                    {isMidRail && (
                      <motion.div
                        style={{ y: railGlareY }}
                        className="absolute -inset-y-[40%] right-0 w-[10px] bg-gradient-to-b from-transparent via-white/40 to-transparent blur-[1px]"
                      />
                    )}
                  </div>
                );
              })}

              {/* Layer 1D: Physical Side Hardware Buttons on the visible right rail */}
              <div
                style={{
                  transform: 'translateZ(-7px)',
                  transformStyle: 'preserve-3d',
                }}
                className="pointer-events-none absolute inset-0 z-10"
              >
                {/* Volume Up */}
                <div className="absolute -right-[2.5px] top-[106px] h-9 w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#4A4F63] via-[#6B728D] to-[#3D4152] ring-1 ring-white/20" />
                {/* Volume Down */}
                <div className="absolute -right-[2.5px] top-[150px] h-9 w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#4A4F63] via-[#6B728D] to-[#3D4152] ring-1 ring-white/20" />
                {/* Power Button */}
                <div className="absolute -right-[2.5px] top-[216px] h-12 w-[3px] rounded-r-[2px] bg-gradient-to-b from-[#50556B] via-[#787F9D] to-[#43485B] ring-1 ring-white/25" />
              </div>

              {/* Layer 1E: Front Titanium Bezel & Screen Face */}
              <div
                style={{ transform: 'translateZ(0px)' }}
                className="relative w-full rounded-[34px] bg-[#161822] p-2 ring-1 ring-white/25"
              >
                {/* Top Bezel Ear-Speaker Slit (Subtelna szczelina głośnika w ramce) */}
                <div className="pointer-events-none absolute top-1 left-1/2 -translate-x-1/2 h-[2.5px] w-12 rounded-full bg-white/15 border border-black/40 shadow-inner" />

                {/* Native 9:20 Aspect Screen Container with strict hardware clipping */}
                <div
                  style={{
                    transform: 'translateZ(1px)',
                    isolation: 'isolate',
                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                  }}
                  className="relative aspect-[9/20] w-full overflow-hidden rounded-[26px] bg-[#090A0F]"
                >
                  {/* Native mobile push transition synchronized with 3D Y-axis turn */}
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={mainImage}
                      src={mainImage}
                      alt={`${project.title} screen ${normalizedIdx + 1}`}
                      initial={{ opacity: 0, x: 26, scale: 1.02 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: -18, scale: 0.98 }}
                      transition={{ duration: 0.44, ease: [0.22, 1, 0.36, 1] }}
                      className="absolute inset-0 h-full w-full object-cover"
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Oversized Moving Glass Glare: -inset-x-[60%] prevents edges from ever entering the viewport */}
                  <motion.div
                    style={{
                      x: glareShiftX,
                      background:
                        'linear-gradient(118deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.02) 22%, rgba(255,255,255,0.16) 48%, rgba(255,255,255,0.24) 50%, rgba(255,255,255,0.16) 52%, rgba(255,255,255,0.02) 78%, rgba(255,255,255,0) 100%)',
                    }}
                    className="pointer-events-none absolute -inset-x-[60%] -inset-y-[20%] z-10"
                  />

                  {/* Subtle inner glass edge ring */}
                  <div className="pointer-events-none absolute inset-0 z-20 rounded-[26px] ring-1 ring-inset ring-white/15" />
                </div>
              </div>
            </div>

            {/* ===============================================================
                LAYER 2: AUTHENTIC PlanPM UI WIDGET (z: 55px)
                Styled after PlanPM's Flutter Dark Theme cards:
                - Slate-dark #181922 chassis with purple ambient glow
                - Violet accent icon circle (#8B5CF6 / #C49BFF)
                - Accurate category tag & screen title
                - Autoplay 4.2s time-progress indicator line
            =============================================================== */}
            <motion.div
              initial={{ z: 55, y: 0, scale: 1 }}
              animate={badgeControls}
              style={{
                boxShadow: `0 22px 45px -8px rgba(0, 0, 0, 0.75), 0 0 0 1px ${accentColor}38`,
              }}
              className="pointer-events-none absolute -bottom-5 -left-6 z-30 flex w-[235px] items-center gap-2.5 overflow-hidden rounded-[20px] border border-white/12 bg-[#181922] p-2.5 sm:-left-9 sm:w-[255px]"
            >
              {/* Feature Icon Container in PlanPM Lavender Violet */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#8B5CF6]/35 bg-[#8B5CF6]/20 text-[#C49BFF] shadow-[0_0_16px_rgba(139,92,246,0.22)]"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`icon-${normalizedIdx}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex items-center justify-center"
                  >
                    <MetaIcon className="h-5 w-5" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Title & Category Description */}
              <div className="relative flex min-w-0 flex-1 flex-col overflow-hidden pr-1 pb-1">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`desc-${normalizedIdx}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: 'easeOut' }}
                    className="flex flex-col truncate"
                  >
                    <span className="font-sans text-[10px] font-bold uppercase tracking-wider text-[#A78BFA]">
                      {currentMeta.tag[locale]}
                    </span>
                    <span className="truncate font-sans text-[12.5px] font-semibold text-white/95">
                      {currentMeta.title[locale]}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Autoplay Time-Progress Indicator (Cienka linia postępu cyklu 4.2s) */}
              <motion.div
                key={`progress-bar-${normalizedIdx}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 4.2, ease: 'linear' }}
                style={{ originX: 0 }}
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#A855F7] to-[#C49BFF]"
              />
            </motion.div>

            {/* ===============================================================
                LAYER 3: SIDE FLOATING TECH PILLS (z: 40px)
                Interactive floating pills with Flutter, Dart & Supabase
            =============================================================== */}
            <div
              style={{
                transform: 'translateY(-50%)',
                transformStyle: 'preserve-3d',
              }}
              className="absolute top-1/2 -right-5 z-30 flex flex-col gap-2.5 sm:-right-7"
            >
              {topTechs.map((tech, i) => {
                const IconComponent = TECH_ICON_MAP[tech] || SiFlutter;
                return (
                  <motion.div
                    key={tech}
                    custom={i}
                    initial={{ z: 40, scale: 1 }}
                    animate={pillControls}
                    whileHover={{
                      scale: 1.18,
                      z: 60,
                      transition: { duration: 0.2 },
                    }}
                    title={tech}
                    style={{
                      boxShadow: `0 14px 28px rgba(0, 0, 0, 0.55), 0 0 0 1px ${accentColor}35`,
                    }}
                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-[#181922] text-[#C49BFF] shadow-xl transition-colors hover:border-[#8B5CF6]/70 hover:text-white"
                  >
                    <IconComponent className="h-4.5 w-4.5" />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};


