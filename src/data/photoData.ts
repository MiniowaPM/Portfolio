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
    { src: '/images/HeroPage/AboutMe/4.jpg', caption: { en: 'University Championships', pl: 'Półfinały AMP' } },
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
  // 3: Contact
  3: [
    { src: '/images/HeroPage/Contact/1.jpg', caption: { en: "Let's Connect", pl: 'Nawiążmy Kontakt' } },
    { src: '/images/HeroPage/Contact/2.jpg', caption: { en: 'Drop a Message', pl: 'Napisz Wiadomość' } },
    { src: '/images/HeroPage/Contact/3.jpg', caption: { en: 'Open to Collaboration', pl: 'Otwarty na Współpracę' } },
    { src: '/images/HeroPage/Contact/4.jpg', caption: { en: 'Building Solutions', pl: 'Wspólne Projekty' } },
    { src: '/images/HeroPage/Contact/5.jpg', caption: { en: 'Direct Inquiry', pl: 'Zapraszam do Kontaktu' } },
  ],
};
