export interface IslandData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  technologies: string[];
  link: string;
  position: [number, number, number];
  triggerDistance: number;
}

export const ISLANDS: IslandData[] = [
  {
    id: 'about',
    title: '🏝️ Island: About Me',
    subtitle: 'Creative Frontend & WebGL Developer',
    description:
      'Passionate about bridging the gap between high-performance 3D graphics and clean, reactive web interfaces. Specialized in Three.js, React Three Fiber, and custom GLSL shaders.',
    details: [
      '⚡ 4+ years of experience building immersive web experiences',
      '🌊 Expert in procedural generation and fluid simulations',
      '🎯 Focused on performance optimization and 60 FPS rendering',
    ],
    technologies: ['React', 'Three.js', 'TypeScript', 'TailwindCSS', 'GLSL'],
    link: '#about',
    position: [0, 0, -150],
    triggerDistance: 60,
  },
  {
    id: 'projects',
    title: '⚡ Archipelago: Projects',
    subtitle: 'Featured Works & Experiments',
    description:
      'A collection of production-ready applications, interactive data visualizations, and experimental WebGL environments.',
    details: [
      '🚀 Real-time ocean simulator with FFT water waves and weather transitions',
      '🎨 Custom particle rain systems and dynamic lighting setups',
      '📱 Fully responsive UI powered by modern Tailwind v4 & DaisyUI',
    ],
    technologies: ['React Three Fiber', 'Vite', 'DaisyUI', 'GLSL Shaders', 'Web Audio API'],
    link: '#projects',
    position: [150, 0, 100],
    triggerDistance: 60,
  },
  {
    id: 'contact',
    title: '⚓ Port: Contact & Connect',
    subtitle: 'Let’s Build Something Amazing Together',
    description:
      'Open for freelance opportunities, creative development contracts, or technical consultations in WebGL and React ecosystems.',
    details: [
      '📫 Email: contact@portfolio.dev',
      '💼 Available for select remote projects',
      '🌐 Active on GitHub, LinkedIn, and X',
    ],
    technologies: ['GitHub', 'LinkedIn', 'Discord', 'Email'],
    link: '#contact',
    position: [-140, 0, 120],
    triggerDistance: 60,
  },
];
