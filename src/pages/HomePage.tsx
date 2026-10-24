import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArchiveProjectsTable } from '../components/home/ArchiveProjectsTable';
import { ContactBento } from '../components/home/ContactBento';
import { EngineeringContextRow } from '../components/home/EngineeringContextRow';
import { FeaturedBentoGrid } from '../components/home/FeaturedBentoGrid';
import { HeroBento } from '../components/home/HeroBento';

export const HomePage: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Mikołaj Mołodecki — Software Engineer';
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="relative w-full">
      {/* SECTION 01: Hero Block (Canopy Green #254F1A + Electric Lime #D2E823) */}
      <HeroBento />

      {/* SECTION 02: Featured Projects Bento (Warm Alabaster #F3F3F1 + Bold Color Pairs) */}
      <FeaturedBentoGrid />

      {/* SECTION 03: Engineering Context & Photography (Soft Rose #E9C0E9 + Deep Burgundy #780016) */}
      <EngineeringContextRow />

      {/* SECTION 04: Archive & Prototypes (Warm Alabaster #F3F3F1 + Tactile Row Cards) */}
      <ArchiveProjectsTable />

      {/* SECTION 05: Contact & Footer Block (Deep Burgundy #780016 + Royal Plum #502274) */}
      <ContactBento />
    </div>
  );
};

export default HomePage;
