import React from 'react';
import { type ProjectItem, type ProjectStatus, type TechColor } from '../../../data/projectData';

interface ProjectCardProps extends ProjectItem {
  variant: 'featured' | 'grid';
}

const getTechColorClasses = (color: TechColor) => {
  switch (color) {
    case 'blue':
      return 'border-blue-500/20 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20';
    case 'emerald':
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20';
    case 'violet':
      return 'border-violet-500/20 bg-violet-500/10 text-violet-500 hover:bg-violet-500/20';
  }
};

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case 'Live':
      return 'badge-success';
    case 'In Progress':
      return 'badge-warning';
    case 'Completed':
      return 'badge-neutral';
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  variant,
  title,
  description,
  techStack,
  techColor,
  status,
  team,
  links,
  imagePlaceholder,
}) => {
  const techClasses = getTechColorClasses(techColor);

  const badgesContent = (
    <div className={`flex gap-1 ${variant === 'grid' ? 'shrink-0 flex-col items-end' : ''}`}>
      {status && (
        <span
          className={`badge ${getStatusColor(status)} badge-sm badge-outline ${variant === 'grid' ? 'text-[10px]' : ''}`}
        >
          {status}
        </span>
      )}
      {team && (
        <span
          className={`badge badge-info badge-sm badge-outline ${variant === 'grid' ? 'text-[10px]' : ''}`}
        >
          {team}
        </span>
      )}
    </div>
  );

  // WARIANT 1: Wielka karta (Featured)
  if (variant === 'featured') {
    return (
      <div className="bg-base-200/60 border-base-content/10 hover:bg-base-200/80 flex flex-col rounded-3xl border p-6 backdrop-blur-sm transition-colors">
        <div className="bg-base-300 mb-6 flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl">
          <span className="text-base-content/40 font-medium">{imagePlaceholder}</span>
        </div>

        <div className="mb-3 flex items-center justify-between gap-3">
          <h3 className="text-base-content text-2xl font-bold">{title}</h3>
          {badgesContent}
        </div>

        <p className="text-base-content/70 mb-5 leading-relaxed">{description}</p>

        <div className="mb-6 flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${techClasses}`}
            >
              {tech}
            </span>
          ))}
        </div>

        {links && (
          <div className="flex gap-4">
            {links.map((link, i) => (
              <a
                key={i}
                href={link.url}
                className={`btn btn-sm rounded-full px-6 ${link.primary ? 'btn-primary' : 'btn-outline'}`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  }

  // WARIANT 2: Mała karta (Grid)
  return (
    <div className="bg-base-200/60 border-base-content/10 hover:bg-base-200/80 flex flex-col rounded-3xl border p-6 backdrop-blur-sm transition-colors">
      <div className="mb-2 flex items-start justify-between gap-2">
        <h4 className="text-base-content text-xl leading-tight font-bold">{title}</h4>
        {badgesContent}
      </div>

      <p className="text-base-content/70 mb-4 grow text-sm">{description}</p>

      <div className="mb-4 flex flex-wrap gap-1">
        {techStack.map((tech) => (
          <span
            key={tech}
            className={`rounded-full border px-2 py-1 text-[10px] font-medium transition-colors ${techClasses}`}
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};
