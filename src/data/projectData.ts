export type ProjectStatus = 'Live' | 'Completed' | 'In Progress';
export type ProjectTeam = 'Team' | 'Solo';

export interface ProjectLink {
  label: string;
  url: string;
  primary?: boolean;
}

export interface FeaturedProject {
  slug: string;
  title: string;
  shortDescription: {
    en: string;
    pl: string;
  };
  techStack: string[];
  status: ProjectStatus;
  team: ProjectTeam;
  backdropAccent?: string;
  links: ProjectLink[];
  images: string[];
  videoSrc?: string;
  caseStudy: {
    lead: {
      en: string;
      pl: string;
    };
    architecture: {
      en: string[];
      pl: string[];
    };
    challenges: {
      en: string[];
      pl: string[];
    };
    results: {
      en: string[];
      pl: string[];
    };
    relatedTeamPhotos?: string[];
  };
}

export interface ArchiveProject {
  title: string;
  description: {
    en: string;
    pl: string;
  };
  techStack: string[];
  status: ProjectStatus;
  team: ProjectTeam;
  links: ProjectLink[];
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    slug: 'ocean-simulation',
    title: 'Real-Time Ocean Simulation',
    shortDescription: {
      en: 'High-fidelity maritime ocean surface simulation featuring Gerstner wave physics and custom HLSL surface shaders in Unity.',
      pl: 'Symulacja powierzchni oceanu czasu rzeczywistego z fizyką fal Gerstnera i zaawansowanymi shaderami HLSL w Unity.',
    },
    techStack: ['Unity', 'C#', 'HLSL', 'Physics'],
    status: 'In Progress',
    team: 'Solo',
    backdropAccent: '#0C4A6E',
    links: [
      {
        label: 'Source Code ↗',
        url: 'https://github.com/MiniowaPM/SimulatingOceanWater',
        primary: true,
      },
    ],
    images: [
      '/images/ShipSim/1.jpg',
      '/images/ShipSim/2.jpg',
      '/images/ShipSim/3.jpg',
      '/images/ShipSim/4.jpg',
    ],
    caseStudy: {
      lead: {
        en: 'Bachelor engineering thesis project focused on photorealistic, physically plausible maritime simulation for marine navigation training.',
        pl: 'Projekt pracy inżynierskiej skupiony na fotorealistycznej, fizycznie wiarygodnej symulacji morskiej na potrzeby szkolenia nawigatorów.',
      },
      architecture: {
        en: [
          'Engineered a multi-layered procedural wave synthesis model implementing Gerstner wave equations running on the GPU.',
          'Custom HLSL shaders calculate dynamic water surface displacement, normal mapping, foam accumulation at wave crests, and depth-based light absorption (Beer-Lambert law).',
          'Integrated buoyancy calculations on the CPU using jobified sampling for realistic hydrodynamic interactions with ship hulls.',
        ],
        pl: [
          'Opracowano wielowarstwowy proceduralny model syntezy fal wykorzystujący równania fal Gerstnera wykonywane na GPU.',
          'Napisano shadery HLSL obliczające dynamiczne przemieszczenie powierzchni wody, mapowanie normalnych, generowanie piany na grzbietach fal oraz absorpcję światła zależną od głębokości (prawo Beera-Lamberta).',
          'Zintegrowano obliczenia wyporności na CPU ze zrównoleglonym próbkowaniem do hydrodynamicznej interakcji z kadłubem jednostki.',
        ],
      },
      challenges: {
        en: [
          'Minimizing CPU-GPU synchronization bottlenecks during high-frequency buoyancy height queries.',
          'Balancing visual fidelity and optical caustics with a strict 60+ FPS performance budget on consumer-tier hardware.',
        ],
        pl: [
          'Wyeliminowanie wąskich gardeł synchronizacji CPU-GPU podczas częstego odpytywania o wysokość fali dla fizyki pływalności.',
          'Utrzymanie wysokiej wierności optycznej i kaustyki przy zachowaniu płynności ponad 60 FPS na standardowym sprzęcie.',
        ],
      },
      results: {
        en: [
          'Delivered a stable, real-time hydrodynamic ocean environment ready for autonomous ship algorithmic testbeds.',
          'Deep practical mastery of graphics pipelines, HLSL compute/vertex shaders, and numerical physics modeling.',
        ],
        pl: [
          'Dostarczono stabilne środowisko hydrodynamiczne czasu rzeczywistego przygotowane do testów algorytmów nawigacji autonomicznej.',
          'Praktyczne opanowanie potoków graficznych, shaderów wierzchołkowych HLSL oraz numerycznego modelowania fizyki.',
        ],
      },
    },
  },
  {
    slug: 'plan-pm',
    title: 'PlanPM — Mobile Application',
    shortDescription: {
      en: 'Production mobile timetable app for university students and faculty, featuring automated schedule scraping, CI/CD, and Supabase.',
      pl: 'Produkcyjna aplikacja mobilna planu zajęć dla studentów i wykładowców, ze scrapingiem harmonogramów, CI/CD i bazą Supabase.',
    },
    techStack: ['Flutter', 'Dart', 'Supabase', 'Scraping', 'CI/CD'],
    status: 'Live',
    team: 'Team',
    backdropAccent: '#064E3B',
    links: [
      {
        label: 'Google Play ↗',
        url: 'https://play.google.com/store/apps/details?id=com.piotrwittig.plan_pm&hl=pl',
        primary: true,
      },
      {
        label: 'App Store ↗',
        url: 'https://apps.apple.com/pl/app/plan-pm/id6759010559',
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/KNI-PM-Szczecin/plan_pm',
      },
    ],
    images: [
      '/images/PlanPM/8.jpg',
      '/images/PlanPM/7.jpg',
      '/images/PlanPM/9.jpg',
      '/images/PlanPM/10.jpg',
      '/images/PlanPM/11.jpg',
      '/images/PlanPM/6.jpg',
      '/images/PlanPM/5.jpg',
      '/images/PlanPM/1.jpg',
      '/images/PlanPM/2.jpg',
      '/images/PlanPM/3.jpg',
      '/images/PlanPM/4.jpg',
    ],
    caseStudy: {
      lead: {
        en: 'A live cross-platform application actively used by thousands of students and faculty members across the Maritime University of Szczecin.',
        pl: 'Produkcyjna aplikacja wieloplatformowa, z której aktywnie korzystają tysiące studentów i wykładowców Politechniki Morskiej w Szczecinie.',
      },
      architecture: {
        en: [
          'Built with Flutter/Dart for identical 60 FPS native performance across iOS and Android.',
          'Implemented an automated scraping engine that monitors university portal changes and normalizes complex academic calendars into Supabase Postgres.',
          'Offline-first caching architecture utilizing local persistence so students always have their schedules available without cellular connection.',
        ],
        pl: [
          'Stworzona w Flutter/Dart z natywną wydajnością 60 FPS na systemach iOS i Android.',
          'Opracowano silnik automatycznego scrapingu monitorujący zmiany w portalu uczelnianym i normalizujący dane do bazy Supabase Postgres.',
          'Architektura offline-first z lokalnym cachem, dzięki czemu harmonogram jest dostępny natychmiastowo nawet przy braku zasięgu.',
        ],
      },
      challenges: {
        en: [
          'Handling frequent, unstructured layout changes on legacy university schedules without breaking client synchronization.',
          'Ensuring strict data consistency and zero crash rates during peak exam schedule publication periods.',
        ],
        pl: [
          'Odporność parsera na częste, niestrukturalne zmiany w starszych systemach planu zajęć uczelni.',
          'Zapewnienie bezawaryjności i natychmiastowej spójności danych w szczytowych momentach publikacji planów sesyjnych.',
        ],
      },
      results: {
        en: [
          'Successfully deployed to Google Play and Apple App Store with high active user ratings.',
          'Established full automated CI/CD deployment pipelines for fast, regression-free mobile releases.',
        ],
        pl: [
          'Wdrożenie do sklepów Google Play i Apple App Store z wysokimi ocenami użytkowników.',
          'Wdrożenie pełnego potoku CI/CD automatyzującego budowanie i publikację wydań mobilnych.',
        ],
      },
      relatedTeamPhotos: [
        '/images/HeroPage/Projects/3.jpg',
        '/images/HeroPage/Projects/4.jpg',
      ],
    },
  },
  {
    slug: 'world-of-drones',
    title: 'World of Drones — GlobalLogic',
    shortDescription: {
      en: 'Autonomous drone IoT platform integrating Nano AI computer vision, custom 3D enclosures, and automated CI/CD pipelines.',
      pl: 'Platforma IoT autonomicznych dronów z modelem detekcji Nano AI, autorskimi obudowami 3D i rygorystycznym potokiem CI/CD.',
    },
    techStack: [
      'React',
      'FastAPI',
      'Computer Vision',
      'Raspberry Pi',
      'STM32',
      'CI/CD',
    ],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#451A03',
    links: [
      {
        label: 'GlobalLogic Project Page ↗',
        url: 'https://www.globallogic.com/pl/about/events/iot-project-based-learning-world-of-drones/',
        primary: true,
      },
    ],
    images: [
      '/images/WorldOfDrones/1.jpg',
      '/images/WorldOfDrones/2.jpg',
      '/images/WorldOfDrones/3.jpg',
      '/images/WorldOfDrones/4.jpg',
      '/images/WorldOfDrones/5.jpg',
      '/images/WorldOfDrones/6.jpg',
    ],
    caseStudy: {
      lead: {
        en: 'End-to-end industrial IoT system built during the GlobalLogic summer engineering internship, combining aerial Edge AI with web telemetry.',
        pl: 'Kompleksowy system przemysłowego IoT stworzony podczas stażu inżynierskiego GlobalLogic, łączący Edge AI z telemetrią webową.',
      },
      architecture: {
        en: [
          'Engineered lightweight computer vision models optimized for low-power edge compute boards (Raspberry Pi & STM32).',
          'Designed custom 3D-printable enclosures in Autodesk Fusion to isolate vibration and ensure thermal dissipation on drone airframes.',
          'Integrated an asynchronous FastAPI backend and React operations dashboard providing real-time video streaming and vehicle telemetry.',
        ],
        pl: [
          'Wdrożono zoptymalizowane modele widzenia komputerowego przystosowane do urządzeń o niskim poborze mocy (Raspberry Pi & STM32).',
          'Zaprojektowano w Autodesk Fusion obudowy do druku 3D tłumiące wibracje i zapewniające odprowadzanie ciepła na ramie drona.',
          'Połączono asynchroniczny backend FastAPI z panelem dyspozytorskim w React, oferując strumieniowanie wideo i telemetrię na żywo.',
        ],
      },
      challenges: {
        en: [
          'Operating under strict weight, power, and thermal constraints imposed by drone payload limits.',
          'Synchronizing hardware telemetry with high-frequency aerial object detection under poor lighting conditions.',
        ],
        pl: [
          'Praca w reżimie rygorystycznych ograniczeń wagowych, zasilania i termiki narzuconych przez konstrukcję drona.',
          'Synchronizacja telemetrii ze strumieniem wideo i detekcją obiektów w zmiennych warunkach oświetleniowych.',
        ],
      },
      results: {
        en: [
          'Successfully tested and demonstrated live autonomous vehicle detection during the GlobalLogic showcase.',
          'Gained deep experience in enterprise Agile/Scrum delivery, code reviews, and hardware-software integration.',
        ],
        pl: [
          'Pomyślne demonstracje lotu i detekcji na żywo podczas finałowego showcase GlobalLogic.',
          'Praktyka w komercyjnym cyklu Agile/Scrum, procedurach code review oraz integracji sprzętowo-programowej.',
        ],
      },
      relatedTeamPhotos: [
        '/images/HeroPage/Projects/1.jpg',
        '/images/HeroPage/Projects/5.jpg',
      ],
    },
  },
  {
    slug: 'aleksy',
    title: 'ALEKSY — Edge Voice Assistant',
    shortDescription: {
      en: 'Privacy-first offline Polish voice assistant running local LLM and Whisper STT entirely on NVIDIA Jetson Xavier NX.',
      pl: 'Lokalny polski asystent głosowy działający bez chmury z modelem LLM i Whisper STT na NVIDIA Jetson Xavier NX.',
    },
    techStack: ['Python', 'Whisper', 'Bielik 7B', 'Jetson Xavier', 'Linux'],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#2E1065',
    links: [
      {
        label: 'Watch Demo ↗',
        url: 'https://www.youtube.com/shorts/V51wDqSVl7A',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/voice-assistant',
      },
    ],
    images: [
      '/images/ALEKSY/1.webp',
      '/images/ALEKSY/2.webp',
      '/images/ALEKSY/3.webp',
    ],
    caseStudy: {
      lead: {
        en: 'A zero-cloud, privacy-preserving embedded AI assistant capable of natural Polish voice conversation on edge hardware.',
        pl: 'Całkowicie lokalny, dbający o prywatność asystent AI realizujący konwersację głosową w języku polskim bezpośrednio na sprzęcie krawędziowym.',
      },
      architecture: {
        en: [
          'Constructed an on-device pipeline combining lightweight wake-word spotting, quantized Whisper for speech-to-text, and local LLM inference (Bielik 7B).',
          'Leveraged TensorRT acceleration on the NVIDIA Jetson Xavier NX GPU to achieve conversational response latencies.',
          'Offline text-to-speech synthesis generating natural audio output without sending any voice samples to remote cloud servers.',
        ],
        pl: [
          'Zbudowano potok łączący detekcję słowa wybudzającego, skwantowany model Whisper do rozpoznawania mowy i lokalny model LLM (Bielik 7B).',
          'Wykorzystano akcelerację TensorRT na GPU NVIDIA Jetson Xavier NX w celu minimalizacji opóźnień odpowiedzi konwersacyjnej.',
          'Synteza mowy TTS działająca w 100% offline, bez wysyłania jakichkolwiek próbek głosu do chmury.',
        ],
      },
      challenges: {
        en: [
          'Fitting modern 7B parameter language models within the shared 8GB unified memory budget of the Jetson module.',
          'Tuning Polish phoneme recognition and prompt formatting for rapid, context-aware command execution.',
        ],
        pl: [
          'Optymalizacja i zmieszczenie modelu 7B w 8 GB pamięci zunifikowanej modułu Jetson.',
          'Dostrojenie rozpoznawania polskich fonemów i promptingu pod kątem natychmiastowego wykonywania poleceń.',
        ],
      },
      results: {
        en: [
          'Functional prototype demonstrated live, proving viability of sovereign, cloudless smart-room systems.',
          'Published open-source codebase and demonstration video with technical documentation.',
        ],
        pl: [
          'Działający prototyp zaprezentowany na żywo, dowodzący wykonalności w pełni suwerennych asystentów smart-home.',
          'Udostępniony kod open-source wraz z nagraniem demonstracyjnym i dokumentacją techniczną.',
        ],
      },
      relatedTeamPhotos: ['/images/HeroPage/Projects/2.jpg'],
    },
  },
  {
    slug: 'navigator-pm',
    title: 'NavigatorPM — Campus Wayfinding',
    shortDescription: {
      en: 'Indoor university campus transit navigation with optimal pathfinding graph algorithms and dynamic map management dashboard.',
      pl: 'Wewnątrzbudynkowa nawigacja po kampusie uczelni z silnikiem wyznaczania tras grafowych i panelem edycji mapy.',
    },
    techStack: ['React', 'TypeScript', 'Graph Algorithms', 'Node.js'],
    status: 'In Progress',
    team: 'Team',
    backdropAccent: '#064E3B',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/KNI-PM-Szczecin/NavigatorPM',
        primary: true,
      },
    ],
    images: ['/images/NavigatorPM/1.png', '/images/NavigatorPM/2.png'],
    caseStudy: {
      lead: {
        en: 'A complex indoor positioning and multi-floor pathfinding platform designed for students and visitors navigating multi-building university facilities.',
        pl: 'Platforma nawigacji wewnątrzbudynkowej i wielopiętrowego wyznaczania tras ułatwiająca poruszanie się po rozległym kampusie akademickim.',
      },
      architecture: {
        en: [
          'Built custom topological graph structures representing hallways, stairwells, elevators, and room centroids.',
          'Implemented bidirectional Dijkstra and A* pathfinding with barrier-free accessibility weight modifiers (e.g. elevator preference for wheelchairs).',
          'Developed an interactive visual web editor enabling non-technical university staff to draw floor plans, add nodes, and update room labels without code deploys.',
        ],
        pl: [
          'Zaprojektowano struktury grafowe modelujące korytarze, klatki schodowe, windy i sale wykładowe.',
          'Zaimplementowano dwukierunkowy algorytm Dijkstry oraz A* z uwzględnieniem tras dostępnych dla osób z niepełnosprawnościami.',
          'Opracowano interaktywny edytor mapy pozwalający pracownikom uczelni edytować węzły i piętra bez konieczności zmian w kodzie.',
        ],
      },
      challenges: {
        en: [
          'Solving multi-floor routing transitions with realistic traversal penalties between interconnected campus wings.',
          'Rendering dense vector floor plans efficiently across mobile browser viewports with smooth zoom and pan interactions.',
        ],
        pl: [
          'Prawidłowe modelowanie przejść między piętrami i łącznikami budynków z uwzględnieniem wag czasowych.',
          'Wydajne renderowanie wektorowych planów kondygnacji na ekranach smartfonów z zachowaniem płynnego zoomu.',
        ],
      },
      results: {
        en: [
          'Created a scalable foundation adopted by the KNI science club for campus-wide deployment.',
          'Rigorous algorithmic verification and modular separation between graph computation and UI rendering.',
        ],
        pl: [
          'Stworzono skalowalny fundament rozwijany przez koło naukowe KNI pod kątem wdrożenia na całej uczelni.',
          'Wysoka czystość algorytmiczna oraz separacja silnika grafowego od warstwy prezentacji UI.',
        ],
      },
      relatedTeamPhotos: [
        '/images/HeroPage/Projects/3.jpg',
        '/images/HeroPage/Projects/6.jpg',
      ],
    },
  },
];

export const GRID_PROJECTS: ArchiveProject[] = [
  {
    title: 'NavigatorPM — Campus Wayfinding',
    description: {
      en: 'Indoor university campus transit navigation with optimal pathfinding graph algorithms and dynamic map management dashboard.',
      pl: 'Wewnątrzbudynkowa nawigacja po kampusie uczelni z silnikiem wyznaczania tras grafowych i panelem edycji mapy.',
    },
    techStack: ['React', 'TypeScript', 'Graph Algorithms', 'Node.js'],
    status: 'In Progress',
    team: 'Team',
    links: [
      {
        label: 'Case Study →',
        url: '/projects/navigator-pm',
        primary: true,
      },
      {
        label: 'GitHub ↗',
        url: 'https://github.com/KNI-PM-Szczecin/NavigatorPM',
        primary: false,
      },
    ],
  },
  {
    title: 'Maritime Autonomous Simulator',
    description: {
      en: 'Simulation system for testing autonomous navigation algorithms with dynamic sea conditions and hydrodynamic state feedback.',
      pl: 'System symulacji do testowania algorytmów autonomicznej nawigacji morskiej ze zmiennym stanem morza i hydrodynamiką.',
    },
    techStack: ['C#', 'Unity', 'HLSL'],
    status: 'In Progress',
    team: 'Team',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/JakubLopyta/ship-simulator',
        primary: true,
      },
    ],
  },
  {
    title: 'ŁatwaUstawa',
    description: {
      en: 'Hackathon-winning system summarizing legislative legal acts via Polish government REST APIs and localized LLMs.',
      pl: 'Nagrodzony na hackathonie system streszczający akty prawne przy użyciu otwartych API sejmowych oraz modeli LLM.',
    },
    techStack: ['Python', 'LLMs', 'REST API'],
    status: 'Completed',
    team: 'Team',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/Schoji/LatwaUstawa',
        primary: true,
      },
    ],
  },
  {
    title: 'E.D.E.K. ChatBot',
    description: {
      en: 'Question answering assistant leveraging semantic vector search (Sentence Transformers) with a lightweight Flask backend.',
      pl: 'Asystent pytań i odpowiedzi oparty na wyszukiwaniu semantycznym (Sentence Transformers) z backendem Flask.',
    },
    techStack: ['Python', 'Flask', 'NLP', 'PHP'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/ChatBotMiniowaPM',
        primary: true,
      },
    ],
  },
  {
    title: 'Reptilia',
    description: {
      en: 'Cross-platform desktop application for browsing and managing audio albums with an Electron and FastAPI architecture.',
      pl: 'Wieloplatformowa aplikacja desktopowa do zarządzania i odtwarzania albumów muzycznych w architekturze Electron + FastAPI.',
    },
    techStack: ['Vue.js', 'Electron', 'FastAPI'],
    status: 'Completed',
    team: 'Team',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/Reptilia',
        primary: true,
      },
    ],
  },
  {
    title: 'YouTube-but-worst',
    description: {
      en: 'Full-stack multimedia streaming prototype exploring distributed chunk serving, pagination, and enterprise Spring Boot services.',
      pl: 'Prototyp platformy wideo badający serwowanie strumieni multimedialnych, stronicowanie i architekturę Spring Boot.',
    },
    techStack: ['React', 'Java', 'Spring Boot'],
    status: 'In Progress',
    team: 'Solo',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/MiniowaPM-youtube-but-worse-frontend',
        primary: true,
      },
    ],
  },
  {
    title: 'CryptoApp',
    description: {
      en: 'Educational cryptographic suite visualizing classic and modern symmetric/asymmetric encryption and hashing algorithms.',
      pl: 'Narzędzie kryptograficzne wizualizujące działanie symetrycznych i asymetrycznych algorytmów szyfrowania oraz haszowania.',
    },
    techStack: ['Python', 'Cryptography', 'Streamlit'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/CryptoApp',
        primary: true,
      },
      {
        label: 'Live Demo ↗',
        url: 'https://cryptoapp-miniowa.streamlit.app/',
        primary: false,
      },
    ],
  },
  {
    title: 'MatrixCalc',
    description: {
      en: 'Native desktop linear algebra calculator featuring custom memory management and numerical matrix operations.',
      pl: 'Natywny kalkulator algebry liniowej z dedykowanym zarządzaniem pamięcią do szybkich obliczeń macierzowych.',
    },
    techStack: ['C++', 'wxWidgets', 'Math'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/MatrixCalc',
        primary: true,
      },
    ],
  },
  {
    title: 'Ticket Procurement Bot',
    description: {
      en: 'High-speed automated monitoring and queue notification script for ticketing systems with headless browser automation.',
      pl: 'Zautomatyzowany skrypt monitorujący kolejki biletowe w czasie rzeczywistym z powiadomieniami o dostępności miejsc.',
    },
    techStack: ['Python', 'Automation', 'Scraping'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'GitHub ↗',
        url: 'https://github.com/MiniowaPM/TicketMaster',
        primary: true,
      },
    ],
  },
];
