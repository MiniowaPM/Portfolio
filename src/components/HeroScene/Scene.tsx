import { useFrame } from '@react-three/fiber';
import { type RefObject, useRef, useState } from 'react';
import * as THREE from 'three';
import { Avatar } from './Avatar';

type ActionName = 'Idle' | 'JumpAttack' | 'Typing' | 'Walking' | 'Waving';

interface AvatarSceneProps {
  scrollRef: RefObject<number>;
}

const MAX_SCENE_WIDTH = 50;
const BASE_SCALE = 1.5;
const MIN_WALK_SPEED = 3;
const MAX_WALK_SPEED = 4;

const slideCheckpoints = [
  { anim: 'Waving' as ActionName },
  { anim: 'JumpAttack' as ActionName },
  { anim: 'Typing' as ActionName },
  { anim: 'Idle' as ActionName },
];

export function AvatarScene({ scrollRef }: AvatarSceneProps) {
  const avatarGroup = useRef<THREE.Group>(null);
  const [currentAnim, setCurrentAnim] = useState<ActionName>('Idle');
  const walkSpeedRef = useRef(1);
  const smoothedMouse = useRef(new THREE.Vector2(0, 0));
  const lookAtTarget = useRef(new THREE.Vector3(0, 0, 0));
  const smoothedCamBaseX = useRef(0);

  useFrame((state, delta) => {
    if (!avatarGroup.current || scrollRef.current === null) return;

    const scroll = scrollRef.current;

    let customScrollX: number;

    let currentAvatarOffset = 2.5;

    if (scroll < 0.5) {
      customScrollX = (scroll / 0.5) * 0.6666;
    } else if (scroll >= 0.5 && scroll < 0.75) {
      customScrollX = 0.6666;
    } else {
      const sectionProgress = (scroll - 0.75) / 0.25;
      customScrollX = 0.6666 + sectionProgress * 0.3334;
      currentAvatarOffset = THREE.MathUtils.lerp(2.5, -5.0, sectionProgress);
    }

    const baseCameraX = customScrollX * MAX_SCENE_WIDTH;

    const avatarTargetX = baseCameraX + currentAvatarOffset;
    const avatar = avatarGroup.current;
    const distance = Math.abs(avatar.position.x - avatarTargetX);

    const totalSlides = slideCheckpoints.length;
    const currentSlide = Math.round(scroll * (totalSlides - 1));
    const targetAnim = slideCheckpoints[currentSlide].anim;

    const isWalking = distance > 0.05;
    const activeAnimState = isWalking ? 'Walking' : targetAnim;

    if (isWalking) {
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

      let targetRotationY = 0;
      if (activeAnimState === 'Idle') {
        targetRotationY = Math.PI / 3.5;
      }

      const targetQuat = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(0, targetRotationY, 0)
      );
      avatar.quaternion.slerp(targetQuat, delta * 8);
    }

    let camOffsetX: number;
    let camOffsetY: number;
    let camOffsetZ: number;
    let lookOffsetX: number;
    let lookOffsetY: number;
    let transitionSpeed: number;

    if (isWalking) {
      camOffsetX = 0;
      camOffsetY = 0;
      camOffsetZ = 5.0;
      lookOffsetX = 0;
      lookOffsetY = 0;
      transitionSpeed = 5.0;
    } else {
      switch (activeAnimState) {
        case 'Waving':
          camOffsetX = 1.5;
          camOffsetY = 0.5;
          camOffsetZ = 1.6;
          lookOffsetX = 1.5;
          lookOffsetY = 0.7;
          break;

        case 'JumpAttack': // Sekcja About Me (1)
          camOffsetX = 8;
          camOffsetY = 0;
          camOffsetZ = 10;
          lookOffsetX = -8;
          lookOffsetY = 1;
          break;

        case 'Typing': // Sekcja Projects (2)
          camOffsetX = 3.5;
          camOffsetY = 0.2;
          camOffsetZ = 2.5;
          lookOffsetX = 1.5;
          lookOffsetY = -0.2;
          break;

        case 'Idle': // Sekcja Contact (3)
        default:
          camOffsetX = -2.5; // Kamera po lewej stronie (razem z awatarem)
          camOffsetY = 1.2; // PODNIESIENIE kamery wyżej, żeby zmieścić głowę!
          camOffsetZ = 3.8; // Większy dystans, żeby pokazać więcej postaci
          lookOffsetX = -2.5; // Patrzymy prosto na niego
          lookOffsetY = 0.6; // Podnosimy wzrok z nóg na wysokość klatki piersiowej/twarzy
          break;
      }
      transitionSpeed = 1.0;
    }

    const parallaxX = THREE.MathUtils.clamp(smoothedMouse.current.x * 1.5, -2, 2);
    const parallaxY = THREE.MathUtils.clamp(smoothedMouse.current.y * 0.8, -1, 1);

    smoothedCamBaseX.current = THREE.MathUtils.damp(
      smoothedCamBaseX.current,
      baseCameraX,
      isWalking ? 6.0 : 2.0,
      delta
    );

    const targetCamX = smoothedCamBaseX.current + camOffsetX + parallaxX;
    const targetCamY = camOffsetY + parallaxY;
    const targetCamZ = camOffsetZ;

    const targetLookX = smoothedCamBaseX.current + lookOffsetX;
    const targetLookY = lookOffsetY;

    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      targetCamX,
      transitionSpeed,
      delta
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      targetCamY,
      transitionSpeed,
      delta
    );
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      targetCamZ,
      transitionSpeed,
      delta
    );

    lookAtTarget.current.x = THREE.MathUtils.damp(
      lookAtTarget.current.x,
      targetLookX,
      transitionSpeed,
      delta
    );
    lookAtTarget.current.y = THREE.MathUtils.damp(
      lookAtTarget.current.y,
      targetLookY,
      transitionSpeed,
      delta
    );
    lookAtTarget.current.z = THREE.MathUtils.damp(
      lookAtTarget.current.z,
      0,
      transitionSpeed,
      delta
    );
    state.camera.lookAt(lookAtTarget.current);
  });

  return (
    <group ref={avatarGroup} scale={BASE_SCALE} position={[2.5, -2, -1.5]}>
      <Avatar animation={currentAnim} walkSpeedRef={walkSpeedRef} />
    </group>
  );
}
