import { useEffect } from 'react';

export function useRouteTheme(lightTheme: string, darkTheme: string) {
  useEffect(() => {
    const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

    const updateTheme = () => {
      const isDark = matchMedia.matches;
      document.documentElement.setAttribute('data-theme', isDark ? darkTheme : lightTheme);
    };

    updateTheme();

    matchMedia.addEventListener('change', updateTheme);

    return () => {
      matchMedia.removeEventListener('change', updateTheme);
    };
  }, [lightTheme, darkTheme]);
}
