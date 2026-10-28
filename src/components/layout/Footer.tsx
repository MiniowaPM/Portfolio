import React from 'react';

interface FooterProps {
  theme?: 'dark' | 'burgundy' | 'light';
}

export const Footer: React.FC<FooterProps> = ({ theme = 'dark' }) => {
  const isBurgundy = theme === 'burgundy';
  const isLight = theme === 'light';

  const containerClasses = isLight
    ? 'w-full bg-[#F3F3F1] border-t border-black/10 py-8'
    : isBurgundy
      ? 'w-full bg-[#780016] border-t border-white/10 py-6'
      : 'w-full bg-[#1E2330] border-t border-white/10 py-8';

  const textClasses = isLight
    ? 'font-sans text-[13.5px] font-bold text-[#4A4F5C]'
    : isBurgundy
      ? 'font-sans text-[13.5px] font-bold text-[#E9C0E9]'
      : 'font-sans text-[13.5px] font-bold text-white/80';

  const badgeClasses = isLight
    ? 'rounded-full bg-black/5 px-4 py-1.5 font-sans text-[12px] font-semibold text-[#1E2330]'
    : isBurgundy
      ? 'rounded-full bg-white/10 px-4 py-1.5 font-sans text-[12px] font-semibold text-[#F3F3F1]'
      : 'rounded-full bg-white/10 px-4 py-1.5 font-sans text-[12px] font-semibold text-white/90';

  return (
    <footer className={containerClasses}>
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 px-4 sm:flex-row md:px-6">
        <span className={textClasses}>
          © {new Date().getFullYear()} Mikołaj Mołodecki · Software Engineer
        </span>
        <span className={badgeClasses}>
          Szczecin, Poland · Politechnika Morska
        </span>
      </div>
    </footer>
  );
};
