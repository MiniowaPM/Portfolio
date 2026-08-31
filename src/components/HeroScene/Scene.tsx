import { useFrame } from '@react-three/fiber';
import React, { type RefObject, useRef } from 'react';
import * as THREE from 'three';
import { useMediaQuery } from '../../hooks/useMediaQuery'; // dostosuj ścieżkę
import { Avatar } from './Avatar';

interface AvatarSceneProps {
  scrollRef: RefObject<number>;
}

export const AvatarScene: React.FC<AvatarSceneProps> = ({ scrollRef }) => {
  const avatarGroup = useRef<THREE.Group>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const baseX = isMobile ? 0 : 1;
  const avatarScale = isMobile ? 0.8 : 1;

  useFrame((state, delta) => {
    if (avatarGroup.current) {
      const scrollOffset = isMobile ? 0 : scrollRef.current * 1.5;
      const targetX = baseX + scrollOffset;

      avatarGroup.current.position.x = THREE.MathUtils.damp(
        avatarGroup.current.position.x,
        targetX,
        4,
        delta
      );
    }
  });

  return (
    <group ref={avatarGroup} position={[baseX, -1, 0]} scale={avatarScale}>
      <Avatar />
    </group>
  );
};
