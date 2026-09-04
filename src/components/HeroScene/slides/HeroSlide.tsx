import { motion, type Variants } from 'framer-motion';

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: (customDelay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
      delay: customDelay,
    },
  }),
};

function HeroSlide() {
  return (
    <section className="slide-panel absolute top-0 left-0 flex h-screen w-screen flex-col justify-center px-8 md:pr-[40vw] md:pl-20">
      <motion.h1
        className="mb-4 text-6xl font-bold"
        custom={0.4}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        Hi, I'm Mikołaj
      </motion.h1>

      <motion.span
        className="text-2md text-base-content/80 font-semibold"
        custom={0.6}
        variants={heroVariants}
        initial="hidden"
        animate="visible"
      >
        Software Engineer | Full Stack Developer | 3D Enthusiast
      </motion.span>
    </section>
  );
}

export default HeroSlide;
