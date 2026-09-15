import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { polaroidStore } from '../../store/polaroidStore';

const PHOTO_DATA: Record<number, Array<{ src: string; caption: string }>> = {
  0: [
    { src: '/images/home-1.jpg', caption: 'Hello!' },
    { src: '/images/home-2.jpg', caption: 'Welcome to my world' },
  ],
  1: [
    { src: '/images/about-1.jpg', caption: 'AZS Maritime University' },
    { src: '/images/about-2.jpg', caption: 'Polish Academic Championships' },
  ],
  2: [
    { src: '/images/projects-1.jpg', caption: 'Cooking code...' },
    { src: '/images/projects-2.jpg', caption: 'Late night debugging' },
  ],
  3: [{ src: '/images/contact-1.jpg', caption: "Let's talk!" }],
};

export function PolaroidOverlay({ activeSlide }: { activeSlide: number }) {
  const [data, setData] = useState(polaroidStore.get());

  useEffect(() => {
    const unsub = polaroidStore.subscribe(setData);
    return () => {
      unsub();
    };
  }, []);

  const currentGallery = PHOTO_DATA[activeSlide] || PHOTO_DATA[0];
  const currentPhoto = currentGallery[data.photoIndex] || currentGallery[0];

  const handlePhotoClick = () => {
    polaroidStore.set({ visible: false });
  };

  return (
    <div
      className="fixed top-0 left-0 z-99999"
      style={{
        pointerEvents: data.visible ? 'auto' : 'none',
        opacity: data.visible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        transform: `translate3d(-50%, -50%, 0) translate3d(${data.x}px, ${data.y}px, 0)`,
      }}
    >
      <div
        onClick={handlePhotoClick}
        className="group relative w-64 cursor-pointer rounded-sm bg-white p-3 pb-12 shadow-2xl transition-transform hover:scale-105"
      >
        <div className="relative h-64 w-full overflow-hidden bg-gray-200">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto.src}
              src={currentPhoto.src}
              alt="My real life photo"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.p
            key={currentPhoto.caption}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.3 }}
            className="absolute right-0 bottom-4 left-0 text-center text-xl font-bold text-gray-800"
          >
            {currentPhoto.caption}
          </motion.p>
        </AnimatePresence>

        <div className="absolute -top-4 left-1/2 h-8 w-24 -translate-x-1/2 rotate-3 bg-white/40 shadow-sm backdrop-blur-md"></div>
      </div>
    </div>
  );
}
