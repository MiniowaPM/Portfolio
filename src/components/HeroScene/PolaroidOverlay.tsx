import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PHOTO_DATA } from '../../data/photoData';
import { polaroidStore } from '../../store/polaroidStore';

export function PolaroidOverlay({ activeSlide }: { activeSlide: number }) {
  const [data, setData] = useState(polaroidStore.get());

  useEffect(() => {
    const unsub = polaroidStore.subscribe(setData);
    return () => {
      unsub();
    };
  }, []);

  const currentSlideData = PHOTO_DATA[activeSlide] || PHOTO_DATA[0];
  const currentGallery = currentSlideData.photos;
  const currentPhoto = currentGallery[data.photoIndex] || currentGallery[0];
  const { offsetX, offsetY } = currentSlideData;

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
        // Używamy dynamicznego offsetX i offsetY zdefiniowanych w pliku data
        transform: `translate3d(calc(-50% + ${offsetX}), calc(-50% + ${offsetY}), 0) translate3d(${data.x}px, ${data.y}px, 0)`,
      }}
    >
      <div
        onClick={handlePhotoClick}
        className="group relative w-80 cursor-pointer rounded-sm bg-white p-4 pb-16 shadow-2xl transition-transform hover:scale-105 md:w-[26rem]"
      >
        <div className="relative h-80 w-full overflow-hidden bg-gray-200 md:h-[26rem]">
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
            className="absolute right-0 bottom-5 left-0 text-center text-2xl font-bold text-gray-800"
          >
            {currentPhoto.caption}
          </motion.p>
        </AnimatePresence>

        <div className="absolute -top-5 left-1/2 h-10 w-32 -translate-x-1/2 rotate-3 bg-white/40 shadow-sm backdrop-blur-md"></div>
      </div>
    </div>
  );
}
