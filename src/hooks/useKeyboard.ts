import { useEffect, useState } from 'react';

export const useKeyboard = () => {
  const [keys, setKeys] = useState({ forward: false, backward: false, left: false, right: false });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') setKeys((k) => ({ ...k, forward: true }));
      if (key === 's' || key === 'arrowdown') setKeys((k) => ({ ...k, backward: true }));
      if (key === 'a' || key === 'arrowleft') setKeys((k) => ({ ...k, left: true }));
      if (key === 'd' || key === 'arrowright') setKeys((k) => ({ ...k, right: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === 'w' || key === 'arrowup') setKeys((k) => ({ ...k, forward: false }));
      if (key === 's' || key === 'arrowdown') setKeys((k) => ({ ...k, backward: false }));
      if (key === 'a' || key === 'arrowleft') setKeys((k) => ({ ...k, left: false }));
      if (key === 'd' || key === 'arrowright') setKeys((k) => ({ ...k, right: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return keys;
};
