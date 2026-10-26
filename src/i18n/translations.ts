import type { Locale } from '../context/localeContextDef';

export interface Translations {
  nav: {
    role: string;
    projects: string;
    about: string;
    contact: string;
    cv: string;
  };
  hero: {
    location: string;
    headline: string;
    lead: string;
    selectedWork: string;
    github: string;
    linkedin: string;
    copyEmail: string;
    copied: string;
    resume: string;
  };
  featured: {
    title: string;
    viewProject: string;
    github: string;
  };
  engineering: {
    githubActivity: string;
    contributionsSuffix: string;
    githubProfile: string;
    techStack: string;
    languages: string;
    frameworks: string;
    systems: string;
    photosTitle: string;
    morePhotos: string;
  };
  archive: {
    title: string;
    subtitle: string;
    colProject: string;
    colDescription: string;
    colStack: string;
    colLink: string;
  };
  contact: {
    headline: string;
    subtext: string;
    copyEmail: string;
    copied: string;
    github: string;
    linkedin: string;
    downloadCv: string;
  };
  caseStudy: {
    backToOverview: string;
    status: string;
    team: string;
    stack: string;
    teamPhotosTitle: string;
    architectureTitle: string;
    challengesTitle: string;
    resultsTitle: string;
  };
  about: {
    title: string;
    subtitle: string;
    workTitle: string;
    workSubtitle: string;
    globallogicTitle: string;
    globallogicRole: string;
    globallogicDesc: string;
    altcomTitle: string;
    altcomRole: string;
    altcomDesc: string;
    mvbTitle: string;
    mvbRole: string;
    mvbDesc: string;
    eduHeading: string;
    pmTitle: string;
    pmDegree: string;
    pmDesc: string;
    ttcTitle: string;
    ttcDegree: string;
    ttcDesc: string;
    certHeading: string;
    certPl900: string;
    certEuroscipy: string;
    kniHeading: string;
    kniRole: string;
    kniDesc: string;
    passionsHeading: string;
    passionsDesc: string;
    sportsVball: string;
    sportsOutdoors: string;
    esportsTitle: string;
    esportsLoL: string;
    esportsOsu: string;
    gamedevDesc: string;
    galleryTitle: string;
    gallerySubtitle: string;
  };
}

export const translations: Record<Locale, Translations> = {
  en: {
    nav: {
      role: 'Software Engineer',
      projects: 'Projects',
      about: 'About',
      contact: 'Contact',
      cv: 'CV',
    },
    hero: {
      location: 'Szczecin, Poland · Politechnika Morska',
      headline:
        'Software Engineer building real-time simulations, Edge AI systems, and cross-platform applications.',
      lead: 'Focused on real-time computer graphics, embedded AI, and robust engineering. Background spans GlobalLogic IoT/AI internship, active KNI scientific club participation, production Flutter apps, and C#/HLSL simulation shaders.',
      selectedWork: 'Selected Work',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      resume: 'Resume (PDF)',
    },
    featured: {
      title: 'Featured Work',
      viewProject: 'View project',
      github: 'GitHub',
    },
    engineering: {
      githubActivity: 'GitHub Activity',
      contributionsSuffix: 'contributions in the last year',
      githubProfile: '@MiniowaPM on GitHub',
      techStack: 'Technical Stack',
      languages: 'Languages',
      frameworks: 'Frameworks & Engines',
      systems: 'Systems & Hardware',
      photosTitle: 'Event & Team Photography',
      morePhotos: 'More photos & story',
    },
    archive: {
      title: 'Archive / Additional Projects',
      subtitle:
        'A high-density editorial record of academic engineering, algorithmic systems, and prototypes.',
      colProject: 'Project',
      colDescription: 'Description',
      colStack: 'Tech Stack',
      colLink: 'Link',
    },
    contact: {
      headline: 'Get in touch',
      subtext:
        'Available for software engineering roles, internships, and collaborative R&D projects in Szczecin or remotely.',
      copyEmail: 'Copy Email',
      copied: 'Copied',
      github: 'GitHub (@MiniowaPM)',
      linkedin: 'LinkedIn',
      downloadCv: 'Download CV (PDF)',
    },
    caseStudy: {
      backToOverview: 'Back to Overview',
      status: 'Status',
      team: 'Team',
      stack: 'Stack',
      teamPhotosTitle: 'Behind The Scenes & Team Work',
      architectureTitle: 'System Architecture & Implementation',
      challengesTitle: 'Key Technical Challenges',
      resultsTitle: 'Results & Engineering Takeaways',
    },
    about: {
      title: 'About & Professional Journey',
      subtitle:
        'Software Engineer with a foundation in maritime systems reliability, embedded Edge AI, and real-time graphics.',
      workTitle: 'Commercial & Practical Experience',
      workSubtitle: 'Hands-on engineering across industrial IoT, network administration, and systems support.',
      globallogicTitle: 'GlobalLogic — IoT & Edge AI Internship',
      globallogicRole: 'IoT Engineering Intern · 07.2024 – 08.2024',
      globallogicDesc:
        'Engineered the World of Drones IoT platform in an intense Agile/Scrum cycle. Designed 3D physical enclosures and drone landing pads in Autodesk Fusion for Raspberry Pi and STM32, integrated Nano AI object detection models, built FastAPI services with React telemetry dashboard, and wired automated CI/CD pipelines.',
      altcomTitle: 'Altcom S.J. — IT Support & Network Administration',
      altcomRole: 'IT Support & SysAdmin Intern · 07.2022 – 08.2022',
      altcomDesc:
        'Administered UNIX/Linux server environments and NAS storage arrays. Configured IP routing, local LAN infrastructure, DHCP, and DNS services while resolving hardware and software troubleshooting requests.',
      mvbTitle: 'MVB — Network Infrastructure & Systems',
      mvbRole: 'IT Technician Intern · 05.2021 – 06.2021',
      mvbDesc:
        'Assembled, configured, and organized server RACK cabinets, performed structured network cabling and patch panel termination, and deployed enterprise workstations.',
      eduHeading: 'Education & Academic Foundation',
      pmTitle: 'Maritime University of Szczecin',
      pmDegree: 'Bachelor of Engineering in Computer Science · 10.2021 – 02.2025',
      pmDesc:
        'Specialization: Multimedia Systems Programming. Thesis: Real-Time Ocean Simulation in Unity featuring Gerstner wave physics and GPU HLSL surface displacement shaders.',
      ttcTitle: 'Technikum Technologii Cyfrowych w Szczecinie',
      ttcDegree: 'IT Specialist with Honours (IoT) · 09.2017 – 04.2021',
      ttcDesc:
        'Graduated with honours, achieving top grades in national professional exams INF.02 and INF.03. Active staff member of the school radio broadcasting station, operating audio mixers, signal routing, and public address equipment.',
      certHeading: 'Certifications & Science Activity',
      certPl900: 'Microsoft Certified: Power Platform Fundamentals (PL-900)',
      certEuroscipy: 'Volunteer at EuroSciPy 2024 European Scientific Python Conference',
      kniHeading: 'KNI Science Club & Community',
      kniRole: 'Active Core Member',
      kniDesc:
        'In our science club, we operate with a flat, equal partnership rather than a rigid hierarchy of leads — allowing natural initiative to shine. I actively participated in organizing university tech conferences, represented the club at academic competitions and hackathons, contributed to PlanPM backend architecture (1,000+ downloads), and drove development on NavigatorPM.',
      passionsHeading: 'Athletics, E-Sports & Passions',
      passionsDesc: 'Discipline, spatial reflexes, and high-pressure focus applied to engineering.',
      sportsVball: 'Maritime University AZS volleyball team player & Polish Academic Championships (AMP) semi-finalist.',
      sportsOutdoors: 'Outdoor enthusiast passionate about alpine skiing and whitewater kayaking.',
      esportsTitle: 'E-Sports & Precision Gaming',
      esportsLoL: 'Master Tier in League of Legends — strategic resource allocation, team communication, and rapid tactical execution under pressure.',
      esportsOsu: 'Top 10,000 globally in rhythm game osu! — demanding extreme micro-precision, sub-second reflexes, and uninterrupted motor focus.',
      gamedevDesc: 'Creative game development in Unity and C# with focus on shaders, physics simulations, and graphics pipelines.',
      galleryTitle: 'Photography Archive',
      gallerySubtitle: 'Moments from competitions, hackathons, and late-night debugging sessions.',
    },
  },
  pl: {
    nav: {
      role: 'Software Engineer',
      projects: 'Projekty',
      about: 'O mnie',
      contact: 'Kontakt',
      cv: 'CV',
    },
    hero: {
      location: 'Szczecin, Polska · Politechnika Morska',
      headline:
        'Software Engineer tworzący symulacje czasu rzeczywistego, systemy Edge AI oraz aplikacje wieloplatformowe.',
      lead: 'Skupiony na grafice komputerowej czasu rzeczywistego, systemach Edge AI oraz inżynierii oprogramowania. Doświadczenie obejmuje staż IoT/AI w GlobalLogic, koło naukowe KNI, produkcyjne aplikacje Flutter oraz shadery C#/HLSL.',
      selectedWork: 'Wybrane prace',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      copyEmail: 'Kopiuj e-mail',
      copied: 'Skopiowano!',
      resume: 'CV (PDF)',
    },
    featured: {
      title: 'Wybrane Prace',
      viewProject: 'Zobacz projekt',
      github: 'GitHub',
    },
    engineering: {
      githubActivity: 'Aktywność GitHub',
      contributionsSuffix: 'kontrybucji w ostatnim roku',
      githubProfile: '@MiniowaPM na GitHubie',
      techStack: 'Stack Technologiczny',
      languages: 'Języki',
      frameworks: 'Frameworki i Silniki',
      systems: 'Systemy i Sprzęt',
      photosTitle: 'Wydarzenia i Zespół',
      morePhotos: 'Więcej zdjęć i historia',
    },
    archive: {
      title: 'Archiwum i Pozostałe Projekty',
      subtitle:
        'Edytorskie zestawienie projektów inżynierskich, narzędzi algorytmicznych i prototypów.',
      colProject: 'Projekt',
      colDescription: 'Opis',
      colStack: 'Tech Stack',
      colLink: 'Link',
    },
    contact: {
      headline: 'Zbudujmy coś wspólnie.',
      subtext:
        'Otwarty na stanowiska Software Engineer, staże oraz współpracę przy innowacyjnych projektach R&D w Szczecinie lub zdalnie.',
      copyEmail: 'Kopiuj e-mail',
      copied: 'Skopiowano!',
      github: 'GitHub (@MiniowaPM)',
      linkedin: 'LinkedIn',
      downloadCv: 'Pobierz CV (PDF)',
    },
    caseStudy: {
      backToOverview: 'Powrót do przeglądu',
      status: 'Status',
      team: 'Zespół',
      stack: 'Stack',
      teamPhotosTitle: 'Kulisy i Praca Zespołowa',
      architectureTitle: 'Architektura Systemu i Implementacja',
      challengesTitle: 'Główne Wyzwania Inżynieryjne',
      resultsTitle: 'Rezultaty i Wnioski',
    },
    about: {
      title: 'O mnie i Doświadczenie',
      subtitle:
        'Software Engineer łączący dyscyplinę inżynierii morskiej, systemy Edge AI oraz grafikę czasu rzeczywistego.',
      workTitle: 'Doświadczenie Zawodowe i Przemysłowe',
      workSubtitle: 'Praktyczne wdrożenia w IoT, administracja systemami oraz wsparcie infrastruktury IT.',
      globallogicTitle: 'GlobalLogic — Staż Inżynierski IoT & AI',
      globallogicRole: 'Stażysta ds. IoT · 07.2024 – 08.2024',
      globallogicDesc:
        'Współtworzenie platformy IoT World of Drones w ścisłym cyklu Agile/Scrum. Projektowanie obudów i lądowisk w Autodesk Fusion dla Raspberry Pi i STM32, integracja modeli Nano AI do detekcji obiektów, backend w FastAPI z dashboardem w React oraz potok testów CI/CD.',
      altcomTitle: 'Altcom S.J. — Wsparcie IT & Administracja Sieci',
      altcomRole: 'Praktykant IT / SysAdmin · 07.2022 – 08.2022',
      altcomDesc:
        'Administracja środowiskiem UNIX/Linux i macierzami dyskowymi NAS. Konfiguracja routingu, sieci lokalnych LAN, usług DHCP i DNS oraz diagnostyka sprzętowa i rozwiązywanie problemów w ramach helpdesku.',
      mvbTitle: 'MVB — Infrastruktura Sieciowa i Sprzęt',
      mvbRole: 'Praktykant IT / Technik Sieciowy · 05.2021 – 06.2021',
      mvbDesc:
        'Montaż, konfiguracja i porządkowanie szaf serwerowych RACK, krosowanie paneli krosowniczych, okablowanie strukturalne oraz przygotowywanie i konfiguracja stacji roboczych.',
      eduHeading: 'Edukacja i Fundament Akademicki',
      pmTitle: 'Politechnika Morska w Szczecinie',
      pmDegree: 'Inżynier Informatyki · 10.2021 – 02.2025',
      pmDesc:
        'Specjalność: Programowanie systemów multimedialnych. Praca inżynierska: Fotorealistyczna symulacja powierzchni oceanu czasu rzeczywistego w Unity z fizyką fal Gerstnera i shaderami powierzchniowymi HLSL na GPU.',
      ttcTitle: 'Technikum Technologii Cyfrowych w Szczecinie',
      ttcDegree: 'Technik Informatyk z Wyróżnieniem (IoT) · 09.2017 – 04.2021',
      ttcDesc:
        'Dyplom ukończenia z wyróżnieniem, celujące wyniki państwowych egzaminów zawodowych INF.02 i INF.03. Działalność w radiowęźle szkolnym (obsługa sprzętu audio, mikserów i transmisji nagłośnienia).',
      certHeading: 'Certyfikaty i Wolontariat',
      certPl900: 'Microsoft Certified: Power Platform Fundamentals (PL-900)',
      certEuroscipy: 'Wolontariusz na międzynarodowej konferencji EuroSciPy 2024',
      kniHeading: 'Działalność w Kole Naukowym KNI',
      kniRole: 'Aktywny członek zespołu',
      kniDesc:
        'W naszym kole nie mamy sztywnej hierarchii liderów — tworzymy partnerski, płaski zespół, w którym każdy ma równe szanse i naturalną przestrzeń na inicjatywę. Brałem czynny udział w organizacji uczelnianych konferencji naukowych, reprezentowałem koło na konkursach, hackathonach i wydarzeniach akademickich, współtworząc architekturę backendu PlanPM (ponad 1000 pobrań) oraz system NavigatorPM.',
      passionsHeading: 'Sport, E-sport i Pasje',
      passionsDesc: 'Dyscyplina i skupienie przeniesione ze sportu i rywalizacji do świata inżynierii.',
      sportsVball: 'Reprezentant Politechniki Morskiej w siatkówce w barwach AZS (półfinał Akademickich Mistrzostw Polski).',
      sportsOutdoors: 'Aktywność outdoorowa: spływy kajakowe oraz narciarstwo alpejskie.',
      esportsTitle: 'E-sport i Gry',
      esportsLoL: 'Ranga Master Tier w League of Legends — myślenie strategiczne, podejmowanie decyzji pod presją i komunikacja zespołowa.',
      esportsOsu: 'Top 10 000 na świecie w grze rytmicznej osu! — precyzja motoryczna, milisekundowy czas reakcji i koncentracja.',
      gamedevDesc: 'Tworzenie gier w Unity i C#: fizyka, optymalizacja oraz shadery czasu rzeczywistego.',
      galleryTitle: 'Archiwum Fotograficzne',
      gallerySubtitle: 'Kadry z zawodów sportowych, hackathonów i pracy nad projektami.',
    },
  },
};
