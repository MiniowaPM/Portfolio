import { useFrame } from '@react-three/fiber';
import React, { type RefObject, useRef, useState } from 'react';
import * as THREE from 'three';
import { Avatar } from './Avatar';

type ActionName = 'Idle' | 'JumpAttack' | 'Typing' | 'Walking' | 'Waving';

interface AvatarSceneProps {
  scrollRef: RefObject<number>;
}

const MAX_SCENE_WIDTH = 50;
const AVATAR_OFFSET_X = 2.5;
const BASE_SCALE = 1.5;
const MIN_WALK_SPEED = 3;
const MAX_WALK_SPEED = 4;

const slideCheckpoints = [
  { anim: 'Waving' as ActionName },
  { anim: 'JumpAttack' as ActionName },
  { anim: 'Typing' as ActionName },
  { anim: 'Idle' as ActionName },
];

export const AvatarScene: React.FC<AvatarSceneProps> = ({ scrollRef }) => {
  const avatarGroup = useRef<THREE.Group>(null);

  const [currentAnim, setCurrentAnim] = useState<ActionName>('Idle');

  const walkSpeedRef = useRef(1);

  const smoothedMouse = useRef(new THREE.Vector2(0, 0));

  useFrame((state, delta) => {
    if (!avatarGroup.current || scrollRef.current === null) return;

    const scroll = scrollRef.current;

    let customScrollX: number;

    if (scroll < 0.5) {
      customScrollX = (scroll / 0.5) * 0.6666;
    } else if (scroll >= 0.5 && scroll < 0.75) {
      customScrollX = 0.6666;
    } else {
      customScrollX = 0.6666 + ((scroll - 0.75) / 0.25) * 0.3334;
    }

    const baseCameraX = customScrollX * MAX_SCENE_WIDTH;

    const parallaxX = THREE.MathUtils.clamp(smoothedMouse.current.x * 1.5, -2, 2);
    const parallaxY = THREE.MathUtils.clamp(smoothedMouse.current.y * 0.8, -1, 1);

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      baseCameraX + parallaxX,
      5,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, parallaxY, 5, delta);

    const avatarTargetX = baseCameraX + AVATAR_OFFSET_X;
    const avatar = avatarGroup.current;
    const distance = Math.abs(avatar.position.x - avatarTargetX);

    const totalSlides = slideCheckpoints.length;
    const currentSlide = Math.round(scroll * (totalSlides - 1));
    const targetAnim = slideCheckpoints[currentSlide].anim;

    if (distance > 0.05) {
      if (currentAnim !== 'Walking') setCurrentAnim('Walking');

      const direction = avatarTargetX > avatar.position.x ? 1 : -1;

      const dynamicSpeed = THREE.MathUtils.clamp(distance * 3, MIN_WALK_SPEED, MAX_WALK_SPEED);
      const step = dynamicSpeed * delta;

      if (distance < step) {
        avatar.position.x = avatarTargetX;
      } else {
        avatar.position.x += direction * step;
      }

      walkSpeedRef.current = dynamicSpeed / 4;

      const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, direction * (Math.PI / 2), 0)
      );
      avatar.quaternion.slerp(targetQuat, delta * 12);
    } else {
      if (currentAnim !== targetAnim) setCurrentAnim(targetAnim);

      avatar.position.x = avatarTargetX;

      const frontQuat = new THREE.Quaternion().setFromEuler(new THREE.Euler(0, 0, 0));
      avatar.quaternion.slerp(frontQuat, delta * 8);
    }
  });

  return (
    <group ref={avatarGroup} scale={BASE_SCALE} position={[AVATAR_OFFSET_X, -2, -1.5]}>
      <Avatar animation={currentAnim} walkSpeedRef={walkSpeedRef} />
    </group>
  );
};
