function AboutSlide() {
  return (
    <section className="slide-panel pointer-events-auto absolute top-0 left-[100vw] flex h-screen w-screen flex-col justify-center px-8 md:pr-[45vw] md:pl-20">
      <div className="flex max-w-2xl flex-col gap-6">
        <div>
          <h2 className="text-base-content mb-4 text-5xl font-bold">About Me</h2>
          <p className="text-base-content/80 text-lg leading-relaxed">
            I am passionate about creating applications, continuous learning, and solving complex
            problems with code. My path combines solid engineering with creativity – from web and
            mobile development to game engines and VFX.
          </p>
        </div>

        {/* 3. Tech Stack (Subtelne, hardcodowane kolory) */}
        <div className="flex flex-wrap gap-2">
          {/* Game Dev & Languages - Zgaszony Niebieski */}
          {[
            'HTML',
            'CSS',
            'JavaScript / TypeScript',
            'C#',
            'Python',
            'Unity',
            'HLSL /GLSL',
            'VFX',
          ].map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-sm text-blue-500 transition-colors hover:bg-blue-500/20"
            >
              {tech}
            </span>
          ))}

          {/* Web & Mobile - Zgaszony Szmaragd */}
          {['React', 'React Native', 'Flutter', 'Tailwind CSS', 'HTML/CSS'].map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-500 transition-colors hover:bg-emerald-500/20"
            >
              {tech}
            </span>
          ))}

          {/* Backend, DB, DevOps - Zgaszony Fiolet */}
          {[
            'SQL',
            'PostgreSQL',
            'MySQL',
            'Supabase',
            'Appwrite',
            'FastAPI',
            'Flask',
            'Spring Boot',
            'Docker',
            'Git',
          ].map((tech) => (
            <span
              key={tech}
              className="cursor-default rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-500 transition-colors hover:bg-violet-500/20"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 4. Hobbies (Karty z tytułami w base-content) */}
        <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
          {/* Sports */}
          <div className="bg-base-200/60 border-base-content/10 rounded-box hover:bg-base-200/80 border p-5 backdrop-blur-sm transition-colors">
            <h4 className="text-base-content text-md mb-2 font-bold">🏐 Sports & Outdoors</h4>
            <p className="text-base-content/70 text-sm leading-tight">
              AZS Maritime University volleyball representative & Polish Academic Championships
              semi-finalist. Also passionate about skiing and kayaking.
            </p>
          </div>
          {/* Gaming & Game Development */}
          <div className="bg-base-200/60 border-base-content/10 rounded-box hover:bg-base-200/80 border p-5 backdrop-blur-sm transition-colors">
            <h4 className="text-base-content text-md mb-2 font-bold">🎮 Gaming & Game Dev</h4>
            <p className="text-base-content/70 text-sm leading-tight">
              Enthusiast of story-driven and competitive video games. I value gaming and creating
              them as a tool for developing strategic thinking and problem-solving skills.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSlide;
