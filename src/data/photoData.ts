export interface PhotoItem {
  src: string;
  caption: string;
}

export interface SlidePhotoData {
  photos: PhotoItem[];
  offsetX: string;
  offsetY: string;
}

export const PHOTO_DATA: Record<number, SlidePhotoData> = {
  0: {
    offsetX: '-6vw',
    offsetY: '-12vh',
    photos: [
      { src: '/images/HeroPage/Hero/1.jpg', caption: 'Hello! 👋' },
      { src: '/images/HeroPage/Hero/2.jpg', caption: 'Welcome to my world ✨' },
      { src: '/images/HeroPage/Hero/3.jpg', caption: 'Nice to see you! 👀' },
      { src: '/images/HeroPage/Hero/4.jpg', caption: 'Ready to explore? 🚀' },
      { src: '/images/HeroPage/Hero/5.jpg', caption: 'Enjoy your stay! ☕' },
    ],
  },
  1: {
    offsetX: '-12vw',
    offsetY: '5vh',
    photos: [
      { src: '/images/HeroPage/AboutMe/1.jpg', caption: 'Skiing Time! ⛷️' },
      { src: '/images/HeroPage/AboutMe/2.jpg', caption: 'Kayaking Chilling 🛶' },
      { src: '/images/HeroPage/AboutMe/3.jpg', caption: 'Middle Attack! 🏐' },
      { src: '/images/HeroPage/AboutMe/4.jpg', caption: 'Back in action 💪' },
      { src: '/images/HeroPage/AboutMe/5.jpg', caption: 'Award winners! 🏆' },
    ],
  },
  2: {
    offsetX: '0vw',
    offsetY: '5vh',
    photos: [
      { src: '/images/HeroPage/Projects/1.jpg', caption: 'Full focus 🧠' },
      { src: '/images/HeroPage/Projects/2.jpg', caption: 'Cooking code... 💻' },
      { src: '/images/HeroPage/Projects/3.jpg', caption: 'Team effort 🤝' },
      { src: '/images/HeroPage/Projects/4.jpg', caption: 'Testing in prod... 🧪' },
      { src: '/images/HeroPage/Projects/5.jpg', caption: 'Late night debugging 🦉' },
      { src: '/images/HeroPage/Projects/6.jpg', caption: 'Resting Struggle 😪' },
    ],
  },
  3: {
    offsetX: '12vw',
    offsetY: '-8vh',
    photos: [
      { src: '/images/HeroPage/Contact/1.jpg', caption: "Let's talk! 💬" },
      { src: '/images/HeroPage/Contact/2.jpg', caption: 'Drop me a message 📬' },
      { src: '/images/HeroPage/Contact/3.jpg', caption: 'Open to work 💼' },
      { src: '/images/HeroPage/Contact/4.jpg', caption: "Let's build something! 🛠️" },
      { src: '/images/HeroPage/Contact/5.jpg', caption: 'Say hi! 👋' },
    ],
  },
};
