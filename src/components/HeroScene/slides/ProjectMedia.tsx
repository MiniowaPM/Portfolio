import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

interface ProjectMediaProps {
  title: string;
  images?: string[];
  deviceType?: 'mobile' | 'desktop' | 'none';
}

function ProjectMedia({ title, images = [], deviceType = 'desktop' }: ProjectMediaProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="border-base-content/10 bg-base-300/50 flex h-full w-full items-center justify-center rounded-2xl border">
        <span className="text-base-content/40 font-mono">No images provided</span>
      </div>
    );
  }

  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const goToPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  const goToIndex = (index: number) => setCurrentIndex(index);

  const renderGallery = (imgClass: string, bgClass: string = 'bg-base-100') => (
    <div className={`group relative h-full w-full overflow-hidden ${bgClass}`}>
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} screenshot ${currentIndex + 1}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className={`h-full w-full ${imgClass}`}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={goToPrev}
            className="btn btn-circle btn-xs md:btn-sm absolute top-1/2 left-2 -translate-y-1/2 border-none bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
          >
            ❮
          </button>
          <button
            onClick={goToNext}
            className="btn btn-circle btn-xs md:btn-sm absolute top-1/2 right-2 -translate-y-1/2 border-none bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100 hover:bg-black/80"
          >
            ❯
          </button>
          <div className="absolute right-0 bottom-3 left-0 flex justify-center gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToIndex(idx)}
                className={`h-2 w-2 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-primary' : 'bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );

  // --- WARIANT MOBILNY (Realistyczny Custom iPhone CSS) ---
  if (deviceType === 'mobile') {
    return (
      <div className="flex h-full w-full items-center justify-center p-4">
        <div className="relative mx-auto h-135 w-65 rounded-[2.5rem] border-12 border-black bg-black shadow-2xl ring-1 ring-white/10 transition-transform duration-500 hover:scale-[1.02] md:h-145 md:w-70">
          <div className="absolute top-24 -left-3.5 h-12 w-0.5 rounded-l-md bg-gray-700"></div>
          <div className="absolute top-40 -left-3.5 h-12 w-0.5 rounded-l-md bg-gray-700"></div>
          <div className="absolute top-32 -right-3.5 h-16 w-0.5 rounded-r-md bg-gray-700"></div>

          <div className="absolute top-0 left-1/2 z-20 h-5 w-1/3 -translate-x-1/2 rounded-b-xl bg-black">
            <div className="absolute top-1 right-3 h-2 w-2 rounded-full bg-gray-800/80 shadow-inner"></div>
          </div>

          <div className="relative h-full w-full overflow-hidden rounded-[1.8rem] bg-black">
            {renderGallery('object-cover object-top', 'bg-black')}
          </div>
        </div>
      </div>
    );
  }

  // --- WARIANT DESKTOPOWY (Custom macOS Window) ---
  if (deviceType === 'desktop') {
    return (
      <div className="flex w-full items-center justify-center overflow-hidden py-4 md:py-8">
        <div className="border-base-content/20 bg-base-300 relative w-full max-w-3xl rounded-xl border shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
          <div className="bg-base-300/80 flex h-10 w-full items-center rounded-t-xl px-4 backdrop-blur-md">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/90 shadow-sm"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500/90 shadow-sm"></div>
              <div className="h-3 w-3 rounded-full bg-green-500/90 shadow-sm"></div>
            </div>
            <div className="bg-base-100/50 text-base-content/50 mx-auto flex h-6 w-1/2 items-center justify-center rounded-md text-[10px] font-medium tracking-wider">
              {title.toLowerCase().replace(/\s+/g, '-')}.app
            </div>
          </div>

          <div className="bg-base-100 border-base-content/10 relative aspect-video w-full overflow-hidden rounded-b-xl border-t">
            {renderGallery('object-cover object-top')}
          </div>
        </div>
      </div>
    );
  }

  // --- WARIANT DOMYŚLNY (Brak ramki) ---
  return (
    <div className="border-base-content/10 relative aspect-video w-full overflow-hidden rounded-2xl border shadow-xl transition-transform duration-500 hover:scale-[1.02]">
      {renderGallery('object-cover')}
    </div>
  );
}

export default ProjectMedia;
