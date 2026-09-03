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
}

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    title: 'ALEKSY – Edge Voice Assistant',
    description:
      'A privacy-first, fully offline Polish voice assistant running on an NVIDIA Jetson Xavier NX. Architected the entire pipeline—from wake-word detection to Whisper STT and local LLM inference (Bielik 7B)—processing entirely on-device without cloud APIs.',
    techStack: ['Python', 'LLMs', 'Whisper', 'Edge AI', 'Linux'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
    imagePlaceholder: 'ALEKSY Hardware / Demo Image',
    links: [
      { label: 'Watch Demo', url: '#', primary: true },
      { label: 'GitHub', url: '#' },
    ],
  },
  {
    title: 'Real-Time Ocean Simulation',
    description:
      'Engineering thesis project focusing on high-fidelity maritime simulation. Engineered dynamic ocean surface generation, real-time physics (Gerstner waves), and advanced HLSL shaders for realistic water rendering in Unity.',
    techStack: ['Unity', 'C#', 'HLSL', 'Physics'],
    techColor: 'blue',
    status: 'Completed',
    team: 'Solo',
    imagePlaceholder: 'Ocean Rendering Screenshot',
    links: [{ label: 'Source Code', url: '#', primary: true }],
  },
  {
    title: 'PlanPM – Mobile Application',
    description:
      'A comprehensive mobile application serving a live user base of students and faculty. Managed the full SDLC, implemented robust error handling for 99%+ uptime, and configured CI/CD pipelines with Supabase backend integration.',
    techStack: ['Flutter', 'Dart', 'Supabase', 'CI/CD'],
    techColor: 'emerald',
    status: 'Live',
    team: 'Team',
    imagePlaceholder: 'PlanPM App Mockup',
    links: [
      { label: 'Google Play', url: '#', primary: true },
      { label: 'App Store', url: '#' },
    ],
  },
];

export const GRID_PROJECTS: ProjectItem[] = [
  {
    title: 'NavigatorPM',
    description:
      'A web application serving as an indoor navigation system for the university building (similar to "jakdojade"). Focused on complex routing algorithms and responsive UI.',
    techStack: ['React', 'Next.js', 'RCP'],
    techColor: 'emerald',
    status: 'In Progress',
    team: 'Team',
  },
  {
    title: 'Maritime Autonomous Simulator',
    description:
      'Simulation system for testing autonomous navigation algorithms. Designed dynamic sea conditions and vessel hydrodynamic interaction for low-latency state feedback.',
    techStack: ['C#', 'Unity', 'HLSL'],
    techColor: 'blue',
    status: 'Completed',
    team: 'Team',
  },
  {
    title: 'ŁatwaUstawa (Hackathon)',
    description:
      'AI-powered mobile app automating the tracking of legal regulations. Integrated government REST APIs with LLMs to summarize complex legal jargon into actionable insights.',
    techStack: ['Python', 'LLMs', 'REST API'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Team',
  },
  {
    title: 'E.D.E.K. ChatBot',
    description:
      'A lightweight Question Answering chatbot powered by vector semantic search (Sentence Transformers) with a Flask backend and a pre-baked knowledge index.',
    techStack: ['Python', 'Flask', 'NLP', 'PHP'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
  },
  {
    title: 'Reptilia (betterspotify)',
    description:
      'Cross-platform desktop application for purchasing and managing music albums. Features a responsive UI interacting with a high-performance backend.',
    techStack: ['Vue.js', 'Electron', 'FastAPI'],
    techColor: 'emerald',
    status: 'Completed',
    team: 'Solo',
  },
  {
    title: 'YouTube-but-worst',
    description:
      'A full-stack video streaming platform clone exploring multimedia serving, data pagination, and enterprise-tier service layering.',
    techStack: ['React', 'Java', 'Spring Boot'],
    techColor: 'emerald',
    status: 'Completed',
    team: 'Solo',
  },
  {
    title: 'CryptoApp',
    description:
      'A dedicated cryptography utility providing clean visualization and execution of encryption, decryption routines, and secure payload hashing.',
    techStack: ['Python', 'Cryptography'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
  },
  {
    title: 'MatrixCalc',
    description:
      'Native desktop matrix calculator designed for rapid linear algebra computations, featuring high-performance memory management.',
    techStack: ['C++', 'wxWidgets', 'Math'],
    techColor: 'blue',
    status: 'Completed',
    team: 'Solo',
  },
  {
    title: 'Ticket Procurement Bot',
    description:
      'Automated script designed to monitor event queues, scrape availability in real-time, and automate checkout workflows on ticketing platforms.',
    techStack: ['Python', 'Automation', 'Scraping'],
    techColor: 'violet',
    status: 'Completed',
    team: 'Solo',
  },
];
