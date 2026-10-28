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
  slug?: string;
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
        label: 'Source Code',
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
      en: 'Production mobile timetable app with 1,000+ active downloads for university students and faculty, featuring automated schedule scraping, CI/CD, and Supabase backend architecture.',
      pl: 'Produkcyjna aplikacja mobilna planu zajęć z ponad 1000 pobraniami dla studentów i wykładowców, ze scrapingiem harmonogramów, CI/CD i architekturą bazy Supabase.',
    },
    techStack: ['Flutter', 'Dart', 'Supabase', 'Python', 'Flask', 'CI/CD'],
    status: 'Live',
    team: 'Team',
    backdropAccent: '#064E3B',
    links: [
      {
        label: 'Google Play',
        url: 'https://play.google.com/store/apps/details?id=com.piotrwittig.plan_pm&hl=pl',
        primary: true,
      },
      {
        label: 'App Store',
        url: 'https://apps.apple.com/pl/app/plan-pm/id6759010559',
      },
      {
        label: 'GitHub',
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
        en: 'A production cross-platform mobile schedule application with over 1,000 active downloads, licensed under CC BY-NC 4.0 (free forever for students), actively used by students and faculty across the Maritime University of Szczecin.',
        pl: 'Produkcyjna aplikacja wieloplatformowa z ponad 1000 aktywnymi pobraniami na licencji CC BY-NC 4.0 (darmowa dla studentów na zawsze), z której każdego dnia aktywnie korzystają studenci i wykładowcy Politechniki Morskiej w Szczecinie.',
      },
      architecture: {
        en: [
          'Engineered the 4-stage automated scraping data pipeline: Mapper (HTTP schedule ID discovery) → Scrapper (POST fetching from Virtual Dean’s Office) → Parser (normalization, deduplication, faculty/room extraction) → json2db (relational Supabase Postgres upserts).',
          'Developed the structure_updater subsystem that autonomously monitors and refreshes university organizational hierarchies across Faculties, Degree Courses, and Specialisations.',
          'Built an internal Flask administration panel featuring real-time scraping execution logs, in-app university announcement/news authoring, store telemetry, and environment switching.',
          'Architected database integration via Model Context Protocol (MCP server) exposing query endpoints and schema management tools to AI agents.',
          'Developed cross-platform client in Flutter/Dart with native home screen widgets in three sizes (iOS WidgetKit in Swift and Android AppWidget), daily and weekly views, dedicated Lecturer Mode, and 3-language localization (PL, EN, UA).',
        ],
        pl: [
          'Opracowano 4-etapowy potok automatycznego scrapingu danych: Mapper (odkrywanie aktywnych ID) → Scrapper (pobieranie POST z Wirtualnego Dziekanatu) → Parser (normalizacja, deduplikacja, wyodrębnianie sal i wykładowców) → json2db (upsert do Supabase Postgres).',
          'Zaprojektowano moduł structure_updater automatycznie synchronizujący i odświeżający hierarchię uczelnianą (Wydziały → Kierunki studiów → Specjalności).',
          'Zbudowano wewnętrzny panel administracyjny we Flasku z podglądem logów scrapingu na żywo, modułem ogłoszeń uczelnianych, statystykami pobrań i przełączaniem środowisk.',
          'Wdrożono integrację bazy danych z serwerem MCP (Model Context Protocol), udostępniającym schemat i zapytania jako narzędzia dla agentów AI.',
          'Rozwinięto aplikację mobilną Flutter/Dart z natywnymi widgetami ekranu domowego w 3 rozmiarach (iOS WidgetKit w Swift, Android AppWidget), widokami dziennymi i tygodniowymi, trybem wykładowcy oraz obsługą 3 języków (PL, EN, UA).',
        ],
      },
      challenges: {
        en: [
          'Parsing brittle, unstructured HTML tables from legacy Dean’s Office software and defending against unannounced layout shifts without client desynchronization.',
          'Guaranteeing zero downtime and sub-second schedule retrieval during peak exam publication periods and start-of-semester surges.',
          'Managing robust offline caching and multi-platform background synchronization states across iOS and Android device sleep modes.',
        ],
        pl: [
          'Odporność parsera na niestrukturalne tabele HTML ze starszych systemów Wirtualnego Dziekanatu oraz obrona przed nagłymi zmianami formatowania bez desynchronizacji klientów.',
          'Zapewnienie 100% dostępności i subsekundowych czasów odpowiedzi bazy podczas szczytowych momentów publikacji planów sesyjnych.',
          'Implementacja niezawodnego cache offline i synchronizacji w tle na platformach iOS i Android uwzględniającej tryby oszczędzania energii.',
        ],
      },
      results: {
        en: [
          'Achieved over 1,000 downloads with enthusiastic reception and daily active use across the academic community.',
          'Maintained high availability, sub-second sync times, and reliable daily schedule updates for thousands of students and faculty members.',
          'Established an active open-source academic ecosystem maintained by Koło Naukowe Informatyki (KNI).',
        ],
        pl: [
          'Ponad 1000 pobrań oraz codzienne, aktywne wykorzystanie przez społeczność akademicką i kadrę Politechniki Morskiej.',
          'Wysoka bezawaryjność, subsekundowe czasy synchronizacji oraz zautomatyzowane potoki CI/CD do wydań w Google Play i Apple App Store.',
          'Stworzenie trwałego akademickiego ekosystemu open-source rozwijanego w ramach Koła Naukowego Informatyki (KNI).',
        ],
      },
      relatedTeamPhotos: [],
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
        label: 'GlobalLogic Project Page',
        url: 'https://www.globallogic.com/pl/about/events/iot-project-based-learning-world-of-drones/',
        primary: true,
      },
    ],
    images: [
      '/images/WorldOfDrones/1.jpg',
      '/images/WorldOfDrones/2.jpeg',
      '/images/WorldOfDrones/3.jpg',
      '/images/WorldOfDrones/4.jpg',
      '/images/WorldOfDrones/5.jpg',
      '/images/WorldOfDrones/6.jpg',
      '/images/WorldOfDrones/7.jpg',
      '/images/WorldOfDrones/8.jpg',
    ],
    caseStudy: {
      lead: {
        en: 'End-to-end industrial IoT system built during the GlobalLogic summer engineering internship, combining aerial Edge AI with web telemetry.',
        pl: 'Kompleksowy system przemysłowego IoT stworzony podczas stażu inżynierskiego GlobalLogic, łączący Edge AI z telemetrią webową.',
      },
      architecture: {
        en: [
          'Engineered lightweight computer vision models optimized for low-power edge compute boards (Raspberry Pi & STM32).',
          'Designed custom 3D-printable enclosures in Autodesk Fusion to isolate vibration and ensure thermal dissipation on drone airframes and landing pads.',
          'Integrated an asynchronous FastAPI backend and React operations dashboard providing real-time video streaming and vehicle telemetry.',
        ],
        pl: [
          'Wdrożono zoptymalizowane modele widzenia komputerowego przystosowane do urządzeń o niskim poborze mocy (Raspberry Pi & STM32).',
          'Zaprojektowano w Autodesk Fusion obudowy do druku 3D tłumiące wibracje i zapewniające odprowadzanie ciepła na ramie drona i lądowisku.',
          'Połączono asynchroniczny backend FastAPI z panelem dyspozytorskim w React, oferując strumieniowanie wideo i telemetrię na żywo.',
        ],
      },
      challenges: {
        en: [
          'Operating under strict weight, power, and thermal constraints imposed by drone payload limits.',
          'Synchronizing hardware telemetry with high-frequency aerial object detection under fluctuating light conditions.',
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
        '/images/HeroPage/Projects/2.jpg',
      ],
    },
  },
  {
    slug: 'aleksy',
    title: 'ALEKSY — Edge Voice Assistant (Unit 01)',
    shortDescription: {
      en: 'Autonomous Local Encrypted Knowledge System Yield — fully offline, privacy-first Polish voice assistant running local LLM and Whisper STT on NVIDIA Jetson Xavier NX.',
      pl: 'Autonomous Local Encrypted Knowledge System Yield — w 100% lokalny, suwerenny polski asystent głosowy z modelem LLM i Whisper STT na NVIDIA Jetson Xavier NX.',
    },
    techStack: [
      'Python',
      'openWakeWord',
      'faster-whisper',
      'Bielik 7B',
      'Ollama',
      'Piper TTS',
      'Jetson Xavier',
      'Linux',
      'Rhino 3D',
    ],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#2E1065',
    links: [
      {
        label: 'Watch Demo',
        url: 'https://www.youtube.com/shorts/V51wDqSVl7A',
        primary: true,
      },
      {
        label: 'GitHub',
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
        en: 'A fully offline, privacy-first smart room Polish voice assistant (Unit 01). Built from scratch with an on-device LLM, zero-latency feedback, and custom 3D-printed enclosure running on NVIDIA Jetson Xavier NX.',
        pl: 'W 100% lokalny, suwerenny polski asystent głosowy smart-room (Unit 01). Zbudowany od podstaw z lokalnym modelem LLM, natychmiastową reakcją audio i autorską obudową 3D na NVIDIA Jetson Xavier NX.',
      },
      architecture: {
        en: [
          'Hardware Unit 01: Powered by NVIDIA Jetson Xavier NX (6-core Carmel ARM v8.2, Volta GPU with 384 CUDA cores, 8 GB LPDDR4x unified memory) with USB lavalier mic, dual stereo speakers, and cordless USB-C powerbank operation.',
          'Physical Enclosure: Custom aerodynamic housing designed from scratch in Rhinoceros 3D (.3dm) and 3D-printed in orange PLA, engineered with active ventilation, internal speaker acoustic mounts, cable routing channels, and embossed branding.',
          'Zero-latency audio feedback pipeline: openWakeWord (16 kHz PyAudio stream, ONNX inference) triggers immediate pre-rendered "Tak?" audio (0 ms synthesis latency) while faster-whisper (int8 CPU with VAD) initiates transcription.',
          'On-device LLM reasoning: Ollama running quantized Bielik 7B (v0.1 Q3_K_M) on the Volta GPU for natural Polish language reasoning, coupled with Piper TTS (pl_PL-darkman-medium) for clear vocal synthesis.',
          'Self-awareness & ambient capabilities: Rolling 5-exchange conversation memory kept strictly in RAM (never written to disk), real-time date/time converted to Polish words, live CPU temperature and RAM telemetry injection ("Jak się czujesz?"), voice-controlled timers, and systemd autostart.',
          'Dedicated training toolkit: Created openwakeword-local-trainer to bypass broken cloud dependencies and train custom wake-word ONNX models on CPU in 2 minutes using Piper TTS audio synthesis and the ACAV100M negative dataset.',
        ],
        pl: [
          'Sprzęt Unit 01: Oparty na NVIDIA Jetson Xavier NX (6-rdzeniowy Carmel ARM v8.2, GPU Volta z 384 rdzeniami CUDA, 8 GB pamięci zunifikowanej LPDDR4x), mikrofon krawatowy, podwójne głośniki stereo i w 100% bezprzewodowe zasilanie z powerbanka USB-C.',
          'Autorska obudowa 3D: Zaprojektowana od zera w Rhinoceros 3D (.3dm) i wydrukowana z pomarańczowego PLA, wyposażona w kratki wentylacyjne, komory głośnikowe, prowadnice kabli i tłoczone oznaczenie „A.L.E.K.S.Y. — UNIT 01”.',
          'Natychmiastowy feedback audio: openWakeWord (strumień 16 kHz, inferencja ONNX) odtwarza pre-renderowane „Tak?” z zerowym opóźnieniem syntezy, podczas gdy faster-whisper (int8 CPU z filtrem VAD) realizuje transkrypcję z komunikatem „Chwileczkę...”.',
          'Lokalne wnioskowanie LLM: Ollama ze skwantowanym polskim modelem Bielik 7B (v0.1 Q3_K_M) na GPU Volta do konwersacji, połączona z syntezatorem Piper TTS (pl_PL-darkman-medium).',
          'Świadomość systemowa i funkcje: Krocząca historia 5 wymian zdań trzymana wyłącznie w RAM (brak zapisu na dysk), wstrzykiwanie aktualnego czasu słownie po polsku, odczyty temperatury CPU i zużycia RAM („Jak się czujesz?”), timery głosowe i autostart systemd.',
          'Autorski trener modeli: Stworzenie narzędzia openwakeword-local-trainer naprawiającego zależności i umożliwiającego lokalny trening modeli słów wybudzających .onnx na CPU w 2 minuty z użyciem Piper TTS i bazy ACAV100M.',
        ],
      },
      challenges: {
        en: [
          'Speech-to-text latency bottleneck on edge CPU (5–8s per 2s sentence) and fitting a 7B LLM within the shared 8GB unified memory constraint.',
          'Navigating JetPack 5 software constraints (pinned older ONNX Runtime and Ollama versions lacking tool-calling).',
        ],
        pl: [
          'Wąskie gardło transkrypcji mowy (STT) na CPU platformy brzegowej (5–8 s na krótkie zdanie) oraz zmieszczenie modelu 7B w 8 GB pamięci współdzielonej.',
          'Ograniczenia środowiska JetPack 5 (starsze wersje bibliotek ONNX Runtime i Ollama bez natywnego wsparcia dla tool-callingu).',
        ],
      },
      results: {
        en: [
          'Fully functional, sovereign smart-room device proven live in public video demonstrations with zero cloud data transmission.',
          'Formulated practical engineering takeaways that directly govern the architecture of planned Unit 02 (Raspberry Pi 5 + hybrid cloud speed).',
        ],
        pl: [
          'W pełni działający, suwerenny asystent fizyczny smart-room zaprezentowany w publicznym materiale wideo, bez wysyłania jakichkolwiek danych do chmury.',
          'Praktyczne wnioski inżynierskie stanowiące fundament pod planowaną wersję Unit 02 (Raspberry Pi 5 + optymalizacja hybrydowa).',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'navigator-pm',
    title: 'NavigatorPM — Campus Wayfinding',
    shortDescription: {
      en: 'Zero-latency indoor university campus transit navigation with client-side graph pathfinding, QR localization, and accessibility routing.',
      pl: 'Nawigacja wewnątrzbudynkowa po kampusie uczelni w architekturze zero-latency z wyznaczaniem tras po stronie klienta, kodami QR i trybem dostępności.',
    },
    techStack: [
      'Next.js',
      'React',
      'TypeScript',
      'Graph Algorithms',
      'Dijkstra',
      'SVG Maps',
      'QR Codes',
      'Tailwind CSS',
    ],
    status: 'In Progress',
    team: 'Team',
    backdropAccent: '#064E3B',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/KNI-PM-Szczecin/NavigatorPM',
        primary: true,
      },
    ],
    images: [
      '/images/NavigatorPM/1.png',
      '/images/NavigatorPM/2.png',
      '/images/NavigatorPM/3.png',
      '/images/NavigatorPM/4.png',
      '/images/NavigatorPM/5.png',
      '/images/NavigatorPM/6.png',
      '/images/NavigatorPM/7.png',
      '/images/NavigatorPM/8.png',
      '/images/NavigatorPM/9.png',
      '/images/NavigatorPM/10.png',
      '/images/NavigatorPM/11.png',
      '/images/NavigatorPM/12.png',
    ],
    caseStudy: {
      lead: {
        en: 'High-performance university campus indoor transit and wayfinding system ("Google Maps for inside buildings") built on a zero-latency stateless architecture with client-side graph pathfinding.',
        pl: 'Wysokowydajny system nawigacji wewnątrzbudynkowej po kampusie uczelnianym („Google Maps dla wnętrz”) oparty na bezstanowej architekturze zero-latency i wyznaczaniu tras po stronie klienta.',
      },
      architecture: {
        en: [
          'Zero-latency in-memory data engine: Entire campus topological grid is loaded from map.json directly into Next.js server RAM on boot, indexed into O(1) hash maps (mapStore.ts), achieving sub-millisecond API response times without relational database overhead.',
          'Client-side graph routing: Complete Dijkstra pathfinding computations run directly in the user’s mobile browser, eliminating backend routing bottlenecks.',
          'Instant QR code localization: Physical QR stickers placed across university hallways allow students to scan and instantly initialize their coordinates and floor map (/api/qr/[id]).',
          'Accessibility routing (Tryb Dostępności): Dedicated algorithmic weight modifier calculating barrier-free transit paths that bypass staircases and prioritize elevator access for wheelchair users and mobility-impaired individuals.',
          'Multi-floor transition handling: Seamless routing across levels and interconnected university building wings with automated vector SVG floor plan switching.',
          'Internationalization: Native multi-lingual room labeling, search indexes, and wayfinding instructions in Polish, English, and Ukrainian.',
        ],
        pl: [
          'Silnik pamięciowy zero-latency: Kompletna siatka topologiczna kampusu ładowana jest z map.json bezpośrednio do pamięci RAM serwera Next.js przy starcie, indeksowana w słownikach O(1) (mapStore.ts), osiągając czasy odpowiedzi poniżej 1 ms bez narzutu relacyjnej bazy danych.',
          'Nawigacja po stronie klienta: Obliczenia algorytmu grafowego Dijkstry wykonują się bezpośrednio w przeglądarce smartfona użytkownika, odciążając serwer.',
          'Błyskawiczna lokalizacja kodami QR: Fizyczne naklejki QR na korytarzach uczelni pozwalają studentom po zeskanowaniu natychmiast ustalić pozycję startową i wczytać piętro (/api/qr/[id]).',
          'Tryb dostępności: Dedykowane modyfikatory wag grafu wyznaczające trasy bez barier architektonicznych (omijanie schodów, preferowanie wind) dla osób z niepełnosprawnościami i wózków.',
          'Wielopiętrowe przejścia: Płynne prowadzenie trasy pomiędzy piętrami i łącznikami budynków z automatyczną zmianą wektorowych map SVG.',
          'Pełna wielojęzyczność: Wyszukiwarka i opisy sal wykładowych w języku polskim, angielskim i ukraińskim.',
        ],
      },
      challenges: {
        en: [
          'Modeling realistic multi-floor vertical transitions and distance penalties across heterogeneous architectural building wings.',
          'Ensuring buttery-smooth SVG map rendering, zoom, and panning across varying mobile GPU viewports.',
        ],
        pl: [
          'Prawidłowe modelowanie przejść pionowych i wag czasowych pomiędzy historycznymi, połączonymi skrzydłami budynków uczelni.',
          'Płynne renderowanie, zoomowanie i przesuwanie wektorowych podkładów SVG na słabszych układach graficznych smartfonów.',
        ],
      },
      results: {
        en: [
          'Adopted as a core technology initiative by Koło Naukowe Informatyki (KNI) for university-wide campus rollout.',
          'Engineered clean API endpoints (/api/qr, /api/buildings, /api/pois, /api/map-data) establishing a modular foundation for university mobile app integration.',
        ],
        pl: [
          'Przyjęty jako flagowy projekt technologiczny koła KNI pod kątem wdrożenia na całym kampusie Politechniki Morskiej.',
          'Przejrzyste endpointy API (/api/qr, /api/buildings, /api/pois, /api/map-data) tworzące modułowy fundament pod integrację z ekosystemem PlanPM.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'hubmi',
    title: 'hubmi.pl — Social Innovation Platform',
    shortDescription: {
      en: 'Social innovation matching platform created at HackYeah 2026 (score 7.35/10), featuring AI grant drafting, needs mapping, and WCAG accessibility.',
      pl: 'Platforma innowacji społecznych stworzona na HackYeah 2026 (ocena jury 7.35/10), z asystentem wniosków grantowych AI, mapą potrzeb i dostępnością WCAG.',
    },
    techStack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'PostgreSQL',
      'Drizzle ORM',
      'OpenAI API',
      'pgvector',
      'WCAG 2.1 AA',
    ],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#C52783',
    links: [
      {
        label: 'Watch Demo',
        url: 'https://www.youtube.com/watch?v=q_ZCYjqOdYQ',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MasterSun8/hubmi.pl',
        primary: false,
      },
    ],
    images: [
      '/images/Hubmi/home.webp',
      '/images/Hubmi/canvas.webp',
      '/images/Hubmi/needs-map.webp',
      '/images/Hubmi/problem.webp',
      '/images/Hubmi/submissions.webp',
      '/images/Hubmi/reports.webp',
    ],
    caseStudy: {
      lead: {
        en: 'Social innovation matching platform created during the 24-hour HackYeah 2026 hackathon (Tauron Arena Kraków) for the Regional Centre for Social Policy (ROPS Kraków). Built by team JSON Derulo (6 members), achieving a high jury score of 7.35/10 (vs 5.57 competition average).',
        pl: 'Platforma innowacji społecznych stworzona w 24 godziny podczas hackathonu HackYeah 2026 (Tauron Arena Kraków) dla Regionalnego Ośrodka Polityki Społecznej w Krakowie (ROPS). Stworzona przez 6-osobowy zespół JSON Derulo, uzyskując wysoką ocenę 7.35/10 (wobec średniej konkursu 5.57).',
      },
      architecture: {
        en: [
          'Citizen problem intake (/zglos-problem): Conversational AI assistant streaming responses via Server-Sent Events (SSE). Incorporates semantic RAG search across 115 published ROPS social innovations and includes emergency life-threat detection automatically redirecting to 112.',
          'Idea incubator & grant generator (/zaoferuj-pomoc): Conversational intake continuously updating a live idea card, feeding an interactive 9-field Social Innovation Canvas (with PDF export) and automatically drafting structured grant applications tailored to specific institutional funding call criteria.',
          'Institutional portal (/admin): Automated AI enrichment pipeline generating concise titles, summaries, 14 categories, target demographics, and quantified risk assessments with reasoning; two-way semantic matchmaking connecting problems with proven solutions.',
          'Interactive Regional Needs Map: Visualizing 149 social challenge indicators from the ROPS Observatory across all 22 powiats of Małopolska on OpenStreetMap.',
          'Strict WCAG 2.1 AA compliance: Accessibility bar featuring high-contrast mode, 3-level font scaling (A / A+ / A++), and keyboard-friendly semantic HTML.',
        ],
        pl: [
          'Ścieżka zgłaszania problemów (/zglos-problem): Asystent konwersacyjny AI ze strumieniowaniem odpowiedzi przez SSE. Wbudowany semantyczny RAG przeszukujący bazę 115 sprawdzonych innowacji ROPS oraz detektor zagrożenia życia kierujący pod numer 112.',
          'Inkubator pomysłów i generator wniosków (/zaoferuj-pomoc): Rozmowa na bieżąco uzupełniająca fiszkę pomysłu, interaktywna 9-polowa Kanwa Innowacji Społecznej (z eksportem do PDF) oraz generator wniosków o dofinansowanie pod kryteria naboru.',
          'Panel instytucjonalny (/admin): Potok wzbogacania danych przez AI (tytuł, streszczenie, 14 kategorii, grupa docelowa, ocena ryzyka z uzasadnieniem) oraz dwustronny matchmaking łączący problemy mieszkańców ze sprawdzonymi innowacjami.',
          'Interaktywna regionalna mapa potrzeb: Prezentacja 149 wskaźników społecznych Obserwatorium ROPS w 22 powiatach Małopolski zintegrowana z OpenStreetMap.',
          'Dostępność WCAG 2.1 AA: Pasek dostępności z trybem wysokiego kontrastu, 3-stopniowym skalowaniem fontów (A / A+ / A++) oraz pełną nawigacją klawiaturą.',
        ],
      },
      challenges: {
        en: [
          'Designing and implementing a complete multi-role platform (residents, social innovators, municipal administrators) within a rigorous 24-hour hackathon timeframe.',
          'Engineering precise AI prompt pipelines ensuring generated grant applications adhere to strict municipal funding rubrics rather than generic conversational answers.',
        ],
        pl: [
          'Zaprojektowanie i wdrożenie kompletnej platformy łączącej trzy role (mieszkańcy, autorzy innowacji, pracownicy urzędu) w restrykcyjnym reżimie 24 godzin.',
          'Dostrojenie promptów i łańcuchów AI tak, aby generowane wnioski grantowe precyzyjnie spełniały kryteria formalne naborów zamiast ogólnikowego tekstu.',
        ],
      },
      results: {
        en: [
          'Achieved a 7.35/10 weighted jury evaluation (7.50 Challenge Fulfilment, 7.50 Accessibility & Usability, 7.50 MVP Quality) outperforming competitive entries across the category.',
          'Demonstrated exceptional teamwork and delivery speed within the 6-person JSON Derulo team from Szczecin.',
        ],
        pl: [
          'Wysoka ocena jury 7.35/10 (7.50 za spełnienie wyzwania, 7.50 za dostępność i intuicyjność, 7.50 za jakość MVP) wyraźnie powyżej średniej hackathonu (5.57).',
          'Wzorowa współpraca i synchronizacja w 6-osobowym zespole JSON Derulo ze Szczecina.',
        ],
      },
      relatedTeamPhotos: [
        '/images/Hackyeah2026/1.jpeg',
        '/images/Hackyeah2026/2.jpeg',
        '/images/Hackyeah2026/3.jpeg',
        '/images/Hackyeah2026/4.jpeg',
        '/images/Hackyeah2026/5.jpeg',
      ],
    },
  },
  {
    slug: 'maritime-autonomous-simulator',
    title: 'Maritime Autonomous Simulator',
    shortDescription: {
      en: 'Simulation system for testing autonomous navigation algorithms with dynamic sea conditions, hydrodynamic state feedback, and real-time telemetry controls.',
      pl: 'System symulacji do testowania algorytmów autonomicznej nawigacji morskiej ze zmiennym stanem morza, hydrodynamiką i telemetrią w czasie rzeczywistym.',
    },
    techStack: ['Unity', 'C#', 'HLSL', 'Physics', 'Hydrodynamics'],
    status: 'In Progress',
    team: 'Team',
    backdropAccent: '#0C4A6E',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/JakubLopyta/ship-simulator',
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
        en: 'A collaborative simulation environment developed for validating autonomous marine vessel control algorithms in simulated open waters.',
        pl: 'Środowisko symulacyjne rozwijane zespołowo na potrzeby testowania i weryfikacji algorytmów sterowania autonomicznymi jednostkami pływającymi.',
      },
      architecture: {
        en: [
          'Engineered the maritime telemetry and UI control pipeline (ShipUIController.cs and Ship.cs) providing decoupled simulation logic and real-time operator inputs.',
          'Implemented continuous navigational telemetry readouts: Speed (m/s), Course Over Ground (COG), Speed Over Ground (SOG), True Heading (HDG), and Rate of Turn (°/s).',
          'Supported variable ship propulsion parameters: dynamic engine throttle (0–100%), variable rudder angle, and simulation playback states (Play, Pause, Stop, Return).',
          'Modular MonoBehaviour architecture allowing straightforward multi-vessel scene instantiations and autonomous guidance system couplings.',
        ],
        pl: [
          'Zaprojektowano potok telemetrii morskiej i interfejsu kontrolnego (ShipUIController.cs oraz Ship.cs) odseparowujący logikę symulacji od warstwy prezentacji.',
          'Zaimplementowano ciągły odczyt parametrów żeglugowych: prędkości (m/s), kursu nad dnem (COG), prędkości nad dnem (SOG), kursu rzeczywistego (HDG) oraz prędkości kątowej (°/s).',
          'Obsłużono zmienne parametry napędowe jednostki: płynną moc silnika (0–100%), kąt płetwy steru oraz kontrolę stanu symulacji (Play, Pause, Stop, Return).',
          'Modularna architektura MonoBehaviour umożliwiająca łatwe dodawanie kolejnych jednostek pływających i zasilanie modeli nawigacji autonomicznej.',
        ],
      },
      challenges: {
        en: [
          'Coupling numerical fluid approximations with rigid-body vessel physics at stable simulation time-steps.',
          'Maintaining deterministic behavior across heterogeneous test runs for autonomous guidance benchmarking.',
        ],
        pl: [
          'Połączenie numerycznych przybliżeń dynamiki płynów z fizyką ciał sztywnych przy stabilnym kroku czasowym.',
          'Zapewnienie powtarzalności i determinizmu symulacji dla powtarzalnych testów benchmarkowych algorytmów nawigacji.',
        ],
      },
      results: {
        en: [
          'Created a lightweight, extensible test platform for autonomous ship routing experimentation in Unity.',
          'Enabled rapid algorithmic iteration without requiring expensive real-world maritime trial hours.',
        ],
        pl: [
          'Stworzenie lekkiej, rozszerzalnej platformy do eksperymentów z autonomicznym sterowaniem jednostek w środowisku Unity.',
          'Możliwość szybkiej iteracji algorytmów bez konieczności kosztownych testów na rzeczywistych akwenach.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'latwa-ustawa',
    title: 'ŁatwaUstawa',
    shortDescription: {
      en: 'Civic-tech mobile application democratizing Polish parliamentary legislation with AI summaries and citizen feeds, developed for HackNation 2025.',
      pl: 'Aplikacja civic-tech demokratyzująca polskie prawo i ustawy sejmowe przy użyciu AI, stworzona podczas hackathonu HackNation 2025.',
    },
    techStack: [
      'Flutter',
      'Dart',
      'FastAPI',
      'Python',
      'DeepSeek',
      'Sejm REST API',
      'WCAG',
    ],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#1E293B',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/Schoji/LatwaUstawa',
        primary: true,
      },
    ],
    images: [
      '/images/LatwaUstawa/1.png',
      '/images/LatwaUstawa/2.png',
    ],
    caseStudy: {
      lead: {
        en: 'Civic-tech mobile application democratizing Polish parliamentary legislation through AI, developed during HackNation 2025. Mikołaj served as the dedicated Backend Developer.',
        pl: 'Aplikacja civic-tech demokratyzująca prawo i akty parlamentarne przy użyciu AI, stworzona podczas HackNation 2025. Mikołaj odpowiadał za architekturę i realizację backendu.',
      },
      architecture: {
        en: [
          'FastAPI backend service integrating directly with the official Polish Sejm open REST API to ingest legislative bills, statutory amendments, and voting records.',
          'NLP summarization pipeline orchestrating DeepSeek models via Hugging Face API to digest dense, multi-page legal jargon into neutral, bulleted takeaways for citizens.',
          'Social-media style Flutter frontend presenting parliamentary bills in a clean, bite-sized vertical feed inspired by platform X (Twitter).',
          'MPs Database (Baza Posłów): Comprehensive directory of current Members of Parliament featuring party affiliations, professional biographies, photos, and sponsored bill tracking.',
          'Accessible design and privacy: WCAG-compliant high-legibility formatting, visual legislative progress timeline, and dedicated GDPR/RODO compliance.',
        ],
        pl: [
          'Usługa backendowa w FastAPI połączona z oficjalnym otwartym API Sejmu RP, pobierająca treść ustaw, nowelizacji i wyniki głosowań.',
          'Potok przetwarzania NLP wykorzystujący modele DeepSeek przez Hugging Face API do przekształcania skomplikowanego żargonu prawnego w neutralne, syntetyczne streszczenia.',
          'Aplikacja mobilna Flutter prezentująca proces legislacyjny w formie nowoczesnego, dynamicznego feedu społecznościowego inspirowanego platformą X (Twitter).',
          'Baza Posłów: Przegląd posłów na Sejm RP z podziałem na kluby parlamentarne, biogramy zawodowe, zdjęcia i listę wnoszonych projektów ustaw.',
          'Dostępność i transparentność: Typografia zgodna z WCAG, wizualna oś czasu prac legislacyjnych oraz wbudowane moduły ochrony prywatności RODO.',
        ],
      },
      challenges: {
        en: [
          'Translating dense legal amendments and multi-level statutory cross-references into accurate layman summaries without hallucinating legal implications.',
          'Handling unstructured and dynamically formatted legislative documents from government endpoints.',
        ],
        pl: [
          'Przekładanie zawiłych nowelizacji i wielopoziomowych odesłań do wcześniejszych kodeksów na precyzyjne streszczenia bez zniekształcania sensu prawnego.',
          'Radzenie sobie z niestrukturalnymi dokumentami i zmiennymi formatami publikacji z serwisów sejmowych.',
        ],
      },
      results: {
        en: [
          'Functional open-source prototype delivered at HackNation 2025, demonstrating practical civic-tech utility for parliamentary transparency.',
          'Proven feasibility of combining public sector open data APIs with lightweight language models.',
        ],
        pl: [
          'Działający prototyp open-source zaprezentowany na HackNation 2025, dowodzący praktycznej użyteczności modeli językowych w transparentności życia publicznego.',
          'Udowodniona efektywność łączenia otwartych API sektora publicznego z modelami językowymi w architekturze mikroserwisowej.',
        ],
      },
      relatedTeamPhotos: [
        '/images/HeroPage/Projects/3.jpg',
        '/images/HeroPage/Projects/4.jpg',
        '/images/HeroPage/Projects/5.jpg',
        '/images/HeroPage/Projects/6.jpg',
      ],
    },
  },
  {
    slug: 'edek-chatbot',
    title: 'E.D.E.K. ChatBot',
    shortDescription: {
      en: 'Semantic question-answering assistant (Eksperymentalny Doradca Emitujący Komunikaty) with zero-cold-start vector caching and lightweight Flask/PHP architecture.',
      pl: 'Asystent pytań i odpowiedzi (Eksperymentalny Doradca Emitujący Komunikaty) z buforowaniem wektorów bez opóźnień zimnego startu i architekturą Flask + PHP.',
    },
    techStack: [
      'Python',
      'Flask',
      'Sentence Transformers',
      'scikit-learn',
      'NumPy',
      'PHP',
      'JavaScript',
    ],
    status: 'Completed',
    team: 'Solo',
    backdropAccent: '#064E3B',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/ChatBotMini',
        primary: true,
      },
    ],
    images: [
      '/images/Edek/1.png',
      '/images/Edek/2.png',
    ],
    caseStudy: {
      lead: {
        en: 'Lightweight semantic Question-Answering chatbot (Eksperymentalny Doradca Emitujący Komunikaty) combining a zero-cold-start Flask AI backend with a responsive PHP interface.',
        pl: 'Lekki asystent pytań i odpowiedzi (Eksperymentalny Doradca Emitujący Komunikaty) łączący backend Flask z wyszukiwaniem semantycznym bez opóźnień zimnego startu z responsywnym frontendem PHP.',
      },
      architecture: {
        en: [
          'Semantic search engine: Converts user queries into dense numerical vectors using the multilingual paraphrase-multilingual-MiniLM-L12-v2 Sentence Transformer model.',
          'Cosine similarity indexing: Evaluates mathematical query distance against pre-embedded knowledge bases, serving answers when confidence exceeds a calibrated threshold (>0.5).',
          'Zero-cold-start "Bake Mode" (bake_mode.py): Offline compilation script that pre-computes knowledge base embeddings and saves them as compiled NumPy (.npy) arrays, eliminating initialization lag on server boot.',
          'Minimalist web client: Asynchronous PHP/Vanilla JS interface with smooth AJAX fetch calls, local storage theme persistence (light/dark mode), and instant query feedback.',
        ],
        pl: [
          'Silnik wyszukiwania semantycznego: Przekształca pytania użytkownika w wektory numeryczne z użyciem wielojęzycznego modelu paraphrase-multilingual-MiniLM-L12-v2.',
          'Indeksowanie podobieństwa cosinusowego: Oblicza odległość kątową wektorów pytań z precyzyjnie dobranym progiem pewności (>0.5) eliminującym błędne odpowiedzi.',
          'Tryb „Bake Mode” (bake_mode.py): Skrypt prekompilujący surową bazę wiedzy z JSON do skompilowanych tablic NumPy (.npy), co pozwala na natychmiastowy start bota bez ponownego przeliczania wektorów.',
          'Minimalistyczny frontend webowy: Asynchroniczny interfejs PHP i Vanilla JS z zapamiętywaniem trybu ciemnego/jasnego w localStorage.',
        ],
      },
      challenges: {
        en: [
          'Achieving sub-50ms query responses on commodity hardware without relying on expensive GPU clusters.',
          'Tuning similarity confidence thresholds to prevent out-of-domain false positives.',
        ],
        pl: [
          'Osiągnięcie czasów odpowiedzi poniżej 50 ms na standardowym serwerze bez konieczności użycia dedykowanych kart graficznych.',
          'Kalibracja progu odcięcia pewności (threshold), aby bot prawidłowo rozpoznawał pytania wykraczające poza posiadaną bazę wiedzy.',
        ],
      },
      results: {
        en: [
          'Sub-50ms query evaluation delivering accurate semantic answers regardless of phrasing variation.',
          'Robust foundation in neural text representations, vector embeddings, and hybrid web architectures.',
        ],
        pl: [
          'Odpowiedzi w czasie poniżej 50 ms i wysoka trafność bez konieczności wpisywania dokładnych słów kluczowych.',
          'Solidna podbudowa pod wektorowe bazy danych, embeddings oraz architekturę hybrydowych aplikacji AI.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'reptilia',
    title: 'Reptilia',
    shortDescription: {
      en: 'Cross-platform desktop music management and studio distribution application (formerly BetterSpotify) built with Vue.js, Electron, and FastAPI.',
      pl: 'Wieloplatformowa aplikacja desktopowa do zarządzania muzyką i dystrybucji utworów (d. BetterSpotify), łącząca interfejs Vue.js i Electron z lokalnym demonem FastAPI.',
    },
    techStack: ['Vue.js', 'Electron', 'FastAPI', 'Python', 'JavaScript'],
    status: 'Completed',
    team: 'Team',
    backdropAccent: '#312E81',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/Reptilia',
        primary: true,
      },
    ],
    images: [
      '/images/Reptilia/1.png',
      '/images/Reptilia/2.png',
      '/images/Reptilia/3.png',
      '/images/Reptilia/4.png',
    ],
    caseStudy: {
      lead: {
        en: 'Cross-platform desktop music management and studio distribution application (formerly BetterSpotify) built with Vue.js, Electron, and FastAPI for independent audio studios and music fans.',
        pl: 'Wieloplatformowa aplikacja desktopowa do zarządzania muzyką i dystrybucji utworów (d. BetterSpotify), łącząca interfejs Vue.js i Electron z lokalnym demonem FastAPI dla niezależnych studiów i słuchaczy.',
      },
      architecture: {
        en: [
          'Hybrid desktop architecture: Electron runtime housing a reactive Vue.js interface with album grid displays and seamless audio playback transitions.',
          'High-performance local FastAPI backend: Handles file system scanning, ID3 audio metadata extraction, and local streaming pipelines.',
          'Dual-role platform capabilities: Listeners can discover music studios and purchase tracks/albums; studio artists have dedicated publishing workflows to upload and manage their discography.',
        ],
        pl: [
          'Hybrydowa architektura desktopowa: Środowisko Electron z reaktywnym interfejsem Vue.js, płynnymi przejściami siatki albumów i odtwarzaczem audio.',
          'Wydajny lokalny backend FastAPI w Pythonie: Odpowiedzialny za skanowanie dysku, ekstrakcję metadanych ID3 i strumieniowanie dźwięku.',
          'Dwutorowa funkcjonalność: Użytkownicy mogą przeglądać katalog studiów i kupować albumy/utwory; twórcy zrzeszeni w studiach posiadają panel do wgrywania i zarządzania muzyką.',
        ],
      },
      challenges: {
        en: [
          'Ensuring non-blocking audio playback and fluid UI interactions during heavy disk indexing of lossless audio files.',
          'Handling cross-platform file path resolution and permission systems across Windows and Linux.',
        ],
        pl: [
          'Zagwarantowanie płynnego odtwarzania dźwięku bez przycięć interfejsu podczas intensywnego indeksowania biblioteki plików audio.',
          'Obsługa różnic w strukturze ścieżek i uprawnieniach systemowych pomiędzy Windows i Linux.',
        ],
      },
      results: {
        en: [
          'Clean, distraction-free desktop audio storefront and player with instant playback response.',
          'Practical mastery of hybrid desktop architectures blending web technologies with local system services.',
        ],
        pl: [
          'Nowoczesny odtwarzacz i sklep muzyczny z natychmiastowym czasem reakcji.',
          'Doświadczenie w architekturze aplikacji hybrydowych łączących frontendy webowe z lokalnymi usługami systemowymi.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'youtube-but-worst',
    title: 'YouTube-but-worst',
    shortDescription: {
      en: 'Full-stack multimedia streaming prototype exploring distributed chunk serving, HTTP byte-range streaming, and Spring Boot service design.',
      pl: 'Prototyp platformy wideo badający serwowanie strumieni multimedialnych, nagłówki HTTP Byte-Range i architekturę Spring Boot.',
    },
    techStack: ['React', 'Java', 'Spring Boot', 'REST API', 'Video Streaming'],
    status: 'In Progress',
    team: 'Solo',
    backdropAccent: '#831843',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/MiniowaPM-youtube-but-worse-frontend',
        primary: true,
      },
    ],
    images: [
      '/images/YoutubeButWorst/1.png',
      '/images/YoutubeButWorst/2.png',
    ],
    caseStudy: {
      lead: {
        en: 'An educational full-stack prototype exploring the architectural mechanics of video hosting, byte-range streaming, and Spring Boot service design.',
        pl: 'Projekt edukacyjny badający architektoniczne mechanizmy hostowania wideo, strumieniowania zakresów bajtów (byte-range) i architektury Spring Boot.',
      },
      architecture: {
        en: [
          'Spring Boot backend implementing HTTP byte-range request handlers for random-access video playback.',
          'Relational database modeling for user channels, video metadata, comments, and paginated feeds.',
          'React frontend with custom video player controls, dynamic buffering feedback, and thumbnail caching.',
        ],
        pl: [
          'Backend w Spring Boot implementujący obsługę nagłówków HTTP Byte-Range do płynnego przewijania wideo.',
          'Modelowanie relacyjne bazy danych dla kanałów, metadanych filmów, komentarzy i stronicowanych feedów.',
          'Frontend w React z dedykowanym odtwarzaczem, wskaźnikiem buforowania i cachem miniatur.',
        ],
      },
      challenges: {
        en: [
          'Efficient streaming of large media files without saturating server memory buffers.',
          'Synchronizing client playback states with fluctuating network throughput.',
        ],
        pl: [
          'Wydajne serwowanie dużych plików wideo bez przeciążania buforów pamięci serwera.',
          'Płynna obsługa buforowania po stronie klienta przy zmiennej przepustowości łącza.',
        ],
      },
      results: {
        en: [
          'Deep practical understanding of enterprise Java/Spring patterns, media protocols, and modern full-stack workflows.',
          'Modular service architecture prepared for asynchronous transcoding extensions.',
        ],
        pl: [
          'Praktyczne zrozumienie wzorców enterprise w Java/Spring Boot, protokołów mediów i tworzenia aplikacji full-stack.',
          'Modularna architektura usługowa gotowa na rozbudowę o asynchroniczne transkodowanie.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'cryptoapp',
    title: 'CryptoApp',
    shortDescription: {
      en: 'Interactive web-based cryptographic suite visualizing symmetric AES encryption and cryptographic SHA hashing algorithms with ephemeral in-memory processing.',
      pl: 'Interaktywne narzędzie kryptograficzne wizualizujące działanie symetrycznego szyfrowania AES oraz haszowania SHA w locie z przetwarzaniem w pamięci RAM.',
    },
    techStack: ['Python', 'Streamlit', 'Cryptography', 'AES', 'SHA-256'],
    status: 'Completed',
    team: 'Solo',
    backdropAccent: '#14532D',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/CryptoApp',
        primary: true,
      },
      {
        label: 'Live Demo',
        url: 'https://cryptoapp-miniowa.streamlit.app/',
        primary: false,
      },
    ],
    images: [
      '/images/CryptoApp/1.png',
      '/images/CryptoApp/2.png',
    ],
    caseStudy: {
      lead: {
        en: 'An interactive cryptographic education suite deployed live on Streamlit Cloud, visualizing symmetric AES encryption/decryption and SHA hashing algorithms with live parameter adjustments.',
        pl: 'Interaktywne narzędzie edukacyjne wdrożone w chmurze Streamlit, wyjaśniające mechanizmy symetrycznego szyfrowania AES oraz kryptograficznych funkcji skrótu SHA w czasie rzeczywistym.',
      },
      architecture: {
        en: [
          'Symmetric encryption module (AES): Visualizes block cipher mechanics, demonstrating password-based encryption and two-way decryption back to plaintext.',
          'Cryptographic hashing module (SHA): Demonstrates fixed-size digest generation, irreversible one-way functions, and the cryptographic avalanche effect.',
          'In-memory ephemeral processing: Protects sensitive inputs by performing all calculations in memory without permanent disk persistence.',
          'Interactive Streamlit UI: Clean web interface deployed on Streamlit Community Cloud with dynamic sidebar navigation and instant visual computation feedback.',
        ],
        pl: [
          'Moduł szyfrowania symetrycznego (AES): Wizualizuje działanie szyfrów blokowych, umożliwiając szyfrowanie hasłem i dwustronne odszyfrowywanie tekstu.',
          'Moduł funkcji skrótu (SHA): Prezentuje generowanie unikalnych skrótów o stałej długości, jednokierunkowość oraz kryptograficzny efekt lawinowy.',
          'Przetwarzanie ulotne w pamięci RAM: Pełne bezpieczeństwo dzięki wykonywaniu operacji w pamięci bez zapisywania kluczy i tekstów na dysku.',
          'Interaktywny interfejs Streamlit: Aplikacja wdrożona w Streamlit Community Cloud z natychmiastowym feedbackiem obliczeń w przeglądarce.',
        ],
      },
      challenges: {
        en: [
          'Translating rigorous mathematical concepts (keys, initialization vectors, digest properties) into accessible visual representations.',
          'Safe handling of arbitrary user input without unexpected runtime crashes.',
        ],
        pl: [
          'Przełożenie formalnych pojęć matematycznych (wektory inicjalizujące IV, długości kluczy, właściwości skrótów) na intuicyjną reprezentację wizualną.',
          'Bezpieczna obsługa dowolnych ciągów wejściowych wprowadzanych przez użytkowników.',
        ],
      },
      results: {
        en: [
          'Live deployment on Streamlit Cloud serving students and learners worldwide.',
          'Solid practical grasp of cryptographic primitives, entropy, and mathematical security foundations.',
        ],
        pl: [
          'Działające wdrożenie w Streamlit Cloud służące studentom jako pomoc dydaktyczna.',
          'Solidne opanowanie prymitywów kryptograficznych, entropii i matematycznych podstaw bezpieczeństwa.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'matrix-calc',
    title: 'MatrixCalc',
    shortDescription: {
      en: 'Native desktop linear algebra calculator built in C++ with wxWidgets, featuring custom memory layouts, matrix arithmetic, and Gauss-Jordan inversion.',
      pl: 'Natywny desktopowy kalkulator algebry liniowej w C++ z biblioteką wxWidgets, zoptymalizowany pod kątem szybkich operacji macierzowych i eliminacji Gaussa.',
    },
    techStack: ['C++', 'wxWidgets', 'Linear Algebra', 'CMake'],
    status: 'Completed',
    team: 'Solo',
    backdropAccent: '#334155',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/MatrixCalc',
        primary: true,
      },
    ],
    images: [
      '/images/MatrixCalc/1.png',
      '/images/MatrixCalc/2.png',
    ],
    caseStudy: {
      lead: {
        en: 'Cross-platform desktop linear algebra calculator built in C++ with the wxWidgets framework, featuring custom memory layouts and numerical matrix operations.',
        pl: 'Wieloplatformowy desktopowy kalkulator algebry liniowej w C++ z biblioteką wxWidgets, zoptymalizowany pod kątem szybkich operacji macierzowych.',
      },
      architecture: {
        en: [
          'High-performance C++ numerical engine: Implements core arithmetic (addition, subtraction, scalar multiplication) and advanced linear algebra routines (determinants, matrix transposition, Gauss-Jordan matrix inversion).',
          'Native cross-platform graphical interface: Uses wxWidgets 3.x to provide authentic operating system styling across Windows, macOS, and Linux.',
          'Dynamic grid inputs and strict validation: Configurable matrix dimensions with real-time error handling preventing invalid operations on incompatible or singular matrices.',
        ],
        pl: [
          'Wydajny silnik numeryczny C++: Realizuje podstawowe działania (dodawanie, odejmowanie, mnożenie przez skalar) oraz zaawansowane operacje algebry liniowej (wyznacznik, transpozycja, odwracanie macierzy eliminacją Gaussa-Jordana).',
          'Natywny wieloplatformowy interfejs GUI: Wykorzystanie wxWidgets 3.x zapewniające natywny wygląd okien w systemach Windows, macOS i Linux.',
          'Dynamiczne siatki wejściowe i walidacja: Konfigurowalne wymiary macierzy z kontrolą poprawności zapobiegającą błędom przy macierzach osobliwych.',
        ],
      },
      challenges: {
        en: [
          'Handling numerical stability issues and floating-point precision loss during pivot selection.',
          'Ensuring zero memory leaks through strict RAII resource management.',
        ],
        pl: [
          'Utrzymanie stabilności numerycznej i unikanie błędów precyzji zmiennoprzecinkowej przy wyborze elementu osiowego (pivoting).',
          'Rygorystyczna dyscyplina RAII gwarantująca brak wycieków pamięci przy dynamicznych alokacjach.',
        ],
      },
      results: {
        en: [
          'Instantaneous computation times for matrix dimensions up to hundreds of rows/columns.',
          'Deep grounding in lower-level C++ performance tuning, memory alignment, and algorithmic numerical analysis.',
        ],
        pl: [
          'Błyskawiczny czas obliczeń dla macierzy o wymiarach rzędu setek wierszy i kolumn.',
          'Ugruntowana wiedza z zakresu niskopoziomowej optymalizacji w C++, wyrównania pamięci i analizy numerycznej.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'ticket-procurement-bot',
    title: 'TicketMaster — eBilet Sniper',
    shortDescription: {
      en: 'High-speed desktop ticket automation and queue sniper built in Python with Playwright Stealth and CustomTkinter, designed to secure high-demand event tickets upon release.',
      pl: 'Desktopowy bot automatyzujący zakupy biletowe (eBilet Sniper) stworzony w Pythonie z użyciem Playwright Stealth i CustomTkinter, zaprojektowany do błyskawicznej rezerwacji miejsc w momencie startu sprzedaży.',
    },
    techStack: [
      'Python',
      'Playwright',
      'playwright-stealth',
      'CustomTkinter',
      'Pydantic',
      'Threading',
    ],
    status: 'Completed',
    team: 'Solo',
    backdropAccent: '#1F2937',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/TicketMaster',
        primary: true,
      },
    ],
    images: [
      '/images/TicketMaster/1.png',
      '/images/TicketMaster/2.png',
      '/images/TicketMaster/3.png',
    ],
    caseStudy: {
      lead: {
        en: 'High-speed desktop ticket automation and queue sniper (eBilet Sniper) built in Python with Playwright Stealth and CustomTkinter, designed to level the playing field during high-demand event ticket releases.',
        pl: 'Desktopowy bot automatyzujący zakupy biletowe (eBilet Sniper) stworzony w Pythonie z użyciem Playwright Stealth i CustomTkinter, zaprojektowany do błyskawicznej rezerwacji miejsc w momencie startu sprzedaży.',
      },
      architecture: {
        en: [
          'Clean desktop MVC architecture: CustomTkinter dark-mode interface cleanly isolated from core automation services, using asynchronous background worker threads to keep the UI fluid.',
          'Playwright automation with stealth evasion: Utilizes playwright-stealth to bypass bot detection fingerprinting during critical OAuth authentication and checkout flows.',
          'Continuous session snapshotting: Injects custom JavaScript hooks to monitor and snapshot authenticated session cookies every second, preventing data loss during traffic spikes.',
          'Dynamic seat targeting & Canvas fallback: Supports granular price-tier filtering (cheapest, VIP, grab anything) and includes an automated fallback to interact directly with complex HTML5 Canvas seat maps when standard DOM buttons are missing.',
          'Thread-safe global logging queue: Live streams application operations and network response codes directly into the desktop console.',
        ],
        pl: [
          'Architektura desktopowa MVC: Nowoczesny interfejs CustomTkinter w trybie ciemnym odseparowany od logiki automatyzacji, z asynchronicznymi wątkami roboczymi zapobiegającymi zacinaniu UI.',
          'Silnik Playwright z trybem Stealth: Wykorzystanie playwright-stealth do omijania detekcji botów podczas logowania OAuth i etapów płatności.',
          'Ciągłe snapshotowanie sesji: Wstrzykiwanie skryptów JS monitorujących i utrwalających ciasteczka sesyjne co 1 sekundę, zabezpieczając stan koszyka przed restartem.',
          'Celowanie strefowe i obsługa Canvas: Filtrowanie miejsc według preferencji cenowych (najtańsze, VIP, dowolne) oraz automatyczny fallback do interakcji z mapami Canvas HTML5.',
          'Wielowątkowa kolejka logowania: Strumieniowanie logów sieciowych i operacji w czasie rzeczywistym bezpośrednio do konsoli w oknie aplikacji.',
        ],
      },
      challenges: {
        en: [
          'Bypassing aggressive rate-limiting and browser fingerprinting challenges without sacrificing sub-second detection intervals.',
          'Programmatically identifying and clicking available seat coordinates rendered on interactive HTML5 Canvas elements.',
        ],
        pl: [
          'Omijanie rygorystycznych zabezpieczeń antybotowych i fingerprintingu przeglądarki przy zachowaniu milisekundowych interwałów sprawdzania dostępności.',
          'Programistyczna identyfikacja i klikanie w wolne miejsca rysowane na interaktywnym elemencie Canvas HTML5.',
        ],
      },
      results: {
        en: [
          'Sub-second notification alerts and automated cart reservation allowing reliable acquisition of sold-out event seats.',
          'Mastery of headless web automation, network inspection, and robust scraping design.',
        ],
        pl: [
          'Błyskawiczne powiadomienia w ułamku sekundy i automatyczna rezerwacja koszyka umożliwiająca zakup biletów na wyprzedane wydarzenia.',
          'Doświadczenie w automatyzacji przeglądarek headless, inspekcji ruchu sieciowego i odpornym scrapingu.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'vat-sentinel',
    title: 'VAT-Sentinel — RegTech Graph Engine',
    shortDescription: {
      en: 'High-performance financial anomaly and VAT carousel fraud detection engine built in C++17 with in-memory graph analysis and live Polish government API enrichment.',
      pl: 'Wysokowydajny silnik wykrywania anomalii finansowych i karuzel VAT w C++17 z grafową analizą w pamięci i integracją z API Białej Listy VAT MF oraz KRS.',
    },
    techStack: [
      'C++17',
      'Graph Theory',
      'DFS',
      'CMake',
      'REST API',
      'RegTech',
    ],
    status: 'Completed',
    team: 'Solo',
    backdropAccent: '#0F172A',
    links: [
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/VAT-Sentinel',
        primary: true,
      },
    ],
    images: [],
    caseStudy: {
      lead: {
        en: 'A high-performance C++17 RegTech engine engineered to detect financial transaction anomalies, money laundering, and VAT carousel tax fraud using in-memory graph theory and live government API enrichment.',
        pl: 'Wysokowydajny silnik RegTech w C++17 zaprojektowany do wykrywania anomalii transakcyjnych, prania pieniędzy i karuzel VAT z wykorzystaniem teorii grafów w pamięci RAM i integracji z rejestrami państwowymi.',
      },
      architecture: {
        en: [
          'In-memory financial graph engine: Models multi-entity transaction networks using an optimized Adjacency List (std::unordered_map) connecting Company nodes with Transaction edges.',
          'Cycle detection algorithm: Implements custom Depth-First Search (DFS) graph traversals to uncover closed-loop transaction chains characteristic of VAT carousel schemes.',
          'OSINT Government API enrichment: Live HTTP integrations with the Polish Ministry of Finance (Biała Lista VAT) and Ministry of Justice (KRS) to verify tax statuses, share capital, and board composition.',
          'High-throughput data parsing: Custom CSV ingestion parser capable of loading and mapping tens of thousands of synthetic AML transaction records in milliseconds.',
        ],
        pl: [
          'Silnik grafowy w pamięci RAM: Modeluje sieci transakcyjne przy użyciu zoptymalizowanej listy sąsiedztwa (std::unordered_map) łączącej węzły Company z krawędziami Transaction.',
          'Algorytm wykrywania cykli: Dedykowane przeszukiwanie grafu w głąb (DFS) identyfikujące zamknięte pętle transakcyjne charakterystyczne dla mechanizmów karuzelowych VAT.',
          'Wzbogacanie danych z rejestrów państwowych: Integracje HTTP na żywo z API Ministerstwa Finansów (Biała Lista VAT) oraz Ministerstwa Sprawiedliwości (KRS) badające status VAT, kapitał i zarządy.',
          'Szybki parser danych: Dedykowany moduł odczytu CSV wczytujący i mapujący dziesiątki tysięcy rekordów transakcji finansowych w ułamku sekundy.',
        ],
      },
      challenges: {
        en: [
          'Optimizing memory layouts to prevent cache misses during high-frequency graph traversals on massive transaction datasets.',
          'Resilient handling of government API rate limits, timeouts, and malformed payload schemas without breaking analysis runs.',
        ],
        pl: [
          'Optymalizacja struktur pamięciowych pod kątem unikania nietrafień w pamięć podręczną (cache misses) przy intensywnym przeszukiwaniu grafu.',
          'Odporna obsługa limitów zapytań i przerw w działaniu zewnętrznych rządowych API bez przerywania analizy całego zbioru.',
        ],
      },
      results: {
        en: [
          'Delivered sub-second identification of circular financial transaction loops across synthetic datasets.',
          'Practical mastery of modern C++17 engineering, graph algorithms, and RegTech fraud-prevention architecture.',
        ],
        pl: [
          'Błyskawiczna identyfikacja zamkniętych pętli finansowych na syntetycznych zbiorach transakcji.',
          'Praktyczne opanowanie inżynierii nowoczesnego C++17, algorytmów grafowych i architektury systemów RegTech przeciwdziałających nadużyciom.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
];

export const GRID_PROJECTS: ArchiveProject[] = [
  {
    slug: 'hubmi',
    title: 'hubmi.pl — Social Innovation Platform',
    description: {
      en: 'Social innovation matching platform created at HackYeah 2026 (score 7.35/10), featuring AI grant drafting and regional needs mapping.',
      pl: 'Platforma innowacji społecznych stworzona na HackYeah 2026 (ocena jury 7.35/10), z asystentem wniosków grantowych AI i mapą potrzeb.',
    },
    techStack: ['React', 'FastAPI', 'OpenAI', 'Tailwind CSS', 'Python'],
    status: 'Completed',
    team: 'Team',
    links: [
      {
        label: 'Case Study',
        url: '/projects/hubmi',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MasterSun8/hubmi.pl',
        primary: false,
      },
    ],
  },
  {
    slug: 'navigator-pm',
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
        label: 'Case Study',
        url: '/projects/navigator-pm',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/KNI-PM-Szczecin/NavigatorPM',
        primary: false,
      },
    ],
  },
  {
    slug: 'vat-sentinel',
    title: 'VAT-Sentinel — RegTech Graph Engine',
    description: {
      en: 'High-performance financial anomaly and VAT carousel fraud detection engine built in C++17 with in-memory graph analysis and live Polish government API enrichment.',
      pl: 'Wysokowydajny silnik wykrywania anomalii finansowych i karuzel VAT w C++17 z grafową analizą w pamięci i integracją z API Białej Listy VAT MF oraz KRS.',
    },
    techStack: ['C++17', 'Graph Theory', 'DFS', 'CMake', 'RegTech'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'Case Study',
        url: '/projects/vat-sentinel',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/VAT-Sentinel',
        primary: false,
      },
    ],
  },
  {
    slug: 'maritime-autonomous-simulator',
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
        label: 'Case Study',
        url: '/projects/maritime-autonomous-simulator',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/JakubLopyta/ship-simulator',
        primary: false,
      },
    ],
  },
  {
    slug: 'latwa-ustawa',
    title: 'ŁatwaUstawa',
    description: {
      en: 'Civic-tech mobile application democratizing Polish parliamentary legislation with AI summaries and citizen feeds, developed for HackNation 2025.',
      pl: 'Aplikacja civic-tech demokratyzująca polskie prawo i ustawy sejmowe przy użyciu AI, stworzona podczas hackathonu HackNation 2025.',
    },
    techStack: ['Flutter', 'FastAPI', 'DeepSeek', 'Sejm REST API'],
    status: 'Completed',
    team: 'Team',
    links: [
      {
        label: 'Case Study',
        url: '/projects/latwa-ustawa',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/Schoji/LatwaUstawa',
        primary: false,
      },
    ],
  },
  {
    slug: 'edek-chatbot',
    title: 'E.D.E.K. ChatBot',
    description: {
      en: 'Question answering assistant leveraging semantic vector search (Sentence Transformers) with a lightweight Flask backend and zero-cold-start caching.',
      pl: 'Asystent pytań i odpowiedzi oparty na wyszukiwaniu semantycznym (Sentence Transformers) z backendem Flask i buforowaniem wektorów.',
    },
    techStack: ['Python', 'Flask', 'NLP', 'Sentence Transformers'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'Case Study',
        url: '/projects/edek-chatbot',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/ChatBotMini',
        primary: false,
      },
    ],
  },
  {
    slug: 'reptilia',
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
        label: 'Case Study',
        url: '/projects/reptilia',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/Reptilia',
        primary: false,
      },
    ],
  },
  {
    slug: 'youtube-but-worst',
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
        label: 'Case Study',
        url: '/projects/youtube-but-worst',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/MiniowaPM-youtube-but-worse-frontend',
        primary: false,
      },
    ],
  },
  {
    slug: 'cryptoapp',
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
        label: 'Case Study',
        url: '/projects/cryptoapp',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/CryptoApp',
        primary: false,
      },
      {
        label: 'Live Demo',
        url: 'https://cryptoapp-miniowa.streamlit.app/',
        primary: false,
      },
    ],
  },
  {
    slug: 'matrix-calc',
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
        label: 'Case Study',
        url: '/projects/matrix-calc',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/MatrixCalc',
        primary: false,
      },
    ],
  },
  {
    slug: 'ticket-procurement-bot',
    title: 'TicketMaster — eBilet Sniper',
    description: {
      en: 'High-speed automated monitoring and queue notification script for ticketing systems with headless browser automation.',
      pl: 'Zautomatyzowany skrypt monitorujący kolejki biletowe w czasie rzeczywistym z powiadomieniami o dostępności miejsc.',
    },
    techStack: ['Python', 'Automation', 'Playwright'],
    status: 'Completed',
    team: 'Solo',
    links: [
      {
        label: 'Case Study',
        url: '/projects/ticket-procurement-bot',
        primary: true,
      },
      {
        label: 'GitHub',
        url: 'https://github.com/MiniowaPM/TicketMaster',
        primary: false,
      },
    ],
  },
];
