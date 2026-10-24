import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLocale } from '../../context/useLocale';
import { translations } from '../../i18n/translations';

export const Navbar: React.FC = () => {
  const { locale, setLocale } = useLocale();
  const t = translations[locale];
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [scrolledSection, setScrolledSection] = React.useState<string | null>(null);
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

        {/* Center: Clean Nav Links with stable widths */}
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

        {/* Right Actions: Language Toggle & CV Pill Button */}
        <div className="flex items-center gap-2 sm:gap-3">
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
      </nav>
    </header>
  );
};
