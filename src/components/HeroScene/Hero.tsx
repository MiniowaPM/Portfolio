import { Canvas } from '@react-three/fiber';
import Lenis from '@studio-freight/lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import React, { useEffect, useRef, useState } from 'react';
import { useRouteTheme } from '../../hooks/useRouteTheme';
import { AvatarScene } from './Scene';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  useRouteTheme('retro', 'abyss');
  const mainRef = useRef<HTMLElement>(null!);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrollProgress = useRef<number>(0);
  const [activeSlide, setActiveSlide] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const stRef = useRef<ScrollTrigger | null>(null);

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

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const panels = gsap.utils.toArray<HTMLElement>('.slide-panel');
    const totalPanels = panels.length;

    const ctx = gsap.context(() => {
      const tween = gsap.to(panels, {
        xPercent: -100 * (totalPanels - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (totalPanels - 1),
            duration: { min: 0.2, max: 0.6 },
            delay: 0.02,
            ease: 'power2.inOut',
          },
          end: () =>
            `+=${containerRef.current?.offsetWidth ? containerRef.current.offsetWidth * (totalPanels - 1) : 0}`,
          onUpdate: (self: ScrollTrigger) => {
            scrollProgress.current = self.progress;
            const currentSlide = Math.round(self.progress * (totalPanels - 1));
            setActiveSlide((prev) => (prev !== currentSlide ? currentSlide : prev));
          },
        },
      });
      stRef.current = tween.scrollTrigger || null;
    }, containerRef);

    return () => ctx.revert();
    stRef.current = null;
  }, []);

  const scrollToSlide = (index: number) => {
    const st = stRef.current;

    if (!st) return;

    const panels = gsap.utils.toArray<HTMLElement>('.slide-panel');
    const totalPanels = panels.length;
    const progress = index / (totalPanels - 1);

    const targetY = st.start + (st.end - st.start) * progress;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetY, {
        duration: 1.2,
      });
    } else {
      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }
  };

  return (
    <main
      ref={mainRef}
      className="bg-base-100 text-base-content relative overflow-x-hidden transition-colors duration-300"
    >
      {/* Canvas 3D */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <Canvas eventSource={mainRef} camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 5, 5]} intensity={1.5} />
          <AvatarScene scrollRef={scrollProgress} />
        </Canvas>
      </div>

      {/* Kontener horyzontalny */}
      <div ref={containerRef} className="h-screen w-screen overflow-hidden">
        <div ref={trackRef} className="flex h-full w-[400vw] will-change-transform">
          <section className="slide-panel flex h-full w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
            {' '}
            <h1 className="mb-4 text-6xl font-bold">Cześć, jestem Twórcą</h1>
            <p className="max-w-md text-xl opacity-80">
              Poruszaj myszką, by awatar rozejrzał się po scenie. Zacznij scrollować.
            </p>
          </section>

          <section className="slide-panel flex h-full w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
            {' '}
            <h2 className="mb-4 text-5xl font-bold">O mnie</h2>
            <p className="max-w-md text-xl opacity-80">
              Tutaj awatar przesuwa się w prawo, ustępując miejsca treści slajdu.
            </p>
          </section>

          <section className="slide-panel flex h-full w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
            {' '}
            <h2 className="mb-4 text-5xl font-bold">Wybrane Projekty</h2>
            <p className="max-w-md text-xl opacity-80">
              Karty projektów i odnośnik do Twojego interaktywnego świata 3D.
            </p>
          </section>

          <section className="slide-panel flex h-full w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
            {' '}
            <h2 className="mb-4 text-5xl font-bold">Kontakt</h2>
            <p className="max-w-md text-xl opacity-80">
              Napisz do mnie lub sprawdź moje repozytoria.
            </p>
          </section>
        </div>
      </div>
      <div className="fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 flex-row gap-4">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            onClick={() => scrollToSlide(index)}
            aria-label={`Przejdź do slajdu ${index + 1}`}
            className={`h-3 rounded-full transition-all duration-300 ease-out ${
              activeSlide === index
                ? 'bg-primary w-8 shadow-[0_0_10px_rgba(var(--color-primary),0.5)]' // Aktywny: Dłuższa "pigułka" w poziomie
                : 'bg-base-content/30 hover:bg-base-content/60 w-3 hover:scale-110' // Nieaktywny: Kółko
            } `}
          />
        ))}
      </div>
    </main>
  );
};

export default Hero;
