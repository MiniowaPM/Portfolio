import { Sparkles } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import {
  Bloom,
  BrightnessContrast,
  EffectComposer,
  Noise,
  Vignette,
} from '@react-three/postprocessing';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, useState } from 'react';
import { useRouteTheme } from '../../hooks/useRouteTheme';
import { AvatarScene } from './Scene';
import AboutSlide from './slides/AboutSlide';
import { ContactSlide } from './slides/ContactSlide';
import { ProjectSlide } from './slides/ProjectSlide';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  useRouteTheme('retro', 'abyss');
  const mainRef = useRef<HTMLElement>(null!);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useRef<number>(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const [projectsScrollDist, setProjectsScrollDist] = useState(0);
  const [showDiscordToast, setShowDiscordToast] = useState(false);

  // Obserwator - gdy kalendarz się załaduje, aktualizuje wysokość
  useEffect(() => {
    if (!projectsRef.current) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const newDist = Math.max(0, entry.target.scrollHeight - window.innerHeight);

        setProjectsScrollDist((prev) => {
          if (Math.abs(prev - newDist) > 5) {
            return newDist;
          }
          return prev;
        });
      }
    });

    observer.observe(projectsRef.current);
    return () => observer.disconnect();
  }, []);

  // Lenis - Płynny scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  // Logika GSAP
  useEffect(() => {
    if (!containerRef.current || !trackRef.current) return;

    const W = window.innerWidth;
    const H = projectsScrollDist;

    const verticalRatio = H > 0 ? H / W : 1;
    const totalDuration = 3 + verticalRatio;

    const p1 = 1 / totalDuration;
    const p2 = 2 / totalDuration;
    const p3 = (2 + verticalRatio) / totalDuration;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          end: `+=${W * 3 + H}`,
          snap: {
            snapTo: (progress) => {
              if (progress > p2 + 0.01 && progress < p3 - 0.01) return progress;
              return gsap.utils.snap([0, p1, p2, p3, 1], progress);
            },
            duration: { min: 0.2, max: 0.6 },
            delay: 0.1,
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            const p = self.progress;
            let normalized: number;

            if (p <= p1) {
              normalized = (p / p1) * 0.25;
            } else if (p <= p2) {
              normalized = 0.25 + ((p - p1) / (p2 - p1)) * 0.25;
            } else if (p <= p3) {
              normalized = 0.5 + ((p - p2) / (p3 - p2)) * 0.25;
            } else {
              normalized = 0.75 + ((p - p3) / (1 - p3)) * 0.25;
            }

            scrollProgress.current = normalized;

            let currentSlide = 0;
            if (normalized < 0.125) currentSlide = 0;
            else if (normalized < 0.375) currentSlide = 1;
            else if (normalized < 0.875) currentSlide = 2;
            else currentSlide = 3;

            setActiveSlide((prev) => (prev !== currentSlide ? currentSlide : prev));
          },
        },
      });

      tl.to(trackRef.current, { x: -W, ease: 'none', duration: 1 });
      tl.to(trackRef.current, { x: -W * 2, ease: 'none', duration: 1 });
      tl.to(trackRef.current, { y: -H, ease: 'none', duration: verticalRatio });
      tl.to(trackRef.current, { x: -W * 3, ease: 'none', duration: 1 });

      stRef.current = tl.scrollTrigger || null;
    }, containerRef);

    return () => {
      ctx.revert();
      stRef.current = null;
    };
  }, [projectsScrollDist]);

  // Nawigacja z kropek
  const scrollToSlide = (index: number) => {
    const st = stRef.current;
    if (!st) return;

    const W = window.innerWidth;
    const H = projectsScrollDist;
    const verticalRatio = H > 0 ? H / W : 1;
    const totalDuration = 3 + verticalRatio;

    const p1 = 1 / totalDuration;
    const p2 = 2 / totalDuration;
    // const p3 = (2 + verticalRatio) / totalDuration; // End of vertical scroll section

    const progressMap = [0, p1, p2, 1];
    const progress = progressMap[index];

    const targetY = st.start + (st.end - st.start) * progress;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, { duration: 1.2 });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <main
      ref={mainRef}
      className="bg-base-100 text-base-content relative overflow-x-hidden transition-colors duration-300"
    >
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas eventSource={mainRef} camera={{ position: [0, 0, 5], fov: 45 }}>
          <directionalLight position={[2, 3, 4]} intensity={1.5} color="#fff0e0" />
          <ambientLight intensity={1.5} color="#ffd4b8" />
          <Sparkles
            count={400}
            scale={[60, 20, 10]}
            position={[22.5, 0, 0]}
            size={4}
            speed={0.6}
            opacity={0.3}
            color="#ffd4b8"
          />
          <AvatarScene scrollRef={scrollProgress} />
          <EffectComposer>
            <Bloom luminanceThreshold={1.2} mipmapBlur intensity={1.5} />
            <Vignette eskil={false} offset={0.1} darkness={0.9} />
            <Noise opacity={0.03} />
            <BrightnessContrast brightness={0.02} contrast={0.1} />
          </EffectComposer>
        </Canvas>
      </div>

      <div ref={containerRef} className="relative h-screen w-screen overflow-hidden">
        <div
          ref={trackRef}
          className="pointer-events-none absolute top-0 left-0 h-screen w-screen will-change-transform"
        >
          <section className="slide-panel absolute top-0 left-0 flex h-screen w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
            <h1 className="mb-4 text-6xl font-bold">Hi, I'm Mikołaj</h1>
            <span className="text-2md font-semibold">
              Software Engineer | Full Stack Developer | 3D Enthusiast
            </span>
          </section>

          <AboutSlide />
          <ProjectSlide ref={projectsRef} />
          <ContactSlide topOffset={projectsScrollDist} setToast={setShowDiscordToast} />
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-row gap-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 ease-out ${
              activeSlide === index
                ? 'bg-primary w-8 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]'
                : 'bg-base-content/30 hover:bg-base-content/60 w-3 hover:scale-110'
            } `}
          />
        ))}
      </div>

      <div
        className={`toast toast-bottom toast-end z-100 transition-opacity duration-300 ${showDiscordToast ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
      >
        <div className="alert alert-success alert-soft text-base-content shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Copied nick to clipboard!</span>
        </div>
      </div>
    </main>
  );
}

export default Hero;
