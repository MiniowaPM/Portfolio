import React from 'react';

interface ContactSlideProps {
  topOffset: number;
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
}

function ContactSlide({ topOffset, setToast }: ContactSlideProps) {
  const handleDiscordCopy = () => {
    navigator.clipboard.writeText('miniowa123');
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <section
      className="slide-panel pointer-events-auto absolute left-[300vw] flex h-screen w-screen flex-col justify-center px-8 md:pr-12 md:pl-[50vw] lg:pr-24"
      style={{ top: topOffset }}
    >
      <div className="ml-auto flex max-w-xl flex-col items-end gap-8 text-right">
        <div>
          <h2 className="text-base-content mb-4 text-5xl font-bold">Let's Connect</h2>
          <p className="text-base-content/80 text-lg leading-relaxed">
            I'm currently open to new opportunities. Whether you have a question, a project in mind,
            or just want to say hi, I'll try my best to get back to you!
          </p>
        </div>

        {/* Główne przyciski akcji (Mail & CV) - dodano justify-end */}
        <div className="flex flex-col justify-end gap-4 sm:flex-row">
          <a
            href="mailto:mikolaj.molodecki133@gmail.com"
            className="btn btn-primary btn-lg shadow-[0_0_15px_rgba(var(--color-primary),0.3)] transition-transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            Say Hello
          </a>

          <a
            href="content/Resume.pdf"
            download="Mikolaj_Molodecki_CV.pdf"
            className="btn btn-outline btn-lg transition-transform hover:scale-105"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Download CV
          </a>
        </div>

        {/* Linki do profili społecznościowych - dodano justify-end i w-full */}
        <div className="border-base-content/10 mt-4 flex w-full items-center justify-end gap-6 border-t pt-6">
          {/* GitHub */}
          <a
            href="https://github.com/MiniowaPM"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base-content/70 hover:text-base-content flex items-center gap-2 transition-all hover:scale-105"
          >
            <span className="font-medium">GitHub</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              {/* Zwróć uwagę, że ikonę dałem PO tekście, żeby zachować rytm prawej strony */}
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>

          {/* Discord */}
          <div
            className="text-base-content/70 flex cursor-pointer items-center gap-2 transition-all hover:scale-105 hover:text-[#5865F2]"
            onClick={handleDiscordCopy}
            title="Click to copy Discord username"
          >
            <span className="font-medium">Discord</span>
            {/* Ikona też po tekście */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 256 200"
              fill="currentColor"
            >
              <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSlide;
