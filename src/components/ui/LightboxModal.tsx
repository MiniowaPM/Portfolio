import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: Array<{ src: string; caption?: string }>;
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  onNavigate,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
      if (e.key === 'ArrowLeft' && currentIndex > 0) onNavigate(currentIndex - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex] || images[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
        onClick={onClose}
      >
        {/* Modal Window Container */}
        <div
          className="relative flex max-h-[92vh] max-w-[92vw] flex-col items-center justify-center overflow-hidden rounded-[32px] bg-[#1E2330] p-3 shadow-2xl sm:p-5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 z-20 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md transition-transform hover:scale-110 active:scale-95"
            aria-label="Close fullscreen view"
          >
            ✕
          </button>

          {/* Main Image with Spring Fade */}
          <div className="relative flex max-h-[75vh] w-full items-center justify-center overflow-hidden rounded-[24px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={currentImage.src}
                alt={currentImage.caption || 'Enlarged photo'}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="max-h-[75vh] w-auto max-w-full rounded-[20px] object-contain shadow-2xl select-none"
              />
            </AnimatePresence>
          </div>

          {/* Caption & Controls Bar */}
          <div className="mt-4 flex w-full items-center justify-between gap-4 px-2">
            <span className="truncate font-sans text-[14px] font-bold text-white">
              {currentImage.caption || `Image ${currentIndex + 1}`}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    disabled={currentIndex === 0}
                    onClick={() => onNavigate(currentIndex - 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Previous image"
                  >
                    ←
                  </button>
                  <span className="font-sans text-[13px] font-bold text-white/80">
                    {currentIndex + 1} / {images.length}
                  </span>
                  <button
                    type="button"
                    disabled={currentIndex === images.length - 1}
                    onClick={() => onNavigate(currentIndex + 1)}
                    className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white transition-all hover:bg-white/30 disabled:opacity-30 disabled:pointer-events-none"
                    aria-label="Next image"
                  >
                    →
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
