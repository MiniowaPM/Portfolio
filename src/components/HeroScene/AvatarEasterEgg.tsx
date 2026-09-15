import { useCursor } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { polaroidStore } from '../../store/polaroidStore';

const PHOTO_DATA: Record<number, Array<{ src: string; caption: string }>> = {
  0: [
    { src: '/images/home-1.jpg', caption: 'Hello!' },
    { src: '/images/home-2.jpg', caption: 'Welcome to my world' },
  ],
  1: [
    { src: '/images/about-1.jpg', caption: 'AZS Maritime University' },
    { src: '/images/about-2.jpg', caption: 'Polish Academic Championships' },
  ],
  2: [
    { src: '/images/projects-1.jpg', caption: 'Cooking code...' },
    { src: '/images/projects-2.jpg', caption: 'Late night debugging' },
  ],
  3: [{ src: '/images/contact-1.jpg', caption: "Let's talk!" }],
};

interface AvatarEasterEggProps {
  activeSlide: number;
  children: React.ReactNode;
}

export function AvatarEasterEgg({ activeSlide, children }: AvatarEasterEggProps) {
  const [isPhotoVisible, setIsPhotoVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const avatarGroupRef = useRef<THREE.Group>(null!);

  useCursor(hovered, 'pointer', 'auto');

  const { camera, raycaster } = useThree();

  const currentGallery = PHOTO_DATA[activeSlide] || PHOTO_DATA[0];

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isPhotoVisible && currentGallery.length > 1) {
      interval = setInterval(() => {
        setPhotoIndex((prevIndex) => (prevIndex + 1) % currentGallery.length);
      }, 3500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPhotoVisible, currentGallery.length]);

  // Synchronizacja z naszym zewnętrznym store
  useEffect(() => {
    polaroidStore.set({ visible: isPhotoVisible, photoIndex });
  }, [isPhotoVisible, photoIndex]);

  useFrame((_, delta) => {
    if (avatarGroupRef.current) {
      const targetScale = isPhotoVisible ? 0.001 : 1;
      avatarGroupRef.current.scale.setScalar(
        THREE.MathUtils.damp(avatarGroupRef.current.scale.x, targetScale, 6, delta)
      );

      if (isPhotoVisible) {
        // Obliczamy współrzędne ekranu 2D (nie używamy <Html>, bo GSAP/R3F psuje scroll)
        const vector = new THREE.Vector3();
        avatarGroupRef.current.getWorldPosition(vector);
        vector.y += 2.2; // Offset Y dla polaroidu

        vector.project(camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-(vector.y * 0.5) + 0.5) * window.innerHeight;

        polaroidStore.set({ x, y });
      }
    }
  });

  useEffect(() => {
    if (hovered && !isPhotoVisible) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'auto';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [hovered, isPhotoVisible]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      // Ignoruj kliknięcia w interaktywne elementy HTML
      if (e.target instanceof HTMLElement && e.target.closest('a, button, .card')) {
        return;
      }

      if (!isPhotoVisible && avatarGroupRef.current) {
        let clientX, clientY;
        if ('touches' in e && e.touches.length > 0) {
          clientX = e.touches[0].clientX;
          clientY = e.touches[0].clientY;
        } else if ('clientX' in e) {
          clientX = (e as MouseEvent).clientX;
          clientY = (e as MouseEvent).clientY;
        } else {
          return;
        }

        const mouse = new THREE.Vector2(
          (clientX / window.innerWidth) * 2 - 1,
          -(clientY / window.innerHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);

        const avatarIntersects = raycaster.intersectObject(avatarGroupRef.current, true);
        if (avatarIntersects.length > 0) {
          setIsPhotoVisible(true);
        }
      }
    };

    window.addEventListener('click', handleClick as EventListener);
    window.addEventListener('touchstart', handleClick as EventListener);

    return () => {
      window.removeEventListener('click', handleClick as EventListener);
      window.removeEventListener('touchstart', handleClick as EventListener);
    };
  }, [camera, raycaster, isPhotoVisible]);

  useEffect(() => {
    // Nasłuchujemy na kliknięcie w zdjęcie, aby je zamknąć
    const unsub = polaroidStore.subscribe((state) => {
      // Zewnętrzny komponent `PolaroidOverlay` zaktualizuje `visible` na `false` przy kliknięciu
      if (!state.visible && isPhotoVisible) {
        setIsPhotoVisible(false);
      }
    });
    return () => {
      unsub();
    };
  }, [isPhotoVisible]);

  return (
    <group>
      <group
        ref={avatarGroupRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {children}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[2, 3, 2]} />
          <meshBasicMaterial transparent opacity={0} depthWrite={false} />
        </mesh>
      </group>
    </group>
  );
}
