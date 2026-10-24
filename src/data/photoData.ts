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
    { src: '/images/HeroPage/Hero/1.jpg', caption: { en: 'Hello! 👋', pl: 'Cześć! 👋' } },
    { src: '/images/HeroPage/Hero/2.jpg', caption: { en: 'Welcome to my world ✨', pl: 'Witaj w moim świecie ✨' } },
    { src: '/images/HeroPage/Hero/3.jpg', caption: { en: 'Nice to see you! 👀', pl: 'Miło Cię widzieć! 👀' } },
    { src: '/images/HeroPage/Hero/4.jpg', caption: { en: 'Ready to build 🚀', pl: 'Gotowy do działania 🚀' } },
    { src: '/images/HeroPage/Hero/5.jpg', caption: { en: 'Enjoy your stay! ☕', pl: 'Rozgość się! ☕' } },
  ],
  // 1: Sports & Outdoors
  1: [
    { src: '/images/HeroPage/AboutMe/1.jpg', caption: { en: 'Skiing Time! ⛷️', pl: 'Czas na narty! ⛷️' } },
    { src: '/images/HeroPage/AboutMe/2.jpg', caption: { en: 'Kayaking Chilling 🛶', pl: 'Spływ kajakowy 🛶' } },
    { src: '/images/HeroPage/AboutMe/3.jpg', caption: { en: 'Middle Attack! 🏐', pl: 'Atak ze środka! 🏐' } },
    { src: '/images/HeroPage/AboutMe/4.jpg', caption: { en: 'Back in action 💪', pl: 'Powrót do gry 💪' } },
    { src: '/images/HeroPage/AboutMe/5.jpg', caption: { en: 'Award winners! 🏆', pl: 'Na podium! 🏆' } },
  ],
  // 2: Teamwork & Hackathons
  2: [
    { src: '/images/HeroPage/Projects/1.jpg', caption: { en: 'Full focus 🧠', pl: 'Pełne skupienie 🧠' } },
    { src: '/images/HeroPage/Projects/2.jpg', caption: { en: 'Cooking code... 💻', pl: 'Praca nad kodem... 💻' } },
    { src: '/images/HeroPage/Projects/3.jpg', caption: 'Team effort 🤝', captionObj: { en: 'Team effort 🤝', pl: 'Współpraca zespołowa 🤝' } } as unknown as PhotoItem,
    { src: '/images/HeroPage/Projects/4.jpg', caption: { en: 'Testing in prod... 🧪', pl: 'Testy wdrożeniowe... 🧪' } },
    { src: '/images/HeroPage/Projects/5.jpg', caption: { en: 'Late night debugging 🦉', pl: 'Nocne debugowanie 🦉' } },
    { src: '/images/HeroPage/Projects/6.jpg', caption: { en: 'Resting Struggle 😪', pl: 'Odpoczynek po wydaniu 😪' } },
  ],
  // 3: Contact
  3: [
    { src: '/images/HeroPage/Contact/1.jpg', caption: { en: "Let's talk! 💬", pl: 'Porozmawiajmy! 💬' } },
    { src: '/images/HeroPage/Contact/2.jpg', caption: { en: 'Drop me a message 📬', pl: 'Napisz wiadomość 📬' } },
    { src: '/images/HeroPage/Contact/3.jpg', caption: { en: 'Open to work 💼', pl: 'Otwarty na współpracę 💼' } },
    { src: '/images/HeroPage/Contact/4.jpg', caption: { en: "Let's build something! 🛠️", pl: 'Zbudujmy coś razem! 🛠️' } },
    { src: '/images/HeroPage/Contact/5.jpg', caption: { en: 'Say hi! 👋', pl: 'Daj znać o sobie! 👋' } },
  ],
};

// Fix the item 2[2] typing cleanly
PHOTO_DATA[2][2] = {
  src: '/images/HeroPage/Projects/3.jpg',
  caption: { en: 'Team effort 🤝', pl: 'Współpraca zespołowa 🤝' },
};
