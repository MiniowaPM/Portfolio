// src/components/slides/ProjectSlide.tsx
import { forwardRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FEATURED_PROJECTS, GRID_PROJECTS } from '../../../data/projectData';
import { ProjectCard } from './ProjectCard';

export const ProjectSlide = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="slide-panel pointer-events-auto absolute top-0 left-[200vw] flex h-auto min-h-screen w-screen flex-col items-start px-8 pt-32 pb-32 md:pr-[45vw] md:pl-20"
    >
      {/* Przypięty nagłówek */}
      <div className="sticky top-24 z-10 w-full max-w-3xl pb-6">
        <h2 className="text-base-content text-5xl font-bold">Projects Archive</h2>
        <p className="text-base-content/80 mt-2 text-lg">
          A complete showcase of my commercial work, thesis projects, and personal experiments.
        </p>
      </div>

      <div className="mt-8 flex w-full max-w-3xl flex-col gap-10">
        {/* Kalendarz GitHuba */}
        <div className="bg-base-200/60 border-base-content/10 flex w-full flex-col rounded-3xl border p-6 backdrop-blur-sm md:p-8">
          <h3 className="text-base-content mb-6 text-xl font-bold">GitHub Contributions</h3>
          <div className="w-full scrollbar-none overflow-x-auto [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <GitHubCalendar
              username="MiniowaPM"
              colorScheme="dark"
              blockSize={12}
              blockMargin={4}
              fontSize={14}
              theme={{
                dark: ['#1f1d1a', '#5e4210', '#936214', '#cc8a16', '#ffb420'],
                light: ['#292521', '#63471e', '#9e7323', '#d19d28', '#ffbe2b'],
              }}
            />
          </div>
        </div>

        {/* --- Główne projekty --- */}
        {FEATURED_PROJECTS.map((proj, idx) => (
          <ProjectCard key={`feat-${idx}`} variant="featured" {...proj} />
        ))}

        {/* --- Pozostałe projekty (Grid) --- */}
        <div className="mt-8">
          <h3 className="text-base-content mb-6 text-3xl font-bold">Other Work & Experiments</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {GRID_PROJECTS.map((proj, idx) => (
              <ProjectCard key={`grid-${idx}`} variant="grid" {...proj} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

ProjectSlide.displayName = 'ProjectSlide';
