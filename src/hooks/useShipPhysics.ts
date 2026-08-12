import { useFrame, useThree } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';
import { oceanPhysics } from './useFFT';
import { useKeyboard } from './useKeyboard';

export const useShipPhysics = (
  objectRef: React.RefObject<THREE.Group | null>,
  floatOffset: number = 0
) => {
  const { gl, controls, camera } = useThree();
  const keys = useKeyboard();
  const pixelBuffer = new Float32Array(16);
  const upVector = new THREE.Vector3(0, 1, 0);

  const prevPosition = useRef(new THREE.Vector3(0, 0, 0));

  const state = useRef({
    speed: 0,
    yaw: 0,
  });

  const waveQuatRef = useRef(new THREE.Quaternion());

  useFrame((_, delta) => {
    if (!objectRef.current || !oceanPhysics.readTarget) return;

    const ship = objectRef.current;
    const { size, resolution, readTarget } = oceanPhysics;

    const acceleration = 40.0;
    const maxSpeed = 30.0;
    const turnSpeed = 1;
    const drag = 0.988;

    if (keys.forward) state.current.speed += acceleration * delta;
    if (keys.backward) state.current.speed -= acceleration * delta;

    const isMoving = Math.abs(state.current.speed) > 0.1;
    if (isMoving) {
      const turnDirection = state.current.speed > 0 ? 1 : -1;
      if (keys.left) state.current.yaw += turnSpeed * delta * turnDirection;
      if (keys.right) state.current.yaw -= turnSpeed * delta * turnDirection;
    }

    state.current.speed *= drag;
    state.current.speed = THREE.MathUtils.clamp(state.current.speed, -maxSpeed * 0.5, maxSpeed);

    const moveX = Math.sin(state.current.yaw) * state.current.speed * delta;
    const moveZ = Math.cos(state.current.yaw) * state.current.speed * delta;

    ship.position.x += moveX;
    ship.position.z += moveZ;

    // Map looping
    const limit = size * 0.5;
    if (ship.position.x > limit) ship.position.x -= size;
    if (ship.position.x < -limit) ship.position.x += size;
    if (ship.position.z > limit) ship.position.z -= size;
    if (ship.position.z < -limit) ship.position.z += size;

    // Bouyancy
    const { x, z } = ship.position;
    const u = (x + limit) / size;
    const v = 1.0 - (z + limit) / size;

    const uWrap = u - Math.floor(u);
    const vWrap = v - Math.floor(v);

    const exactX = uWrap * resolution;
    const exactY = vWrap * resolution;

    const px = Math.min(Math.floor(exactX), resolution - 2);
    const py = Math.min(Math.floor(exactY), resolution - 2);

    gl.readRenderTargetPixels(readTarget, px, py, 2, 2, pixelBuffer);

    const y00 = pixelBuffer[1];
    const y10 = pixelBuffer[5];
    const y01 = pixelBuffer[9];
    const y11 = pixelBuffer[13];

    const tx = exactX - px;
    const ty = exactY - py;

    const heightBottom = THREE.MathUtils.lerp(y00, y10, tx);
    const heightTop = THREE.MathUtils.lerp(y01, y11, tx);
    const rawHeight = THREE.MathUtils.lerp(heightBottom, heightTop, ty);

    const displacementScale = 1.0;
    const exactHeight = rawHeight * displacementScale;

    const heaveDamping = 10.0;

    ship.position.y = THREE.MathUtils.lerp(
      ship.position.y,
      exactHeight + floatOffset,
      heaveDamping * delta
    );

    // Rotate the ship to align with the wave normal
    const dx = (y10 - y00 + y11 - y01) * 0.5 * displacementScale;
    const dz = (y01 - y00 + y11 - y10) * 0.5 * displacementScale;
    const step = size / resolution;

    const shipLengthFactor = 0.5;

    const waveNormal = new THREE.Vector3(
      -dx * shipLengthFactor,
      step,
      dz * shipLengthFactor
    ).normalize(); // YAW

    const targetWaveQuat = new THREE.Quaternion().setFromUnitVectors(upVector, waveNormal);

    const pitchRollSpeed = 2.3;
    waveQuatRef.current.slerp(targetWaveQuat, pitchRollSpeed * delta);

    const yawQuat = new THREE.Quaternion().setFromAxisAngle(upVector, state.current.yaw);

    const finalQuat = waveQuatRef.current.clone().multiply(yawQuat);

    ship.quaternion.copy(finalQuat);

    // Camera controls - orbit camera movement
    if (controls) {
      const orbitControls = controls as any;

      const distanceMoved = prevPosition.current.distanceTo(ship.position);
      if (distanceMoved > limit * 0.8) {
        const offset = new THREE.Vector3().subVectors(ship.position, prevPosition.current);
        offset.y = 0;

        camera.position.add(offset);
        orbitControls.target.add(offset);
      } else {
        const distanceXZ = Math.hypot(
          ship.position.x - camera.position.x,
          ship.position.z - camera.position.z
        );

        const heightFactor = 0.1;
        const targetY = 2.0 + distanceXZ * heightFactor;

        const dynamicTarget = new THREE.Vector3(ship.position.x, targetY, ship.position.z);

        const displacement = new THREE.Vector3().subVectors(dynamicTarget, orbitControls.target);

        const chaseSpeed = 3.0;
        displacement.multiplyScalar(chaseSpeed * delta);

        orbitControls.target.add(displacement);
        camera.position.add(displacement);
      }

      orbitControls.update();
    }

    prevPosition.current.copy(ship.position);
  });
};
