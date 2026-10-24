import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { translations } from '../../i18n/translations';

export const Navbar: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolledSection, setScrolledSection] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = isHomePage ? scrolledSection : null;

  React.useEffect(() => {
    if (!isHomePage) return;

    const handleScroll = () => {
      const contactEl = document.getElementById('contact');
      const workEl = document.getElementById('work');

      const windowHeight = window.innerHeight;

      if (contactEl && contactEl.getBoundingClientRect().top <= windowHeight * 0.4) {
        setScrolledSection('contact');
      } else if (workEl && workEl.getBoundingClientRect().top <= windowHeight * 0.4) {
        setScrolledSection('work');
      } else {
        setScrolledSection(null);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);


  const handleScrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="fixed top-5 right-0 left-0 z-50 mx-auto w-[calc(100%-32px)] max-w-[1240px]">
      <nav
        aria-label="Global Navigation"
        className="flex h-[72px] w-full items-center justify-between rounded-full bg-[#FFFFFF] pl-7 pr-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] md:pl-8 md:pr-4"
      >
        {/* Left: Brand Name Wordmark */}
        <Link
          to="/"
          className="inline-flex shrink-0 items-center font-display text-[19px] font-extrabold tracking-[-0.01em] text-[#1E2330] transition-opacity hover:opacity-80 whitespace-nowrap"
        >
          <span>Mikołaj</span>
          <span className="ml-1.5">Mołodecki</span>
        </Link>

        {/* Center: Clean Nav Links with stable widths (Desktop) */}
        <div className="hidden items-center gap-1 sm:flex">
          {location.pathname === '/' ? (
            <button
              type="button"
              onClick={() => handleScrollTo('work')}
              className={`inline-flex min-w-[92px] cursor-pointer items-center justify-center rounded-full px-4 py-2 font-sans text-[15px] font-semibold text-[#1E2330] transition-colors hover:bg-[#F3F3F1] ${
                activeSection === 'work' ? 'bg-[#F3F3F1]' : ''
              }`}
            >
              {t.nav.projects}
            </button>
          ) : (
            <Link
              to="/#work"
              className="inline-flex min-w-[92px] items-center justify-center rounded-full px-4 py-2 font-sans text-[15px] font-semibold text-[#1E2330] transition-colors hover:bg-[#F3F3F1]"
            >
              {t.nav.projects}
            </Link>
          )}

          <Link
            to="/about"
            className={`inline-flex min-w-[92px] items-center justify-center rounded-full px-4 py-2 font-sans text-[15px] font-semibold text-[#1E2330] transition-colors hover:bg-[#F3F3F1] ${
              location.pathname === '/about' ? 'bg-[#F3F3F1]' : ''
            }`}
          >
            {t.nav.about}
          </Link>

          {location.pathname === '/' ? (
            <button
              type="button"
              onClick={() => handleScrollTo('contact')}
              className={`inline-flex min-w-[92px] cursor-pointer items-center justify-center rounded-full px-4 py-2 font-sans text-[15px] font-semibold text-[#1E2330] transition-colors hover:bg-[#F3F3F1] ${
                activeSection === 'contact' ? 'bg-[#F3F3F1]' : ''
              }`}
            >
              {t.nav.contact}
            </button>
          ) : (
            <Link
              to="/#contact"
              className="inline-flex min-w-[92px] items-center justify-center rounded-full px-4 py-2 font-sans text-[15px] font-semibold text-[#1E2330] transition-colors hover:bg-[#F3F3F1]"
            >
              {t.nav.contact}
            </Link>
          )}
        </div>

        {/* Right Actions: Language Toggle & CV Pill Button (Desktop) */}
        <div className="hidden sm:flex items-center gap-2 sm:gap-3">
          <div className="flex items-center rounded-full bg-[#F3F3F1] p-1 font-sans text-[13.5px] font-bold">
            <button
              type="button"
              onClick={() => setLocale('en')}
              className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                locale === 'en'
                  ? 'bg-[#1E2330] text-[#FFFFFF]'
                  : 'text-[#1E2330] hover:text-black'
              }`}
              aria-label="Switch language to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale('pl')}
              className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                locale === 'pl'
                  ? 'bg-[#1E2330] text-[#FFFFFF]'
                  : 'text-[#1E2330] hover:text-black'
              }`}
              aria-label="Przełącz język na Polski"
            >
              PL
            </button>
          </div>

          <a
            href="/content/Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-11 items-center rounded-full bg-[#1E2330] px-6 font-sans text-[14.5px] font-bold text-[#FFFFFF] shadow-sm transition-transform hover:bg-[#2E364A] hover:scale-[1.02] active:scale-95"
          >
            {t.nav.cv}
          </a>
        </div>

        {/* Mobile Menu Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#F3F3F1] text-[#1E2330] transition-colors hover:bg-[#E5E5E0] sm:hidden"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? (
            <span className="text-xl font-bold leading-none">✕</span>
          ) : (
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile Animated Dropdown Menu Card */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mt-2.5 flex flex-col gap-1.5 rounded-[28px] bg-[#FFFFFF] p-3 shadow-[0_16px_40px_rgba(0,0,0,0.16)] sm:hidden border border-black/5"
          >
            {location.pathname === '/' ? (
              <button
                type="button"
                onClick={() => handleScrollTo('work')}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-full px-5 font-sans text-[15px] font-bold text-[#1E2330] hover:bg-[#F3F3F1] active:bg-[#F3F3F1] transition-colors"
              >
                <span>{t.nav.projects}</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/#work"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-between rounded-full px-5 font-sans text-[15px] font-bold text-[#1E2330] hover:bg-[#F3F3F1] active:bg-[#F3F3F1] transition-colors"
              >
                <span>{t.nav.projects}</span>
                <span>→</span>
              </Link>
            )}

            <Link
              to="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex h-11 w-full items-center justify-between rounded-full px-5 font-sans text-[15px] font-bold text-[#1E2330] hover:bg-[#F3F3F1] active:bg-[#F3F3F1] transition-colors"
            >
              <span>{t.nav.about}</span>
              <span>→</span>
            </Link>

            {location.pathname === '/' ? (
              <button
                type="button"
                onClick={() => handleScrollTo('contact')}
                className="flex h-11 w-full cursor-pointer items-center justify-between rounded-full px-5 font-sans text-[15px] font-bold text-[#1E2330] hover:bg-[#F3F3F1] active:bg-[#F3F3F1] transition-colors"
              >
                <span>{t.nav.contact}</span>
                <span>→</span>
              </button>
            ) : (
              <Link
                to="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-between rounded-full px-5 font-sans text-[15px] font-bold text-[#1E2330] hover:bg-[#F3F3F1] active:bg-[#F3F3F1] transition-colors"
              >
                <span>{t.nav.contact}</span>
                <span>→</span>
              </Link>
            )}

            <div className="mt-1 pt-2.5 border-t border-black/5 flex items-center justify-between gap-3 px-1 pb-1">
              <div className="flex items-center rounded-full bg-[#F3F3F1] p-1 font-sans text-[13px] font-bold">
                <button
                  type="button"
                  onClick={() => setLocale('en')}
                  className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                    locale === 'en'
                      ? 'bg-[#1E2330] text-[#FFFFFF]'
                      : 'text-[#1E2330] hover:text-black'
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLocale('pl')}
                  className={`cursor-pointer rounded-full px-3 py-1.5 transition-colors ${
                    locale === 'pl'
                      ? 'bg-[#1E2330] text-[#FFFFFF]'
                      : 'text-[#1E2330] hover:text-black'
                  }`}
                >
                  PL
                </button>
              </div>

              <a
                href="/content/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 flex-1 items-center justify-center rounded-full bg-[#1E2330] px-5 font-sans text-[13.5px] font-bold text-[#FFFFFF] shadow-sm transition-transform active:scale-95"
              >
                {t.nav.cv}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
