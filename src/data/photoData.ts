export interface PhotoItem {
  src: string;
  caption: {
    en: string;
    pl: string;
  };
}

export const PHOTO_DATA: Record<number, PhotoItem[]> = {
  // 0: Hero Portrait Cycler
  0: [
    { src: '/images/HeroPage/Hero/1.jpg', caption: { en: 'Hello & Welcome', pl: 'Cześć i Dzień Dobry' } },
    { src: '/images/HeroPage/Hero/2.jpg', caption: { en: 'Creative Engineering', pl: 'Kreatywna Inżynieria' } },
    { src: '/images/HeroPage/Hero/3.jpg', caption: { en: 'Full-Stack Developer', pl: 'Inżynier Oprogramowania' } },
    { src: '/images/HeroPage/Hero/4.jpg', caption: { en: 'Building Systems', pl: 'Tworzenie Systemów' } },
    { src: '/images/HeroPage/Hero/5.jpg', caption: { en: 'Enjoy Your Visit', pl: 'Miłego Przeglądania' } },
  ],
  // 1: Sports & Outdoors
  1: [
    { src: '/images/HeroPage/AboutMe/1.jpg', caption: { en: 'Alpine Skiing', pl: 'Narciarstwo Alpejskie' } },
    { src: '/images/HeroPage/AboutMe/2.jpg', caption: { en: 'River Kayaking', pl: 'Spływ Kajakowy' } },
    { src: '/images/HeroPage/AboutMe/3.jpg', caption: { en: 'Volleyball Middle Attack', pl: 'Atak ze Środka' } },
    { src: '/images/HeroPage/AboutMe/4.jpg', caption: { en: 'Winter Ski Trip', pl: 'Wyjazd Narciarski' } },
    { src: '/images/HeroPage/AboutMe/5.jpg', caption: { en: 'Tournament Podium', pl: 'Miejsce na Podium' } },
  ],
  // 2: Teamwork & Hackathons
  2: [
    { src: '/images/HeroPage/Projects/1.jpg', caption: { en: 'Engineering Focus', pl: 'Pełne Skupienie' } },
    { src: '/images/HeroPage/Projects/2.jpg', caption: { en: 'Architecture & Coding', pl: 'Praca nad Kodem' } },
    { src: '/images/HeroPage/Projects/3.jpg', caption: { en: 'Collaborative Sprint', pl: 'Współpraca Zespołowa' } },
    { src: '/images/HeroPage/Projects/4.jpg', caption: { en: 'Deployment & Verification', pl: 'Testy i Wdrożenie' } },
    { src: '/images/HeroPage/Projects/5.jpg', caption: { en: 'Late Night Debugging', pl: 'Nocny Sprint Projektowy' } },
    { src: '/images/HeroPage/Projects/6.jpg', caption: { en: 'Post-Release Milestone', pl: 'Odpoczynek po Wydaniu' } },
  ],
  // 3: Lifestyle & Moments
  3: [
    { src: '/images/HeroPage/Contact/1.jpg', caption: { en: 'Cozy Fireplace Evening', pl: 'Wieczór przy Kominku' } },
    { src: '/images/HeroPage/Contact/4.jpg', caption: { en: 'Good Food & Coffee Fuel', pl: 'Śniadanie i Dobra Kawa' } },
    { src: '/images/HeroPage/Contact/5.jpg', caption: { en: 'Winter Cafe & Curious Cat', pl: 'Świąteczna Kawiarnia i Kot za Szybą' } },
  ],
};
