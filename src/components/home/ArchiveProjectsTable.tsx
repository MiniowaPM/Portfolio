import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLocale } from '../../context/useLocale';
import { GRID_PROJECTS } from '../../data/projectData';

export const ArchiveProjectsTable: React.FC = () => {
  const { locale } = useLocale();

  return (
    <section id="archive" className="w-full bg-[#F3F3F1] py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-4 md:px-6">
        {/* Section Headline */}
        <div className="mb-12 max-w-2xl">
          <span className="font-sans text-[13px] font-black uppercase tracking-wider text-[#254F1A]">
            {locale === 'en' ? 'More Experiments & Work' : 'Pozostałe Projekty i Eksperymenty'}
          </span>
          <h2 className="mt-2 font-display text-[38px] font-black leading-[1.05] tracking-[-0.035em] text-[#1E2330] sm:text-[48px]">
            {locale === 'en'
              ? 'Prototypes, hackathons & algorithmic code.'
              : 'Prototypy, hackathony i algorytmy.'}
          </h2>
        </div>

        {/* Card Deck Grid (3 Columns x 3 Rows = 9 Cards) */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {GRID_PROJECTS.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: idx * 0.04, duration: 0.3 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between rounded-[32px] bg-[#FFFFFF] p-7 shadow-sm transition-shadow duration-300 hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#F3F3F1] px-3 py-1 font-sans text-[12px] font-bold text-[#1E2330]">
                    {proj.status}
                  </span>
                  <span className="font-sans text-[12.5px] font-bold text-[#71717A]">
                    {proj.team}
                  </span>
                </div>

                {proj.slug ? (
                  <Link to={`/projects/${proj.slug}`}>
                    <h3 className="mt-4 font-display text-[22px] font-black tracking-[-0.025em] text-[#1E2330] transition-colors hover:text-[#254F1A]">
                      {proj.title}
                    </h3>
                  </Link>
                ) : (
                  <h3 className="mt-4 font-display text-[22px] font-black tracking-[-0.025em] text-[#1E2330]">
                    {proj.title}
                  </h3>
                )}

                <p className="mt-2.5 font-sans text-[15px] font-medium leading-[1.6] text-[#4A4F5C]">
                  {proj.description[locale]}
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-black/5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-[#F3F3F1] px-3 py-1 font-sans text-[12px] font-bold text-[#1E2330]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {proj.links.map((link, lIdx) => {
                    const isInternal = link.url.startsWith('/');
                    const isPrimary = link.primary || lIdx === 0;

                    if (isInternal) {
                      return (
                        <Link
                          key={lIdx}
                          to={link.url}
                          className={`flex h-9 items-center rounded-full px-4 font-sans text-[13px] font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 ${
                            isPrimary
                              ? 'bg-[#254F1A] text-[#D2E823] hover:bg-[#1E2330]'
                              : 'bg-[#F3F3F1] text-[#1E2330] hover:bg-[#E5E5E0]'
                          }`}
                        >
                          {link.label}
                        </Link>
                      );
                    }

                    return (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex h-9 items-center rounded-full px-4 font-sans text-[13px] font-bold shadow-sm transition-transform hover:scale-105 active:scale-95 ${
                          isPrimary
                            ? 'bg-[#1E2330] text-[#FFFFFF] group-hover:bg-[#254F1A] group-hover:text-[#D2E823]'
                            : 'bg-[#F3F3F1] text-[#1E2330] hover:bg-[#E5E5E0]'
                        }`}
                      >
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
