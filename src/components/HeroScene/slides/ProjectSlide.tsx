import { motion, type Variants } from 'framer-motion'; // DODANY IMPORT
import { forwardRef } from 'react';
import { GitHubCalendar } from 'react-github-calendar';
import { FEATURED_PROJECTS, GRID_PROJECTS } from '../../../data/projectData';
import { ProjectCard } from './ProjectCard';

const headerVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
      delay: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
      delay: 0.2,
    },
  },
};

const ProjectSlide = forwardRef<HTMLElement>((_, ref) => {
  return (
    <section
      ref={ref}
      className="slide-panel pointer-events-auto absolute top-0 left-[200vw] flex h-auto min-h-screen w-screen flex-col items-start px-8 pt-32 pb-32 md:pr-[45vw] md:pl-20"
    >
      {/* Section Header */}
      <motion.div
        className="sticky top-24 z-10 w-full max-w-3xl pb-6"
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <h2 className="text-base-content text-5xl font-bold">Projects Archive</h2>
        <p className="text-base-content/80 mt-2 text-lg">
          A complete showcase of my commercial work, thesis projects, and personal experiments.
        </p>
      </motion.div>

      <div className="mt-8 flex w-full max-w-3xl flex-col gap-10">
        {/* GitHub Calendar */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="bg-base-200/60 border-base-content/10 flex w-full flex-col rounded-3xl border p-6 backdrop-blur-sm md:p-8"
        >
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
        </motion.div>

        {/* Main Projects */}
        {FEATURED_PROJECTS.map((proj, idx) => (
          <motion.div
            key={`feat-${idx}`}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <ProjectCard variant="featured" {...proj} />
          </motion.div>
        ))}

        {/* Grid Projects */}
        <div className="mt-8">
          <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            <h3 className="text-base-content mb-6 text-3xl font-bold">Other Work & Experiments</h3>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {GRID_PROJECTS.map((proj, idx) => (
              <motion.div
                key={`grid-${idx}`}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
              >
                <ProjectCard variant="grid" {...proj} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default ProjectSlide;
