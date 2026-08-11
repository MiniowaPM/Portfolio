import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { oceanPhysics } from './useFFT';

export const useBuoyancy = (
  objectRef: React.RefObject<THREE.Group | null>,
  floatOffset: number = 0
) => {
  const { gl } = useThree();
  const pixelBuffer = new Float32Array(16);
  const upVector = new THREE.Vector3(0, 1, 0);

  useFrame(() => {
    if (!objectRef.current || !oceanPhysics.readTarget) return;

    const { x, z } = objectRef.current.position;
    const { size, resolution, readTarget } = oceanPhysics;

    const u = (x + size * 0.5) / size;
    const v = 1.0 - (z + size * 0.5) / size;

    const uWrap = u - Math.floor(u);
    const vWrap = v - Math.floor(v);

    const exactX = uWrap * resolution;
    const exactY = vWrap * resolution;

    const px = Math.min(Math.floor(exactX), resolution - 2);
    const py = Math.min(Math.floor(exactY), resolution - 2);

    gl.readRenderTargetPixels(readTarget, px, py, 2, 2, pixelBuffer);

    const y00 = pixelBuffer[1]; // Lewy-dół
    const y10 = pixelBuffer[5]; // Prawy-dół
    const y01 = pixelBuffer[9]; // Lewy-góra
    const y11 = pixelBuffer[13]; // Prawy-góra

    const tx = exactX - px;
    const ty = exactY - py;

    const heightBottom = THREE.MathUtils.lerp(y00, y10, tx);
    const heightTop = THREE.MathUtils.lerp(y01, y11, tx);
    const exactHeight = THREE.MathUtils.lerp(heightBottom, heightTop, ty);

    objectRef.current.position.y = exactHeight + floatOffset;

    const dx = (y10 - y00 + y11 - y01) * 0.5;
    const dz = (y01 - y00 + y11 - y10) * 0.5;
    const step = size / resolution;

    const waveNormal = new THREE.Vector3(-dx * 0.4, step, dz * 0.4).normalize();
    const targetQuaternion = new THREE.Quaternion().setFromUnitVectors(upVector, waveNormal);

    objectRef.current.quaternion.slerp(targetQuaternion, 0.05);
  });
};
