import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { LocaleProvider } from './context/LocaleContext';
import { AboutPage } from './pages/AboutPage';
import { HomePage } from './pages/HomePage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';

const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
};

export function App() {
  return (
    <LocaleProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="relative min-h-screen w-full bg-[#F3F3F1] text-[#1E2330] selection:bg-[#D2E823] selection:text-[#1E2330]">
          {/* Floating White Pill Navbar */}
          <Navbar />

          {/* Main content with full-bleed section capability */}
          <main className="relative w-full">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </LocaleProvider>
  );
}

export default App;
