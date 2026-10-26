import React, { useState } from 'react';
import { useLocale } from '../../context/useLocale';
import { translations } from '../../i18n/translations';
import { CheckIcon, CopyIcon, GitHubIcon, LinkedInIcon } from '../ui/BrandIcons';

export const ContactBento: React.FC = () => {
  const { locale } = useLocale();
  const t = translations[locale];
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('mikolaj.molodecki133@gmail.com');
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <section
      id="contact"
      className="relative flex w-full min-h-screen flex-col justify-between bg-[#780016] px-4 pt-24 pb-8 sm:px-6 lg:h-screen lg:max-h-screen lg:pt-20 lg:pb-6"
    >
      {/* Vertically Centered Main CTA Content */}
      <div className="mx-auto flex w-full max-w-[1240px] flex-1 flex-col items-center justify-center text-center">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 rounded-full bg-[#E9C0E9]/15 px-4 py-1.5 font-sans text-[13px] font-bold text-[#E9C0E9]">
          <span>{locale === 'en' ? 'Get In Touch' : 'Kontakt'}</span>
        </div>

        {/* Monumental Centered Headline */}
        <h2 className="mx-auto mt-6 max-w-4xl font-display text-[38px] font-black leading-[1.02] tracking-[-0.04em] text-[#E9C0E9] sm:text-[54px] md:text-[68px]">
          {locale === 'en' ? "Let's build something together." : 'Zbudujmy coś wspólnie.'}
        </h2>

        {/* Subtext with stable min-height */}
        <div className="mx-auto mt-5 min-h-[48px] max-w-2xl sm:min-h-[56px]">
          <p className="font-sans text-[16.5px] font-medium leading-[1.6] text-[#F3F3F1] sm:text-[18.5px]">
            {t.contact.subtext}
          </p>
        </div>

        {/* Chunky Action Pills in Centered Row */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3.5 sm:mt-10 sm:gap-4">
          {/* Copy Email */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="flex h-13 min-w-[180px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#D2E823] px-8 font-sans text-[15.5px] font-bold text-[#1E2330] shadow-xl transition-transform hover:scale-105 active:scale-95"
          >
            {isCopied ? (
              <>
                <CheckIcon className="h-4 w-4 text-[#254F1A]" />
                <span>{t.contact.copied} ✓</span>
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 text-[#1E2330]" />
                <span>{t.contact.copyEmail}</span>
              </>
            )}
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/MiniowaPM"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 items-center gap-2.5 rounded-full bg-[#E9C0E9] px-7 font-sans text-[15px] font-bold text-[#1E2330] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <GitHubIcon className="h-4 w-4" />
            <span>GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/miko%C5%82aj-mo%C5%82odecki-2b135043b/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 items-center gap-2.5 rounded-full bg-[#FFFFFF] px-7 font-sans text-[15px] font-bold text-[#1E2330] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <LinkedInIcon className="h-4 w-4" />
            <span>LinkedIn</span>
          </a>

          {/* Download CV */}
          <a
            href="/content/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-13 items-center gap-2.5 rounded-full bg-[#254F1A] px-7 font-sans text-[15px] font-bold text-[#D2E823] shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span>{t.contact.downloadCv}</span>
          </a>
        </div>
      </div>

      {/* Clean Linktree-style Bottom Footer Bar */}
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-between gap-4 border-t border-white/10 pt-4 pb-2 sm:flex-row">
        <span className="font-sans text-[13.5px] font-bold text-[#E9C0E9]">
          © {new Date().getFullYear()} Mikołaj Mołodecki · Software Engineer
        </span>
        <span className="rounded-full bg-white/10 px-4 py-1.5 font-sans text-[12px] font-semibold text-[#F3F3F1]">
          Szczecin, Poland · Politechnika Morska
        </span>
      </div>
    </section>
  );
};
