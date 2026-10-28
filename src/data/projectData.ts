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
      en: 'Physically based real-time ocean simulation engine engineered as a Bachelor thesis in Unity, featuring GPGPU 2D IFFT wave synthesis, spectral cascades, Jacobian foam dynamics, and adaptive GPU tessellation.',
      pl: 'Fotorealistyczny silnik symulacji oceanu czasu rzeczywistego zrealizowany w ramach pracy inżynierskiej w Unity, oparty na obliczeniach GPGPU IFFT, kaskadach widmowych, dynamice piany wyznaczanej Jakobianem i adaptacyjnej teselacji siatki.',
    },
    techStack: ['Unity', 'C#', 'HLSL', 'Compute Shaders', 'GPGPU', 'IFFT', 'Oceanography'],
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
        en: 'Bachelor of Engineering thesis project focused on state-of-the-art real-time ocean wave synthesis and photorealistic maritime rendering. Moving beyond simplified Gerstner wave models, the system implements oceanographic statistical wave spectra evaluated via GPU-accelerated 2D Inverse Fast Fourier Transform (IFFT), multi-scale cascades, and advanced optical transport.',
        pl: 'Projekt pracy inżynierskiej poświęcony syntezie fal morskich i fotorealistycznemu renderowaniu oceanu w czasie rzeczywistym. Wychodząc poza uproszczone sumowanie fal Gerstnera, system implementuje statystyczne modele oceanograficzne przeliczane za pomocą Odwrotnej Szybkiej Transformaty Fouriera (IFFT) na Compute Shaderach GPU, wieloskalowe kaskady widmowe oraz zaawansowaną optykę wody.',
      },
      architecture: {
        en: [
          'GPGPU IFFT Wave Synthesis: Implements statistical ocean wave spectra (Phillips and Pierson-Moskowitz) evaluated in the frequency domain with Gaussian random numbers (Box-Muller) and deep-water dispersion relations, resolved using a multi-pass 2D IFFT running entirely on HLSL Compute Shaders to generate height and horizontal choppy displacement maps.',
          'Multi-Cascade Scale & LOD Management: Solves repeating grid artifacts (tiling) across infinite open-water horizons by decoupling wave spectra into multiple spatial cascades (high-frequency ripples to long swells) alongside distance-based adaptive mesh tessellation.',
          'Trochoidal Choppy Displacement & Geometry: Applies horizontal displacement vectors to deform vertex grids into sharp trochoidal crests and wide troughs, dynamically adjusting surface tessellation density based on screen-space camera distance.',
          'Advanced Marine Optical Shading: Combines Schlick-Fresnel reflection and refraction, environmental cubemaps, Beer-Lambert volumetric depth light absorption, and subsurface scattering (SSS) to simulate translucent emerald-green crest backlighting.',
          'Jacobian-Driven Foam Accumulation: Calculates the negative Jacobian determinant of the displacement field in real time to detect self-intersecting, collapsing wave crests, dynamically spawning and dissipating photorealistic foam trails.',
        ],
        pl: [
          'Synteza fal IFFT na Compute Shaderach GPGPU: Implementacja statystycznych widm oceanograficznych (Phillips, Pierson-Moskowitz) w dziedzinie częstotliwości z generatorem liczb pseudolosowych Gaussa (Box-Muller) i relacją dyspersji na głębokiej wodzie, rozwiązywanych dwuwymiarowym algorytmem IFFT w HLSL bezpośrednio na karcie graficznej.',
          'Wieloskalowy system kaskad i eliminacja kafelkowania (Tiling): Rozwiązanie problemu powtarzalności siatki na otwartym oceanie poprzez rozbicie widma fal na niezależne kaskady przestrzenne (od drobnych fal kapilarnych po potężne fale oceaniczne) sprzężone z adaptacyjną teselacją siatki zależną od dystansu do kamery.',
          'Fale czopowe (Choppy Waves) i dynamiczna teselacja: Aplikowanie wektorów przemieszczeń poziomych przekształcających regularną siatkę w ostre, asymetryczne grzbiety trochoidalne i szerokie doliny, z dynamicznym zagęszczaniem geometrii w oparciu o odległość od kamery.',
          'Zaawansowany model optyki PBR i rozpraszanie podpowierzchniowe (SSS): Integracja równań Fresnela z aproksymacją Schlicka, odbić środowiskowych, refrakcji, absorpcji światła prawem Beera-Lamberta oraz rozpraszania podpowierzchniowego symulującego prześwietlanie szmaragdowych grzbietów fal pod słońce.',
          'Kinematyka piany oceanicznej na podstawie wyznacznika Jakobianu: Obliczanie w czasie rzeczywistym ujemnego Jakobianu pola przemieszczeń w celu detekcji samozapętlenia i załamywania się fal, co pozwala na generowanie i zanikanie dynamicznej, proceduralnej piany na grzbietach.',
        ],
      },
      challenges: {
        en: [
          'GPGPU 2D IFFT Pipeline Architecture: Designing and optimizing a parallel multi-pass Radix-2 IFFT entirely within HLSL compute shaders, managing threadgroup shared memory, ping-pong render targets, and bit-reversal sorting without causing GPU pipeline stalls or driver timeouts.',
          'Eliminating Periodic Tiling via Multi-Cascade Blending: Single-grid FFT oceans suffer from glaring, repetitive pattern tiling over ocean-scale horizons. Overcoming this required engineering independent spectral cascades across multiple spatial wavelengths and smoothly interpolating between LOD boundaries.',
          'Analytical Wave-Crest Breaking Detection: Accurately generating ocean foam without costly full Navier-Stokes fluid simulations demanded evaluating the Jacobian determinant of the displacement field at runtime, detecting mathematical folding and computing physical persistence decay curves.',
          'High-Fidelity Optical Transport on a 60+ FPS Budget: Integrating multi-cascade displacement sampling, analytic normal recalculation, Subsurface Scattering (SSS), Schlick-Fresnel, and dynamic foam into a single unified pass while preserving a rock-solid 60+ FPS performance target.',
        ],
        pl: [
          'Implementacja dwuwymiarowego IFFT na Compute Shaderach: Zaprojektowanie i optymalizacja wieloprzebiegowego algorytmu Radix-2 IFFT w HLSL, z zarządzaniem pamięcią współdzieloną grup wątków (threadgroups), teksturami buforowymi typu ping-pong i permutacją bitową (bit-reversal) przy zachowaniu pełnej płynności GPU.',
          'Eliminacja kafelkowania (Tiling) i płynne łączenie kaskad: Pojedyncza siatka FFT cierpi na widoczne, powtarzalne wzorce na rozległym horyzoncie. Rozwiązaniem było zaimplementowanie niezależnych kaskad widmowych o różnych długościach fal i ich bezszwowe stapianie wraz z oddalaniem się kamery.',
          'Matematyczna detekcja załamywania fal Jakobianem: Wiarygodne generowanie piany bez kosztownej symulacji dynamiki płynów Navier-Stokesa wymagało analitycznego wyznaczania wyznacznika Jakobianu pola przemieszczeń, wychwytywania momentu załamania fali i fizycznego rozpraszania piany.',
          'Złożoność optyczna a rygorystyczny budżet 60+ FPS: Połączenie wielokrotnego próbkowania kaskad, analitycznego przeliczania wektorów normalnych, rozpraszania podpowierzchniowego (SSS), Fresnela i dynamicznej piany w spójnym potoku renderowania przy gwarancji stabilnych 60+ FPS.',
        ],
      },
      results: {
        en: [
          'Production-Grade Real-Time Ocean Engine: Engineered a physically plausible, photorealistic ocean simulation inside Unity, successfully supporting dynamic sea states, stormy ocean spectra, and vast horizon scales.',
          'Mastery of GPGPU Compute Pipelines & Ocean Physics: Gained rigorous theoretical and practical mastery of frequency-domain oceanography, 2D IFFT transformations, HLSL compute shaders, and modern real-time rendering techniques.',
          'Hydrodynamic Foundation for Autonomous Ship Testing: The finished simulation serves as an operational testbed and cornerstone for maritime research, providing accurate water heights and surface normals for buoyancy, hydrodynamic resistance, and autonomous ship navigation.',
        ],
        pl: [
          'Kompletny, fotorealistyczny silnik oceaniczny: Stworzono fizycznie wiarygodny system symulacji oceanu w czasie rzeczywistym w Unity, wiernie oddający stany morza, sztormowe widma falowe i nieskończony horyzont wodny.',
          'Biegłość w potokach GPGPU, shaderach HLSL i matematyce oceanograficznej: Zdobyto dogłębną wiedzę z zakresu transformacji Fouriera, programowania obliczeń ogólnego przeznaczenia na GPU, optyki PBR i modelowania zjawisk fizycznych w grafice komputerowej.',
          'Solidny fundament pod symulatory morskie i badania autonomii: Ukończona symulacja stanowi gotowe środowisko hydrodynamiczne, dostarczając precyzyjne próbkowanie wysokości fal i wektorów normalnych do obliczeń wyporności i testowania algorytmów autonomicznych jednostek pływających.',
        ],
      },
      relatedTeamPhotos: [],
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
          '4-Stage Automated Scraping Pipeline: Mapper (HTTP schedule ID discovery) → Scrapper (POST fetching from Virtual Dean’s Office) → Parser (normalization, deduplication, faculty/room extraction) → json2db (relational Supabase Postgres upserts).',
          'Autonomous Structure Updater: Developed the structure_updater subsystem that autonomously monitors and refreshes university organizational hierarchies across Faculties, Degree Courses, and Specialisations.',
          'Flask Administration & Telemetry Panel: Built an internal Flask administration panel featuring real-time scraping execution logs, in-app university announcement authoring, store telemetry, and environment switching.',
          'Model Context Protocol (MCP) Server: Architected database integration via MCP exposing query endpoints and schema management tools to AI agents.',
          'Cross-Platform Flutter & Native Widgets: Developed the client in Flutter/Dart with native home screen widgets in three sizes (iOS WidgetKit in Swift and Android AppWidget), daily and weekly views, dedicated Lecturer Mode, and 3-language localization (PL, EN, UA).',
        ],
        pl: [
          '4-etapowy potok automatycznego scrapingu: Mapper (odkrywanie aktywnych ID) → Scrapper (pobieranie POST z Wirtualnego Dziekanatu) → Parser (normalizacja, deduplikacja, wyodrębnianie sal i wykładowców) → json2db (upsert do Supabase Postgres).',
          'Automatyczna synchronizacja struktury: Zaprojektowano moduł structure_updater automatycznie monitorujący i odświeżający hierarchię uczelnianą (Wydziały → Kierunki studiów → Specjalności).',
          'Panel administracyjny we Flasku: Zbudowano wewnętrzny panel z podglądem logów scrapingu na żywo, modułem ogłoszeń uczelnianych, statystykami pobrań i przełączaniem środowisk.',
          'Integracja z serwerem MCP dla AI: Wdrożono połączenie bazy danych z protokołem Model Context Protocol, udostępniającym schemat i zapytania jako narzędzia dla agentów AI.',
          'Aplikacja Flutter i natywne widgety: Rozwinięto aplikację mobilną z natywnymi widgetami ekranu domowego w 3 rozmiarach (iOS WidgetKit w Swift, Android AppWidget), widokami dziennymi i tygodniowymi, trybem wykładowcy oraz obsługą 3 języków (PL, EN, UA).',
        ],
      },
      challenges: {
        en: [
          'Brittle Legacy HTML Parsing: Parsing unstructured HTML tables from legacy Dean’s Office software and defending against unannounced layout shifts without client desynchronization.',
          'Institutional & GDPR Compliance Pushback: University administration initially ordered the application to be pulled from app stores over data privacy concerns regarding faculty and student information. Resolving this required formal negotiations with academic leadership, a thorough legal audit, and aligning data practices with GDPR standards to keep the app published.',
          'Triaging Vague User Bug Reports: Users frequently reported ambiguous issues (e.g. “it doesn’t work” without stating screen, program, or context), requiring the implementation of structured diagnostic logging and telemetry to identify hidden bugs without collecting sensitive user data.',
          'Multi-Platform Offline Synchronization: Managing robust offline caching and background synchronization states across aggressive iOS and Android battery-saver sleep modes.',
        ],
        pl: [
          'Odporność parsera na niestrukturalny HTML: Ciągła obrona parsera przed nagłymi zmianami formatowania tabel HTML w starszych systemach Wirtualnego Dziekanatu bez desynchronizacji klientów.',
          'Presja formalno-prawna i RODO od władz uczelni: Po premierze administracja uczelniana zażądała wycofania aplikacji ze sklepów z obawy o kwestie danych osobowych (RODO). Wymusiło to wejście w oficjalne negocjacje z władzami akademickimi, audyt prawny i wdrożenie restrykcyjnej polityki prywatności, co pozwoliło na oficjalne utrzymanie aplikacji w App Store i Google Play.',
          'Analiza niejednoznacznego feedbacku użytkowników: Użytkownicy masowo zgłaszali usterki w bardzo lakoniczny lub enigmatyczny sposób (np. „coś nie działa”, bez wskazania widoku czy kierunku). Wymusiło to stworzenie systemu szczegółowego logowania diagnostycznego i telemetrii, by precyzyjnie namierzać błędy bez naruszania prywatności studentów.',
          'Niezawodny cache offline i synchronizacja: Prawidłowa obsługa wieloplatformowego cache’owania offline i synchronizacji w tle na iOS i Androidzie przy restrykcyjnych trybach oszczędzania energii.',
        ],
      },
      results: {
        en: [
          'Achieved over 1,000 downloads with enthusiastic reception and daily active use across the academic community.',
          'Maintained high availability, sub-second sync times, and reliable daily schedule updates for thousands of students and faculty members.',
          'Established an active open-source academic ecosystem maintained by Koło Naukowe Informatyki (KNI).',
          'Institutional Dialogue & Future Funding: The project opened direct communication channels between the KNI scientific club and university leadership, earning institutional trust and paving the way for larger budget allocations and backing for future student initiatives.',
        ],
        pl: [
          'Ponad 1000 pobrań oraz codzienne, aktywne wykorzystanie przez społeczność akademicką i kadrę Politechniki Morskiej.',
          'Wysoka bezawaryjność, subsekundowe czasy synchronizacji oraz zautomatyzowane potoki CI/CD do wydań w Google Play i Apple App Store.',
          'Stworzenie trwałego akademickiego ekosystemu open-source rozwijanego w ramach Koła Naukowego Informatyki (KNI).',
          'Otwarcie dialogu z władzami uczelni i budżety: Sukces PlanPM otworzył kołu KNI bezpośrednie drzwi do rozmów z władzami akademickimi, budując wysokie zaufanie i torując drogę do większych środków finansowych na kolejne projekty technologiczne.',
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
      '/images/WorldOfDrones/4.jpg',
      '/images/WorldOfDrones/5.jpg',
      '/images/WorldOfDrones/6.jpg',
      '/images/WorldOfDrones/8.jpg',
    ],
    caseStudy: {
      lead: {
        en: 'End-to-end industrial IoT autonomous drone system engineered within a 12-person cross-functional team during the GlobalLogic summer engineering internship, spanning corporate workflow training, hardware budgeting, 3D landing pad prototyping, telemetry web client, and Edge AI deployment.',
        pl: 'Kompleksowy system przemysłowego IoT zrealizowany w 12-osobowym zespole podczas stażu inżynierskiego GlobalLogic. Projekt łączył fazę szkoleń korporacyjnych, kosztorysowanie sprzętu, prototypowanie obudów i lądowiska 3D, frontend telemetryczny oraz wdrożenie modeli Edge AI.',
      },
      architecture: {
        en: [
          'Custom 3D Enclosure & PVC Landing Pad: Designed and 3D-printed a custom bottom drone enclosure for edge compute hardware. When ground-clearance testing showed a risk of landing damage, engineered a dedicated landing pad constructed from PVC pipes and custom 3D-printed modular joints to protect onboard sensors and batteries.',
          'React Telemetry Interface & Jenkins CI/CD: Developed the operator dashboard providing real-time low-latency video streaming and drone telemetry metrics, integrating deployment automation into an enterprise Jenkins pipeline managed by the DevOps team.',
          'Edge AI Computer Vision (Nano AI): Assisted in finalizing and tuning lightweight aerial object detection models optimized for power-constrained edge compute boards (Raspberry Pi & STM32).',
          'Asynchronous FastAPI Backend & Cross-Module Triage: Bridged edge hardware data streams with the FastAPI backend, assisting the backend team in resolving network bottlenecks and stabilizing data exchange ahead of deployment deadlines.',
        ],
        pl: [
          'Druk 3D obudowy i lądowisko z rur PCV: Zaprojektowano i wydrukowano w 3D dolną obudowę drona na elektronikę. Gdy testy wykazały ryzyko jej uszkodzenia podczas przyziemienia, skonstruowano dedykowany landing pad z rurek PCV oraz autorskich łączników drukowanych w 3D, zabezpieczający sensory i akumulatory.',
          'Frontend telemetryczny w React i Jenkins CI/CD: Opracowano panel dyspozytorski prezentujący na żywo strumień wideo z drona oraz parametry telemetryczne lotu, a także zintegrowano potok automatycznych wydań z serwerem Jenkins zarządzanym przez zespół DevOps.',
          'Modele wizji komputerowej Edge AI (Nano AI): Wsparcie w finalizacji i optymalizacji lekkich modeli detekcji obiektów dostosowanych do układów brzegowych o niskim poborze mocy (Raspberry Pi & STM32).',
          'Asynchroniczny backend FastAPI i domykanie modułów: Połączenie warstwy brzegowej z serwisem FastAPI, wsparcie zespołu backendowego w usuwaniu wąskich gardeł sieciowych oraz stabilizacji wymiany danych pod zbliżający się deadline.',
        ],
      },
      challenges: {
        en: [
          'Coordination & Workflow Scale across a 12-Person Team: In a large cross-functional team, coordinating parallel work across hardware, computer vision, backend, frontend, and DevOps demanded rigorous discipline, meticulous documentation, and strict adherence to corporate communication standards.',
          'Rapid Hardware Adaptation & Ground Clearance: Early landing tests revealed the underside 3D enclosure risked severe damage during touchdown. The team had to quickly pivot and engineer a physical landing pad using PVC tubing and custom 3D-printed joints within tight timeframe constraints.',
          'Deadline Risk Management & Integration Bottlenecks: As the deadline approached, multiple unforeseen integration bugs surfaced between software and hardware. The team succeeded thanks to proactive risk planning—budgeting a safety buffer under the assumption that "things will go wrong"—enabling rapid cross-team debugging.',
        ],
        pl: [
          'Workflow i dyscyplina w 12-osobowym zespole: W dużym, interdyscyplinarnym zespole skoordynowanie równoległych prac nad hardwarem, AI, backendem, frontendem i DevOps wymagało żelaznej konsekwencji, rygorystycznego dokumentowania kodu i procesów oraz regularnej synchronizacji w standardach korporacyjnych.',
          'Nieoczekiwana kolizja obudowy przy lądowaniu: Po wydrukowaniu dolnej obudowy okazało się, że mały prześwit grozi zniszczeniem elektroniki przy lądowaniu. Zespół musiał szybko przeprojektować koncepcję i w krótkim czasie wykonać stabilną stację lądującą z rur PCV i drukowanych łączników.',
          'Zarządzanie ryzykiem i kumulacja błędów przed deadlinem: Na finiszu projektu, przy zbliżającym się terminie oddania, pojawiły się liczne nieprzewidziane błędy integracyjne między modułami. Projekt uratowało wcześniejsze założenie marginesu bezpieczeństwa („coś na pewno pójdzie nie tak”) oraz wspólny sprint naprawczy z zespołem backendu i AI.',
        ],
      },
      results: {
        en: [
          'Enterprise Engineering Onboarding & Budgeting: Completed a comprehensive month-long onboarding in corporate communication and enterprise tools, conducting physical hardware cost estimation (BOM) and architecting system work-breakdown structures from scratch.',
          'Live Drone Showcase & Management Presentation: Successfully executed a live demonstration of autonomous flight and real-time aerial detection, culminating in a professional technical presentation delivered to GlobalLogic engineering leadership.',
          'Full-Spectrum Cross-Disciplinary Delivery: Hands-on experience bridging 3D rapid prototyping, web frontend, Edge AI integration, and cross-team collaboration with backend and DevOps specialists under commercial schedule constraints.',
        ],
        pl: [
          'Praktyczna szkoła inżynierii korporacyjnej: Niemal miesięczny cykl szkoleń z narzędzi firmowych i komunikacji korporacyjnej, tworzenie realnego kosztorysu sprzętu (BOM) oraz projektowanie architektury i podziału zadań (WBS) od podstaw.',
          'Pomyślny showcase i demonstracja dla zarządu: Przeprowadzenie bezbłędnej demonstracji autonomicznego lotu drona z detekcją obiektów na żywo oraz przygotowanie profesjonalnej prezentacji technicznej dla inżynierów i kierownictwa GlobalLogic.',
          'Elastyczność w pełnym cyklu wytwórczym: Doświadczenie w łączeniu druku 3D i mechaniki, frontendu webowego, modeli Edge AI oraz współpracy z zespołami backendu i DevOps pod rygorem komercyjnego harmonogramu.',
        ],
      },
      relatedTeamPhotos: [
        '/images/WorldOfDrones/3.jpg',
        '/images/WorldOfDrones/7.jpg',
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
          'Zero-Latency In-Memory Data Engine: Entire campus topological grid is loaded from map.json directly into Next.js server RAM on boot, indexed into O(1) hash maps (mapStore.ts), achieving sub-millisecond API response times without relational database overhead.',
          'Client-Side Graph Routing: Complete Dijkstra pathfinding computations run directly in the user’s mobile browser, eliminating backend routing bottlenecks.',
          'Instant QR Code Localization: Physical QR stickers placed across university hallways allow students to scan and instantly initialize their coordinates and floor map (/api/qr/[id]).',
          'Accessibility Routing (Tryb Dostępności): Dedicated algorithmic weight modifier calculating barrier-free transit paths that bypass staircases and prioritize elevator access for wheelchair users and mobility-impaired individuals.',
          'Multi-Floor Transition Handling: Seamless routing across levels and interconnected university building wings with automated vector SVG floor plan switching.',
          'Multi-Lingual Localization: Native multi-lingual room labeling, search indexes, and wayfinding instructions in Polish, English, and Ukrainian.',
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
          'Unexpected Student Market Competition: Barely a month before our scheduled rollout, another student released a hurried, basic transit app that temporarily captured academic attention. Rather than sacrificing engineering standards, the NavigatorPM team maintained focus on delivering a superior product with client-side Dijkstra pathfinding, zero-latency in-memory data structures, full accessibility modes, and physical QR codes.',
          'Institutional Friction & Internal Project Politics: University administration met the initiative with skepticism because they were concurrently developing an in-house virtual tour project ("Spacerek po Politechnice") and resisted student-led initiatives competing for campus visibility. Navigating this required strategic stakeholder diplomacy, demonstrating that NavigatorPM serves everyday transit and accessibility rather than competing with promotional virtual tours.',
          'Multi-Floor Transitions & Historical Campus Topology: Accurately modeling vertical transit paths (stairwells, elevators) and real-world walking penalties across interconnected, multi-level heritage building wings without disorienting mobile users.',
        ],
        pl: [
          'Niespodziewana konkurencja studencka: Zaledwie miesiąc przed naszym planowanym wdrożeniem inny student opublikował prostą, pospiesznie przygotowaną aplikację nawigacyjną, która zebrała początkową uwagę społeczności akademickiej. Zamiast iść na kompromisy jakościowe, zespół NavigatorPM postawił na bezkonkurencyjną architekturę zero-latency, graf Dijkstry po stronie klienta, tryb dostępności dla osób z niepełnosprawnościami i kody QR, budując produkt o nieporównywalnie wyższej kulturze inżynierskiej.',
          'Opór administracji uczelnianej i konflikt projektów: Władze akademickie podchodziły do NavigatorPM z rezerwą, ponieważ równolegle rozwijały własny, oficjalny projekt wirtualnego spaceru („Spacerek po Politechnice”) i obawiały się kanibalizacji uwagi oraz rywalizacji z oddolną inicjatywą koła naukowego. Wymagało to ostrożnej dyplomacji, edukacji decydentów i pozycjonowania NavigatorPM jako funkcjonalnego narzędzia tranzytowego, a nie konkurencji PR-owej.',
          'Nieliniowa topologia historycznych skrzydeł kampusu: Prawidłowe modelowanie przejść pionowych (klatki schodowe, windy) oraz specyficznych wag odległości pomiędzy zabytkowymi, wielopoziomowymi skrzydłami gmachu głównego uczelni bez powodowania dezorientacji użytkownika.',
        ],
      },
      results: {
        en: [
          'Engineering Rigor over Premature Releases: NavigatorPM proved that a dedicated client-side graph engine, sub-millisecond in-memory response times, and thoughtful accessibility routing outperform rushed competing solutions, earning deep respect across technical student circles.',
          'Modular Campus Transit Foundation & PlanPM Integration: Engineered robust stateless APIs (/api/qr, /api/map-data, /api/pois) establishing a turnkey wayfinding layer ready for seamless embedding into the PlanPM timetable app ecosystem.',
          'Stakeholder Diplomacy & Product Strategy: Delivered firsthand leadership experience in navigating grassroots software delivery amidst organizational friction, internal politics, and spontaneous market competition.',
        ],
        pl: [
          'Zwycięstwo jakości inżynierskiej nad pośpiechem: NavigatorPM udowodnił, że dopracowany silnik grafowy, czasy reakcji poniżej 1 ms i bezstanowa architektura in-memory deklasują powierzchowne rozwiązania konkurencji, zdobywając uznanie techniczne studentów i kół naukowych.',
          'Architektura gotowa do integracji z ekosystemem PlanPM: Stworzono stabilne endpointy API (/api/qr, /api/map-data, /api/pois) tworzące modułowy fundament pod bezpośrednią integrację nawigacji z planem zajęć w aplikacji PlanPM.',
          'Doświadczenie w dyplomacji produktowej: Projekt dał zespołowi bezcenną lekcję zarządzania produktem w warunkach konkurencji rynkowej oraz radzenia sobie z oporem instytucjonalnym i wewnętrzną polityką dużej organizacji.',
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
          'Citizen Problem Intake (/zglos-problem): Conversational AI assistant streaming responses via Server-Sent Events (SSE). Incorporates semantic RAG search across 115 published ROPS social innovations and includes emergency life-threat detection automatically redirecting to 112.',
          'Idea Incubator & Grant Generator (/zaoferuj-pomoc): Conversational intake continuously updating a live idea card, feeding an interactive 9-field Social Innovation Canvas (with PDF export) and automatically drafting structured grant applications tailored to specific institutional funding call criteria.',
          'Institutional Management Portal (/admin): Automated AI enrichment pipeline generating concise titles, summaries, 14 categories, target demographics, and quantified risk assessments with reasoning; two-way semantic matchmaking connecting problems with proven solutions.',
          'Interactive Regional Needs Map: Visualizing 149 social challenge indicators from the ROPS Observatory across all 22 powiats of Małopolska on OpenStreetMap.',
          'Strict WCAG 2.1 AA Compliance: Accessibility bar featuring high-contrast mode, 3-level font scaling (A / A+ / A++), and keyboard-friendly semantic HTML.',
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
          'Limited Mentor Availability & Feedback Gaps: Challenge mentors representing the regional policy center were present only during the first 4 hours and the final 2 hours of the 24-hour sprint. The absence of continuous overnight mentoring prevented iterative assumption validation and real-time alignment with jury expectations.',
          'Rigorous AI Prompt Guidelines & Grounding: Engineering exact prompts and bounding guidelines proved difficult—ensuring the LLM did not drift into generic conversational prose, but instead structured formalized grant proposals adhering strictly to institutional funding criteria.',
          'Absence of In-App Messaging & 24h UX Trade-offs: Although the platform looked significantly fresher and more modern than competitor entries, the extreme 24-hour limit forced compromises—notably omitting a real-time messaging system between citizens and innovators, alongside minor UX flow frictions.',
        ],
        pl: [
          'Niska dostępność mentorów wyzwania: Przedstawiciele organizatora zadania pojawili się na sali jedynie przez pierwsze 4 godziny i ostatnie 2 godziny 24-godzinnego hackathonu. Brak ciągłego kontaktu przez całą noc uniemożliwił bieżącą walidację kluczowych założeń i doprecyzowanie oczekiwań jury w trakcie implementacji.',
          'Dostrojenie wytycznych dla modeli AI: Ogromnym wyzwaniem okazało się zdefiniowanie precyzyjnych promptów i guidelines, tak aby asystent AI nie ograniczał się do ogólnikowej rozmowy, lecz generował formalne, zwięzłe wnioski grantowe spełniające restrykcyjne kryteria instytucjonalne ROPS.',
          'Brak wbudowanego komunikatora i kompromisy UX: Mimo że wizualnie i technologicznie platforma prezentowała się bardzo świeżo i nowocześnie, zabrakło nam czasu na wdrożenie bezpośredniego systemu czatu łączącego mieszkańców z autorami innowacji, a niektóre ścieżki UX wymagały głębszego uproszczenia.',
        ],
      },
      results: {
        en: [
          'Strong Weighted Jury Score (7.35/10): Achieved a weighted 7.35/10 evaluation (7.50 Challenge Fulfilment, 7.50 Accessibility & Usability, 7.50 MVP Quality), significantly outperforming the overall HackYeah competition average of 5.57.',
          'Strategic Energy Management over Caffeine Overdrive: Applying lessons from previous hackathons, abandoned heavy energy drink consumption in favor of scheduled sleep and strategic power naps. This sustained mental clarity through the night and ensured high energy during the final jury pitch.',
          'Exemplary JSON Derulo Team Synergy: Flawless synchronization across the 6-person developer team from Szczecin, delivering a cutting-edge full-stack ecosystem (Next.js 16, React 19, Drizzle ORM, pgvector, WCAG) within a single 24-hour window.',
        ],
        pl: [
          'Wysoka ocena jury (7.35/10) ponad średnią konkursu: Projekt uzyskał wysoką notę ważoną 7.35/10 (7.50 za spełnienie wyzwania, 7.50 za dostępność i intuicyjność, 7.50 za jakość MVP), wyraźnie wyprzedzając średnią hackathonu HackYeah (5.57).',
          'Zarządzanie energią zamiast maratonu na kofeinie: Wyciągając wnioski z poprzedniego hackathonu, zrezygnowałem z nadmiaru napojów energetycznych na rzecz strategicznego snu i drzemek. Znacząco przełożyło się to na jasność myślenia, brak kryzysów zmęczenia w nocy i pełną energię podczas finałowej prezentacji przed jury.',
          'Wzorowa współpraca zespołu JSON Derulo: Udana synchronizacja 6 programistów ze Szczecina, równoległe dostarczenie zaawansowanego stosu (Next.js 16, React 19, Drizzle ORM, pgvector, WCAG) i stworzenie spójnego produktu w rekordowym czasie.',
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
        en: 'A collaborative Unity simulation environment engineered within a 5-person team to benchmark autonomous maritime navigation algorithms. Facing the massive scope of industrial ship simulation, the project was split into modular sub-theses (Mikołaj focusing on GPU ocean wave physics for his Bachelor’s thesis, while a peer developed ship kinematics).',
        pl: 'Zespołowe środowisko symulacyjne w Unity tworzone w 5-osobowej grupie na potrzeby weryfikacji algorytmów autonomicznej nawigacji morskiej. W obliczu ogromnej skali przedsięwzięcia projekt został podzielony na prace cząstkowe (gdzie Mikołaj rozwijał m.in. symulację fal oceanicznych na GPU w ramach pracy inżynierskiej, a kolega model kinematyki statku).',
      },
      architecture: {
        en: [
          'Operator Telemetry & Control Interface: Engineered the decoupled UI pipeline managing simulation states (Play, Pause, Stop, Return), engine throttle, and rudder angle, while providing real-time nautical readouts: Speed Over Ground (SOG), Course Over Ground (COG), True Heading (HDG), and Rate of Turn (ROT).',
          'ECDIS Electronic Navigational Chart System: Developed an electronic navigational chart viewer modeled after professional bridge navigation systems (ECDIS), providing fairway visual overlays and spatial vessel situational awareness.',
          'Dynamic Navigational Obstacle Placement: Built a runtime placement system for static and dynamic nautical hazards (buoys, target vessels, shallows) to generate obstacle-avoidance scenarios for benchmarking autonomous guidance algorithms.',
          'Modular Sub-Thesis Architectural Division: Due to the monumental scope, the system was decoupled into independent engineering modules: Mikołaj specialized in GPU-driven wave physics and HLSL optics (serving as his Bachelor thesis), while a teammate engineered rigid-body vessel kinematics.',
        ],
        pl: [
          'Interfejs telemetryczny operatora (UI): Zaprojektowano i wdrożono potok UI kontrolujący stan symulacji (Play, Pause, Stop, Return), moc napędu i kąt płetwy steru oraz wyświetlający na żywo parametry żeglugowe: prędkość (SOG/m/s), kurs nad dnem (COG), kurs rzeczywisty (HDG) i prędkość kątową (ROT).',
          'System cyfrowych map morskich ECDIS: Wdrożono moduł wektorowej i rastrowej wizualizacji map morskich wzorowany na profesjonalnych systemach mostka nawigacyjnego (ECDIS), umożliwiający podgląd toru wodnego i orientację przestrzenną jednostki.',
          'Dynamiczny system przeszkód nawigacyjnych: Stworzono moduł do manualnego i proceduralnego rozmieszczania obiektów morskich (bojki, jednostki obce, mielizny), tworzący scenariusze kolizyjne do testowania algorytmów antykolizyjnych (COLREGs).',
          'Modułowy podział na prace inżynierskie: Ze względu na skalę przedsięwzięcia projekt przekształcono w architekturę klocków: Mikołaj podjął się zaawansowanej symulacji dynamiki fal i optyki wody HLSL (rozwiniętej w pracy inżynierskiej), podczas gdy drugi inżynier opracowywał hydrodynamiczny model kinematyki statku.',
        ],
      },
      challenges: {
        en: [
          'Zero-Baseline Unity Knowledge & Limited Faculty Guidance: The entire 5-person team began with zero prior Unity or real-time simulation background. Minimal instructional resources and limited architectural guidance from the academic mentor forced the team to research, prototype, and debug all engine mechanics entirely from scratch.',
          'Built-in Render Pipeline (BRP) Technical Bottlenecks: Working with Unity’s legacy Built-in Render Pipeline introduced severe friction: outdated documentation, broken third-party packages, and missing modern rendering abstractions made high-fidelity marine effects and shaders arduous to implement.',
          '2D Earth Coordinates to 3D Cartesian World Mapping: Projecting maritime coordinates from 2D ellipsoidal charts and ECDIS layers onto a 3D Cartesian game-world coordinate system required intricate geodetic conversions to prevent spatial distortion and distance skewing.',
          'Steep Maritime Domain Terminology Curve: At project kickoff, deciphering complex nautical jargon and domain abbreviations (SOG, COG, HDG, ROT, COLREGs, ECDIS conventions) posed an initial conceptual hurdle requiring rapid domain knowledge acquisition alongside programming.',
        ],
        pl: [
          'Start z zerową wiedzą o Unity i brak wsparcia mentora: Cały 5-osobowy zespół zaczynał bez wcześniejszego doświadczenia w Unity i grafice czasu rzeczywistego. Dodatkowym utrudnieniem były znikome materiały dydaktyczne i niemal zerowe wsparcie mentora przy projektowaniu architektury, co wymusiło samodzielne dochodzenie do rozwiązań metodą prób i błędów.',
          'Ograniczenia i błędy Built-in Render Pipeline: Wybór starszego potoku Built-in Render Pipeline okazał się pułapką technologiczną — brakowało aktualnej dokumentacji, wiele zewnętrznych bibliotek morskich było uszkodzonych lub porzuconych, a implementacja zaawansowanych efektów optycznych była ekstremalnie utrudniona.',
          'Transformacja współrzędnych kartograficznych (2D glob do świata 3D): Mapowanie danych z dwuwymiarowych map morskich i elipsoidy ziemskiej na lokalne współrzędne kartezjańskie sceny 3D (X, Y, Z) wymagało skomplikowanych konwersji geodezyjnych i kalibracji skali, by uniknąć zniekształceń odległości.',
          'Bariera żeglugowej terminologii dziedzinowej: Na początkowym etapie barierą była obca inżynierom terminologia nautyczna (skróty nawigacyjne SOG, COG, HDG, ROT, procedury COLREGs, standardy ECDIS), wymagająca intensywnego przyswojenia wiedzy nawigacyjnej równolegle z pisaniem kodu.',
        ],
      },
      results: {
        en: [
          'Springboard for Bachelor’s Ocean Thesis: The hands-on exploration of hydrodynamic rendering inspired Mikołaj to isolate the wave synthesis engine into his standalone Bachelor engineering thesis, mastering GPU HLSL compute shaders.',
          'Open Modular Codebase for Future Academic Successors: Recognizing that an enterprise-scale maritime simulator exceeds a single term for 5 students, modularized and documented all completed subsystems (UI, ECDIS, obstacle tools) so future student researchers can adopt and build upon the work.',
          'Engineering Resourcefulness & Scope Realism: Progressing from absolute zero Unity knowledge to an interactive marine simulation prototype with custom telemetry, map rendering, and hazard logic provided invaluable lessons in technical scope assessment and engine mechanics.',
        ],
        pl: [
          'Fundament pod pracę inżynierską (Real-Time Ocean Simulation): Doświadczenie zdobyte przy próbie budowy symulatora zaowocowało wyodrębnieniem autorskiego, zaawansowanego projektu syntezy fal Gerstnera i shaderów HLSL jako samodzielnej pracy dyplomowej Mikołaja.',
          'Architektura przygotowana do przejęcia przez kolejne roczniki: Ponieważ pełny symulator przerastał siły 5 studentów w jednym semestrze, stworzono modularną, dobrze skomentowaną bazę kodu (UI, ECDIS, przeszkody), przygotowaną na rozwój przez kolejne roczniki lub powrót autorów w przyszłości.',
          'Twarda szkoła samodzielności i pokory inżynierskiej: Zespół z poziomu zerowej wiedzy o Unity osiągnął działający prototyp ze sterowaniem, mapą i przeszkodami, zdobywając bezcenne zrozumienie potoków graficznych, ograniczeń silnika i szacowania skali projektów.',
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
          'Sejm Open REST API Ingestion: FastAPI backend service integrating directly with the official Polish Sejm REST API to ingest legislative bills, statutory amendments, and voting records.',
          'DeepSeek NLP Summarization Pipeline: Orchestrates DeepSeek models via Hugging Face API to digest dense, multi-page legal jargon into neutral, bulleted takeaways for citizens.',
          'Social-Feed Flutter Interface: Mobile client presenting parliamentary bills in a clean, bite-sized vertical feed inspired by platform X (Twitter).',
          'MPs Database (Baza Posłów): Comprehensive directory of current Members of Parliament featuring party affiliations, professional biographies, photos, and sponsored bill tracking.',
          'Accessible Design & Privacy: WCAG-compliant high-legibility formatting, visual legislative progress timeline, and dedicated GDPR/RODO compliance.',
        ],
        pl: [
          'Integracja z otwartym API Sejmu RP: Usługa backendowa w FastAPI pobierająca na bieżąco treść ustaw, nowelizacji i wyniki głosowań parlamentarnych.',
          'Potok streszczeń NLP (DeepSeek): Przetwarzanie skomplikowanego żargonu prawnego przez modele DeepSeek (Hugging Face API) na neutralne, syntetyczne podsumowania dla obywateli.',
          'Mobilny feed legislacyjny we Flutterze: Aplikacja prezentująca proces legislacyjny w formie nowoczesnego, pionowego feedu społecznościowego inspirowanego platformą X (Twitter).',
          'Baza Posłów: Przegląd posłów na Sejm RP z podziałem na kluby parlamentarne, biogramy zawodowe, zdjęcia i listę wnoszonych projektów ustaw.',
          'Dostępność WCAG i prywatność: Typografia wysokiej czytelności zgodna z WCAG, wizualna oś czasu prac legislacyjnych oraz pełna zgodność z RODO.',
        ],
      },
      challenges: {
        en: [
          'Legal Document Parsing & Cross-Referencing: Translating dense legislative amendments and multi-level statutory cross-references into accurate layman summaries without hallucinating legal implications.',
          'Unstructured Formats in Government REST Endpoints: Overcoming structural inconsistencies and variable schema layouts across public parliamentary endpoints, requiring custom document sanitization pipelines.',
          'Fatigue Management & Cognitive Drop after 12 Hours: Pacing energy poorly over a 24-hour hackathon proved costly—after 12 hours of relentless coding, productivity plummeted, making concentration and rapid debugging in the late night hours significantly harder.',
          'Rushed Final Pitch Preparation (3.5/5 Score): Coding right up to the final wire left only the last hour to assemble the presentation. The rushed pitch failed to fully showcase the platform’s technical depth, becoming the primary factor behind the lower 3.5/5 jury evaluation.',
        ],
        pl: [
          'Przetwarzanie zawiłego żargonu prawnego: Przekładanie wielostronicowych, zawiłych nowelizacji ustaw i wielopoziomowych odesłań do wcześniejszych kodeksów na precyzyjne, zrozumiałe dla obywateli streszczenia bez zniekształcania sensu prawnego.',
          'Niestrukturalne formaty rządowych endpointów: Radzenie sobie z nagłymi brakami spójności w danych publikowanych przez otwarte API Sejmu RP, zróżnicowanym formatowaniem dokumentów oraz koniecznością ich dynamicznego czyszczenia.',
          'Zarządzanie zmęczeniem w 24-godzinnym maratonie: Błędem okazało się złe zarządzanie zasobami energii — po pierwszych 12 godzinach ciągłego kodowania produktywność drastycznie spadła, a brak zaplanowanego odpoczynku utrudnił utrzymanie skupienia w kluczowych nocnych etapach integracji.',
          'Pośpiech przy prezentacji i niedocenienie pitchu (ocena 3.5/5): Prace nad kodem trwały do samego końca, przez co pitch deck i prezentację dla jury przygotowano dopiero w ostatniej godzinie. Pobieżne przedstawienie projektu mogło być kluczowym powodem obniżenia noty końcowej do 3.5/5 punktów.',
        ],
      },
      results: {
        en: [
          'Functional Civic-Tech Prototype Delivered at HackNation 2025: Successfully launched a functional microservice ecosystem pairing FastAPI, DeepSeek LLM, and a Flutter mobile client presenting legislative bills in an accessible feed.',
          'Prioritizing the Pitch as a Core Engineering Deliverable: The hackathon delivered an invaluable lesson that technical excellence alone cannot win without a polished presentation. Allocating dedicated time for narrative crafting became standard practice for subsequent competitions.',
          'Foundational Pivot toward Strategic Sleep: Experiencing severe burnout halfway through HackNation became the direct catalyst for changing hackathon habits, leading to the successful sleep-and-nap strategy executed at HackYeah.',
        ],
        pl: [
          'Działający prototyp civic-tech na HackNation 2025: Zrealizowano w pełni funkcjonalny prototyp łączący mikroserwis FastAPI, modele DeepSeek oraz aplikację mobilną Flutter ze społecznościowym feedem ustaw sejmowych.',
          'Lekcja priorytetyzacji pitchu: Doświadczenie z HackNation uświadomiło zespołowi, że nawet najlepszy kod nie obroni się sam — przygotowanie narracji i prezentacji musi być traktowane jako równorzędny priorytet od połowy hackathonu, co stało się fundamentem sukcesu w kolejnych konkursach.',
          'Rewizja strategii zarządzania energią: Zderzenie ze spadkiem formy po 12h stało się bezpośrednim impulsem do zmiany podejścia na kolejnym hackathonie (HackYeah), gdzie strategiczne drzemki i higiena snu zastąpiły maraton na energetykach.',
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
          'HTTP Byte-Range Video Streaming: Spring Boot backend implementing byte-range request handlers for random-access video playback and seeking.',
          'Relational Media Modeling: Database schema design for user channels, video metadata, comments, and paginated feeds.',
          'Custom React Video Player: Frontend client with custom playback controls, dynamic buffering feedback, and thumbnail caching.',
        ],
        pl: [
          'Strumieniowanie HTTP Byte-Range: Backend w Spring Boot implementujący obsługę nagłówków zakresów bajtów do płynnego przewijania wideo w dowolny punkt.',
          'Relacyjny model multimediów: Projekt bazy danych dla kanałów użytkowników, metadanych filmów, sekcji komentarzy i stronicowanych feedów.',
          'Dedykowany odtwarzacz w React: Frontend z niestandardowymi kontrolkami odtwarzania, wskaźnikiem buforowania i pamięcią podręczną miniatur.',
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
          'Modular C++ calculation engine: Dedicated math core encapsulating matrix operations, dynamic 2D array representation, and linear algebra routines.',
          'Native cross-platform GUI with wxWidgets: Multi-window interface providing dynamic matrix dimension grids, user input validation, and native platform controls.',
          'Automated CMake build configuration: Structured build pipeline managing external wxWidgets library linking, compiler flags, and target generation.',
        ],
        pl: [
          'Modułowy silnik obliczeniowy C++: Dedykowany rdzeń matematyczny obsługujący operacje macierzowe, dynamiczną reprezentację tablic 2D i algorytmy algebry liniowej.',
          'Natywne GUI oparte na wxWidgets: Wielookienkowy interfejs z dynamicznie dostosowywanymi siatkami pól, walidacją wejścia i kontrolkami systemu operacyjnego.',
          'Konfiguracja projektu w CMake: Zorganizowany proces kompilacji ułatwiający linkowanie obszernej biblioteki wxWidgets, zarządzanie flagami i budowaniem projektu.',
        ],
      },
      challenges: {
        en: [
          'First C++ project learning curve: As one of my earliest non-trivial C++ projects, getting comfortable with manual memory management, dynamic allocation, and raw pointers was a major learning hurdle.',
          'Monolithic wxWidgets framework: Navigating the extensive, legacy wxWidgets library and its event system was challenging; while more modern GUI frameworks existed, the goal was intentionally tackling foundational C++ desktop basics.',
          'Algorithmic bottlenecks on large matrices: Calculating determinants for higher-order matrices (order 8+) took an eternity on a single thread and risked memory saturation, proving that naive implementations quickly fail at scale.',
        ],
        pl: [
          'Pierwsze kroki w C++ i manualne zarządzanie pamięcią: Był to jeden z moich pierwszych projektów w C++, więc kluczowym wyzwaniem było wejście we wprawę ze wskaźnikami, dynamiczną alokacją oraz unikaniem błędów pamięciowych.',
          'Architektura i złożoność wxWidgets: Praca z potężną, tradycyjną biblioteką wxWidgets i jej pętlą zdarzeń wymagała przebrnięcia przez stromą krzywą uczenia się — mimo dostępności nowocześniejszych narzędzi celem było opanowanie klasycznych podstaw.',
          'Wąskie gardła obliczeniowe przy wyznacznikach: Obliczanie wyznaczników dla macierzy stopnia 8+ zajmowało nieskończenie wiele czasu na jednym wątku i groziło zapychaniem pamięci, boleśnie obnażając ograniczenia nieoptymalnych algorytmów.',
        ],
      },
      results: {
        en: [
          'Appreciation for modern build systems (CMake): Managing external libraries, cross-platform compilation flags, and linker settings for wxWidgets manually was a nightmare — adopting CMake revolutionized the workflow and became indispensable.',
          'Lessons in optimization and multithreading: Understanding firsthand why compute-intensive algebraic operations demand both optimized algorithms (e.g., LU decomposition over recursion) and background worker multithreading so the GUI remains responsive.',
          'Solid low-level programming foundation: Gained practical, battle-tested competence in C++ memory mechanics, pointers, and desktop GUI lifecycle architecture.',
        ],
        pl: [
          'Niezastąpiona rola CMake: Ręczna konfiguracja projektu i linkowanie tak obszernej biblioteki jak wxWidgets było koszmarem — opanowanie CMake okazało się zbawieniem i na stałe weszło do mojego warsztatu.',
          'Wnioski o optymalizacji i wielowątkowości: Praktyczna lekcja, że wymagające operacje numeryczne (jak wyznaczniki) potrzebują zoptymalizowanych algorytmów i oddelegowania do osobnych wątków (multithreading), aby nie zamrażać interfejsu.',
          'Solidne fundamenty programowania w C++: Bezpośrednie doświadczenie z mechaniką wskaźników, zarządzaniem stertą i cyklem życia okienkowego oprogramowania desktopowego.',
        ],
      },
      relatedTeamPhotos: [],
    },
  },
  {
    slug: 'ticket-procurement-bot',
    title: 'TicketMaster — eBilet Sniper',
    shortDescription: {
      en: 'High-speed desktop ticket automation and queue sniper built in Python with Playwright Stealth and CustomTkinter, originally created to secure high-demand volleyball championship tickets selling out in minutes.',
      pl: 'Desktopowy bot automatyzujący zakupy biletowe (eBilet Sniper) stworzony w Pythonie z użyciem Playwright Stealth i CustomTkinter, stworzony z myślą o błyskawicznym polowaniu na bilety Mistrzostw Świata w siatkówce.',
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
        en: 'High-speed desktop ticket automation and queue sniper built in Python with Playwright Stealth and CustomTkinter, born from the desire to secure high-demand Men\'s Volleyball World Championship tickets that routinely vanish within minutes.',
        pl: 'Desktopowy bot automatyzujący zakupy biletowe stworzony w Pythonie z użyciem Playwright Stealth i CustomTkinter. Genezą projektu była determinacja, by zdobyć bilety na Mistrzostwa Świata w siatkówce mężczyzn, które co roku wyprzedają się w zaledwie kilka minut.',
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
          'Sub-minute ticket drops & anti-bot evasion: Men\'s Volleyball World Championship tickets routinely sell out within the first few minutes under extreme traffic spikes; bypassing aggressive bot fingerprinting and cloud firewalls without being blocked was critical.',
          'Interactive HTML5 Canvas seat selection: Many ticketing platforms render stadium layouts on dynamic HTML5 Canvas elements rather than clickable DOM nodes, requiring custom coordinate mapping and direct event emulation.',
          'Session persistence under server overload: Preventing authentication drops and lost shopping carts when ticketing servers choke under massive concurrent loads.',
        ],
        pl: [
          'Wyścig z czasem i omijanie zabezpieczeń antybotowych: Bilety na Mistrzostwa Świata w siatkówce mężczyzn znikają w zaledwie kilka minut — bot musiał błyskawicznie omijać zaawansowany fingerprinting i blokady antybotowe w warunkach potężnego przeciążenia serwerów.',
          'Interaktywne mapy miejsc na Canvas HTML5: Platformy biletowe często renderują sektory i krzesełka na elemencie Canvas zamiast standardowych węzłów DOM, co wymagało wyznaczania koordynatów i bezpośredniej emulacji interakcji myszy.',
          'Stabilność sesji w szczycie ruchu: Zabezpieczenie przed zerwaniem sesji OAuth i utratą zarezerwowanego koszyka podczas zapychania się serwerów dystrybutora w momencie startu sprzedaży.',
        ],
      },
      results: {
        en: [
          'Mission accomplished: Successfully automated queue sniping and secured hard-to-get match tickets right at opening bell, bypassing manual checkout bottlenecks.',
          'Headless automation & reverse-engineering mastery: Deep practical experience in Playwright Stealth, network payload interception, DOM/Canvas interaction, and asynchronous desktop UI architecture.',
        ],
        pl: [
          'Cel zrealizowany — bilety zdobyte: Bot umożliwił skuteczne przejście wirtualnej kolejki i natychmiastową rezerwację miejsc w momencie startu sprzedaży, realizując pierwotny cel wyjazdu na mistrzostwa.',
          'Biegłość w automatyzacji headless i reverse engineeringu: Praktyczna wiedza z zakresu Playwright Stealth, inspekcji zapytań sieciowych, interakcji z niestandardowym Canvasem oraz wielowątkowych aplikacji desktopowych.',
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
