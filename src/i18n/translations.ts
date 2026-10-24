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
    educationTitle: string;
    educationText: string;
    kniTitle: string;
    kniText: string;
    internshipTitle: string;
    internshipText: string;
    sportsTitle: string;
    sportsText: string;
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
      cv: 'CV ↗',
    },
    hero: {
      location: 'Szczecin, Poland · Politechnika Morska',
      headline:
        'Software Engineer building real-time simulations, Edge AI systems, and cross-platform applications.',
      lead: 'Focused on real-time computer graphics, embedded AI, and robust engineering. Background spans GlobalLogic IoT/AI internship, KNI scientific club leadership, production Flutter apps, and C#/HLSL simulation shaders.',
      selectedWork: 'Selected Work ↓',
      github: 'GitHub ↗',
      linkedin: 'LinkedIn ↗',
      copyEmail: 'Copy Email',
      copied: 'Copied!',
      resume: 'Resume (PDF) ↗',
    },
    featured: {
      title: 'Featured Work',
      viewProject: 'View project ↗',
      github: 'GitHub ↗',
    },
    engineering: {
      githubActivity: 'GitHub Activity',
      contributionsSuffix: 'contributions in the last year',
      githubProfile: '@MiniowaPM on GitHub ↗',
      techStack: 'Technical Stack',
      languages: 'Languages',
      frameworks: 'Frameworks & Engines',
      systems: 'Systems & Hardware',
      photosTitle: 'Event & Team Photography',
      morePhotos: 'More photos & story ↗',
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
      github: 'GitHub (@MiniowaPM) ↗',
      linkedin: 'LinkedIn ↗',
      downloadCv: 'Download CV (PDF) ↓',
    },
    caseStudy: {
      backToOverview: '← Back to Overview',
      status: 'Status',
      team: 'Team',
      stack: 'Stack',
      teamPhotosTitle: 'Behind The Scenes & Team Work',
      architectureTitle: 'System Architecture & Implementation',
      challengesTitle: 'Key Technical Challenges',
      resultsTitle: 'Results & Engineering Takeaways',
    },
    about: {
      title: 'About & Background',
      subtitle:
        'Software Engineer with a foundation in maritime university discipline, embedded systems, and real-time graphics.',
      educationTitle: 'Studies at Maritime University of Szczecin',
      educationText:
        'Studying Computer Science at Politechnika Morska w Szczecinie. Building high-reliability mindset, navigation algorithms, and hardware-near engineering principles.',
      kniTitle: 'KNI Science Club Leadership & Projects',
      kniText:
        'Active member and project lead at the KNI scientific club. Led the development of PlanPM and NavigatorPM, driving team architectures, code reviews, and CI/CD automation.',
      internshipTitle: 'GlobalLogic IoT & Edge AI Internship',
      internshipText:
        'Delivered the World of Drones IoT platform in an intense Agile/Scrum cycle. Designed 3D physical enclosures for Raspberry Pi/STM32, integrated computer vision models, and wired automated test pipelines.',
      sportsTitle: 'Athletic Background & Discipline',
      sportsText:
        'AZS Maritime University volleyball representative & Polish Academic Championships semi-finalist. Also passionate about alpine skiing and whitewater kayaking.',
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
      cv: 'CV ↗',
    },
    hero: {
      location: 'Szczecin, Polska · Politechnika Morska',
      headline:
        'Software Engineer tworzący symulacje czasu rzeczywistego, systemy Edge AI oraz aplikacje wieloplatformowe.',
      lead: 'Skupiony na grafice komputerowej czasu rzeczywistego, systemach Edge AI oraz inżynierii oprogramowania. Doświadczenie obejmuje staż IoT/AI w GlobalLogic, koło naukowe KNI, produkcyjne aplikacje Flutter oraz shadery C#/HLSL.',
      selectedWork: 'Wybrane prace ↓',
      github: 'GitHub ↗',
      linkedin: 'LinkedIn ↗',
      copyEmail: 'Kopiuj e-mail',
      copied: 'Skopiowano!',
      resume: 'CV (PDF) ↗',
    },
    featured: {
      title: 'Wybrane Prace',
      viewProject: 'Zobacz projekt ↗',
      github: 'GitHub ↗',
    },
    engineering: {
      githubActivity: 'Aktywność GitHub',
      contributionsSuffix: 'kontrybucji w ostatnim roku',
      githubProfile: '@MiniowaPM na GitHubie ↗',
      techStack: 'Stack Technologiczny',
      languages: 'Języki',
      frameworks: 'Frameworki i Silniki',
      systems: 'Systemy i Sprzęt',
      photosTitle: 'Wydarzenia i Zespół',
      morePhotos: 'Więcej zdjęć i historia ↗',
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
      github: 'GitHub (@MiniowaPM) ↗',
      linkedin: 'LinkedIn ↗',
      downloadCv: 'Pobierz CV (PDF) ↓',
    },
    caseStudy: {
      backToOverview: '← Powrót do przeglądu',
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
        'Software Engineer łączący dyscyplinę uczelni morskiej, inżynierię systemów wbudowanych oraz grafikę czasu rzeczywistego.',
      educationTitle: 'Studia na Politechnice Morskiej w Szczecinie',
      educationText:
        'Kierunek Informatyka. Nacisk na niezawodność systemów, algorytmy nawigacyjne oraz programowanie blisko sprzętu.',
      kniTitle: 'Działalność i Projekty w Kole Naukowym KNI',
      kniText:
        'Koordynator i architekt projektów w kole informatycznym KNI. Kierowałem rozwojem PlanPM oraz NavigatorPM, dbając o jakość kodu, code review i automatyzację CI/CD.',
      internshipTitle: 'Staż IoT & Edge AI w GlobalLogic',
      internshipText:
        'Stworzenie platformy IoT World of Drones w ścisłym cyklu Agile/Scrum. Projekt obudów 3D dla urządzeń Raspberry Pi/STM32, integracja modeli detekcji obrazu oraz testy CI/CD.',
      sportsTitle: 'Dyscyplina Sportowa',
      sportsText:
        'Reprezentant Politechniki Morskiej w siatkówce (półfinał Akademickich Mistrzostw Polski). Pasjonat narciarstwa alpejskiego i spływów kajakowych.',
      galleryTitle: 'Archiwum Fotograficzne',
      gallerySubtitle: 'Kadry z zawodów sportowych, hackathonów i pracy nad projektami.',
    },
  },
};
