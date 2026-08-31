import { useFrame } from '@react-three/fiber';
import React, { type RefObject, useRef } from 'react';
import * as THREE from 'three';
import { useMediaQuery } from '../../../hooks/useMediaQuery'; // dostosuj ścieżkę

interface AvatarSceneProps {
  scrollRef: RefObject<number>;
}

export const AvatarScene: React.FC<AvatarSceneProps> = ({ scrollRef }) => {
  const avatarGroup = useRef<THREE.Group>(null);
  const headBone = useRef<THREE.Group>(null);

  const isMobile = useMediaQuery('(max-width: 768px)');

  const baseX = isMobile ? 0 : 2;
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

    if (headBone.current) {
      const multiplier = isMobile ? 0.3 : 0.8;
      const targetRotY = state.pointer.x * multiplier;
      const targetRotX = -state.pointer.y * (multiplier * 0.6);

      headBone.current.rotation.y = THREE.MathUtils.damp(
        headBone.current.rotation.y,
        targetRotY,
        6,
        delta
      );
      headBone.current.rotation.x = THREE.MathUtils.damp(
        headBone.current.rotation.x,
        targetRotX,
        6,
        delta
      );
    }
  });

  return (
    <group ref={avatarGroup} position={[baseX, -1, 0]} scale={avatarScale}>
      {/* Ciało / Tułów */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0.4, 0.4, 1.2, 16]} />
        <meshStandardMaterial color="#4f46e5" roughness={0.3} />
      </mesh>

      {/* Głowa śledząca kursor */}
      <group ref={headBone} position={[0, 1.9, 0]}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial color="#ec4899" roughness={0.2} />
        </mesh>
        <mesh position={[0, 0, 0.35]}>
          <boxGeometry args={[0.1, 0.1, 0.2]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>
      </group>
    </group>
  );
};
