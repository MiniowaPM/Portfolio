// src/components/slides/ProjectData.ts

export type TechColor = 'blue' | 'emerald' | 'violet';
export type ProjectStatus = 'Live' | 'Completed' | 'In Progress';
export type ProjectTeam = 'Team' | 'Solo';

export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface ProjectItem {
  title: string;
  description: string;
  techStack: string[];
  techColor: TechColor;
  status?: ProjectStatus;
  team?: ProjectTeam;
  links?: ProjectLink[];
  imagePlaceholder?: string;
  images?: string[];
  deviceType?: 'mobile' | 'desktop' | 'none';
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    title: 'PlanPM - Mobile Application',
    description:
      'A comprehensive mobile application serving a live user base of students and faculty. Managed the full SDLC, implemented robust error handling for 99%+ uptime, and configured CI/CD pipelines with Supabase backend integration.',
    techStack: ['Flutter', 'Dart', 'Supabase', 'Scraping', 'CI/CD'],
    techColor: 'emerald',
    status: 'Live',
    team: 'Team',
    imagePlaceholder: 'PlanPM App',
    images: [
      '/images/PlanPM/8.jpg',
      '/images/PlanPM/9.jpg',
      '/images/PlanPM/10.jpg',
      '/images/PlanPM/11.jpg',
      '/images/PlanPM/1.jpg',
      '/images/PlanPM/2.jpg',
      '/images/PlanPM/3.jpg',
      '/images/PlanPM/4.jpg',
      '/images/PlanPM/5.jpg',
      '/images/PlanPM/6.jpg',
      '/images/PlanPM/7.jpg',
    ],
    deviceType: 'mobile',
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.piotrwittig.plan_pm&hl=pl',
        primary: true,
      },
      { label: 'App Store', url: 'https://apps.apple.com/pl/app/plan-pm/id6759010559' },
      { label: 'GitHub', url: 'https://github.com/KNI-PM-Szczecin/plan_pm' },
    ],
  },
  {
    title: 'NavigatorPM - Campus Wayfinding System',
    description:
      'An indoor navigation platform designed to streamline traversing university campuses, functioning as a transit app for complex building layouts. The system features a robust algorithmic routing engine for calculating optimal paths between classrooms, coupled with a comprehensive admin dashboard that allows dynamic map creation, node editing, and layout management without requiring code changes.',
    techStack: ['React', 'TypeScript', 'Graph Algorithms', 'Node.js', 'RCP'],
    techColor: 'emerald',
    status: 'In Progress',
    team: 'Team',
    imagePlaceholder: 'NavigatorPM App',
    images: ['/images/NavigatorPM/1.png', '/images/NavigatorPM/2.png'],
    deviceType: 'desktop',
    links: [
      { label: 'GitHub', url: 'https://github.com/KNI-PM-Szczecin/NavigatorPM', primary: true },
    ],
  },
  {
    title: 'World of Drones - GlobalLogic Internship',
    description:
      'An end-to-end IoT system built during the GlobalLogic summer internship, focused on autonomous drone operations and real-time computer vision. I developed a Nano-architecture AI model for detecting cars and license plates from the air, integrated it with a React frontend and FastAPI backend. Additionally, I handled the hardware layer by designing 3D-printable enclosures for Edge AI devices (Raspberry Pi, STM32) and solving complex connectivity issues. Delivered in a strict Agile/Scrum environment with full CI/CD pipelines.',
    techStack: [
      'React',
      'FastAPI',
      'Computer Vision / AI',
      'IoT (Raspberry Pi)',
      'Autodesk Fusion',
      'Jenkins / CI-CD',
    ],
    techColor: 'emerald',
    status: 'Completed',
    team: 'Team',
    imagePlaceholder: 'World of Drones App',
    images: ['/images/WorldOfDrones/2.jpg', '/images/WorldOfDrones/3.jpg'],

    deviceType: 'none',
    links: [
      {
        label: 'Global Logic Site',
        url: 'https://www.globallogic.com/pl/about/events/iot-project-based-learning-world-of-drones/',
        primary: true,
      },
    ],
  },
  {
    title: 'ALEKSY - Edge Voice Assistant',
    description:
      'A privacy-first, fully offline Polish voice assistant running on an NVIDIA Jetson Xavier NX. Architected the entire pipeline—from wake-word detection to Whisper STT and local LLM inference (Bielik 7B)—processing entirely on-device without cloud APIs.',
    techStack: ['Python', 'LLMs', 'Whisper', 'Edge AI', 'Linux'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Team',
    imagePlaceholder: 'ALEKSY Hardware / Demo Image',
    images: ['/images/ALEKSY/1.webp', '/images/ALEKSY/2.webp', '/images/ALEKSY/3.webp'],
    deviceType: 'none',
    links: [
      { label: 'Watch Demo', url: 'https://www.youtube.com/shorts/V51wDqSVl7A', primary: true },
      { label: 'GitHub', url: 'https://github.com/MiniowaPM/voice-assistant' },
    ],
  },
  {
    title: 'Real-Time Ocean Simulation',
    description:
      'Engineering thesis project focusing on high-fidelity maritime simulation. Engineered dynamic ocean surface generation, real-time physics (Gerstner waves), and advanced HLSL shaders for realistic water rendering in Unity.',
    techStack: ['Unity', 'C#', 'HLSL', 'Physics'],
    techColor: 'blue',
    status: 'In Progress',
    team: 'Solo',
    imagePlaceholder: 'Ocean Rendering Screenshot',
    deviceType: 'none',
    links: [
      {
        label: 'Source Code',
        url: 'https://github.com/MiniowaPM/SimulatingOceanWater',
        primary: true,
      },
    ],
  },
];

export const GRID_PROJECTS: ProjectItem[] = [
  {
    title: 'Maritime Autonomous Simulator',
    description:
      'Simulation system for testing autonomous navigation algorithms. Designed dynamic sea conditions and vessel hydrodynamic interaction for low-latency state feedback.',
    techStack: ['C#', 'Unity', 'HLSL'],
    techColor: 'blue',
    status: 'In Progress',
    team: 'Team',
    links: [
      { label: 'GitHub', url: 'https://github.com/JakubLopyta/ship-simulator', primary: true },
    ],
  },
  {
    title: 'ŁatwaUstawa (Hackathon)',
    description:
      'AI-powered mobile app automating the tracking of legal regulations. Integrated government REST APIs with LLMs to summarize complex legal jargon into actionable insights.',
    techStack: ['Python', 'LLMs', 'REST API'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Team',
    links: [{ label: 'GitHub', url: 'https://github.com/Schoji/LatwaUstawa', primary: true }],
  },
  {
    title: 'E.D.E.K. ChatBot',
    description:
      'A lightweight Question Answering chatbot powered by vector semantic search (Sentence Transformers) with a Flask backend and a pre-baked knowledge index.',
    techStack: ['Python', 'Flask', 'NLP', 'PHP'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
    links: [
      { label: 'GitHub', url: 'https://github.com/MiniowaPM/ChatBotMiniowaPM', primary: true },
    ],
  },
  {
    title: 'Reptilia (betterspotify)',
    description:
      'Cross-platform desktop application for purchasing and managing music albums. Features a responsive UI interacting with a high-performance backend.',
    techStack: ['Vue.js', 'Electron', 'FastAPI'],
    techColor: 'emerald',
    status: 'Completed',
    team: 'Team',
    links: [{ label: 'GitHub', url: 'https://github.com/MiniowaPM/Reptilia', primary: true }],
  },
  {
    title: 'YouTube-but-worst',
    description:
      'A full-stack video streaming platform clone exploring multimedia serving, data pagination, and enterprise-tier service layering. Created for educational purposes.',
    techStack: ['React', 'Java', 'Spring Boot'],
    techColor: 'emerald',
    status: 'In Progress',
    team: 'Solo',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/MiniowaPM-youtube-but-worse-frontend',
        primary: true,
      },
    ],
  },
  {
    title: 'CryptoApp',
    description:
      'A dedicated cryptography utility providing clean visualization and execution of encryption, decryption routines, and secure payload hashing.',
    techStack: ['Python', 'Cryptography'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
    links: [
      { label: 'GitHub', url: 'https://github.com/MiniowaPM/CryptoApp', primary: true },
      { label: 'Live Demo', url: 'https://cryptoapp-miniowa.streamlit.app/', primary: false },
    ],
  },
  {
    title: 'MatrixCalc',
    description:
      'Native desktop matrix calculator designed for rapid linear algebra computations, featuring high-performance memory management. Prototype for class projects and research in numerical methods.',
    techStack: ['C++', 'wxWidgets', 'Math'],
    techColor: 'blue',
    status: 'Completed',
    team: 'Solo',
    links: [{ label: 'GitHub', url: 'https://github.com/MiniowaPM/MatrixCalc', primary: true }],
  },
  {
    title: 'Ticket Procurement Bot',
    description:
      'Automated script designed to monitor event queues, scrape availability in real-time, and automate checkout workflows on ticketing platform eBilety.pl.',
    techStack: ['Python', 'Automation', 'Scraping'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
    links: [{ label: 'GitHub', url: 'https://github.com/MiniowaPM/TicketMaster', primary: true }],
  },
];
