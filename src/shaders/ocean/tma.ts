import * as THREE from 'three';

// Generator liczb losowych o rozkładzie normalnym (Box-Muller transform)
const gaussianRandom = (): [number, number] => {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random();
  while (v === 0) v = Math.random();
  const radius = Math.sqrt(-2.0 * Math.log(u));
  const theta = 2.0 * Math.PI * v;
  return [radius * Math.cos(theta), radius * Math.sin(theta)];
};

export interface TMASettings {
  resolution: number; // Rozdzielczość siatki (np. 256)
  size: number; // Rozmiar fizyczny oceanu (L, np. 1000m)
  windSpeed: number; // Prędkość wiatru na wysokości 10m [m/s]
  windDirection: number; // Kierunek wiatru [radiany]
  fetch: number; // Rozbieg wiatru (dystans) [m] (np. 100000)
  depth: number; // Głębokość wody [m]
}

export const generateTMASpectrum = (settings: TMASettings): THREE.DataTexture => {
  const { resolution, size, windSpeed, windDirection, fetch, depth } = settings;

  // Tablica Float32 dla tekstury RGBA (4 kanały na piksel)
  const data = new Float32Array(resolution * resolution * 4);
  const g = 9.81;

  // Parametry modelu JONSWAP/TMA
  const alpha = 0.076 * Math.pow(U10ToFetch(windSpeed, fetch, g), -0.22);
  const wp = 22.0 * Math.pow((g * g) / (windSpeed * fetch), 1.0 / 3.0); // Częstotliwość piku (Peak frequency)
  const gamma = 3.3; // Współczynnik uwypuklenia JONSWAP

  // Funkcja kierunkowa wiatru (Directional spreading)
  const directionalSpreading = (kx: number, kz: number) => {
    const kAngle = Math.atan2(kz, kx);
    const delta = Math.abs(kAngle - windDirection);
    // Uproszczony rozkład kosinusoidalny
    return delta < Math.PI / 2.0 ? (2.0 / Math.PI) * Math.pow(Math.cos(delta), 2.0) : 0;
  };

  // Zapisujemy wartości tymczasowe, aby potem łatwo wyliczyć H0(-k)*
  const h0Data: { real: number; imag: number }[] = new Array(resolution * resolution);

  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      // Obliczanie wektora falowego k
      const nx = x - resolution / 2.0;
      const nz = y - resolution / 2.0;
      const kx = (2.0 * Math.PI * nx) / size;
      const kz = (2.0 * Math.PI * nz) / size;
      const k = Math.sqrt(kx * kx + kz * kz);

      const index = y * resolution + x;

      if (k < 0.00001) {
        h0Data[index] = { real: 0, imag: 0 };
        continue;
      }

      // Relacja dyspersji (Shallow water)
      const omega = Math.sqrt(g * k * Math.tanh(k * depth));

      // 1. Widmo Pierson-Moskowitz
      const S_PM =
        ((alpha * g * g) / Math.pow(omega, 5)) * Math.exp(-1.25 * Math.pow(wp / omega, 4));

      // 2. Czynnik JONSWAP
      const sigma = omega <= wp ? 0.07 : 0.09;
      const r = Math.exp(-Math.pow(omega - wp, 2) / (2.0 * sigma * sigma * wp * wp));
      const S_JONSWAP = S_PM * Math.pow(gamma, r);

      // 3. Czynnik głębokości TMA (Aproksymacja Kitaigorodskiego)
      const omegaH = omega * Math.sqrt(depth / g);
      let phi = 1.0;
      if (omegaH <= 1.0) {
        phi = 0.5 * omegaH * omegaH;
      } else if (omegaH < 2.0) {
        phi = 1.0 - 0.5 * Math.pow(2.0 - omegaH, 2);
      }

      const S_TMA = S_JONSWAP * phi;

      // Amplituda i rozkład kierunkowy
      const dK = (2.0 * Math.PI) / size; // Krok siatki
      const amp = Math.sqrt(S_TMA * directionalSpreading(kx, kz) * dK * dK);

      const [xi1, xi2] = gaussianRandom();
      const h0_real = (xi1 * amp) / Math.sqrt(2.0);
      const h0_imag = (xi2 * amp) / Math.sqrt(2.0);

      h0Data[index] = { real: h0_real, imag: h0_imag };
    }
  }

  // Drugi przebieg: Pakowanie H0(k) i H0(-k)* do tekstury DataTexture
  for (let y = 0; y < resolution; y++) {
    for (let x = 0; x < resolution; x++) {
      const index = y * resolution + x;

      // Indeks dla wektora -k (odbicie lustrzane modulo N)
      const minusX = (resolution - x) % resolution;
      const minusY = (resolution - y) % resolution;
      const minusIndex = minusY * resolution + minusX;

      const h0 = h0Data[index];
      const h0Minus = h0Data[minusIndex];

      // R i G: H0(k)
      data[index * 4 + 0] = h0.real;
      data[index * 4 + 1] = h0.imag;
      // B i A: H0(-k)* (sprzężenie zespolone, więc negujemy część urojoną)
      data[index * 4 + 2] = h0Minus.real;
      data[index * 4 + 3] = -h0Minus.imag;
    }
  }

  const texture = new THREE.DataTexture(
    data,
    resolution,
    resolution,
    THREE.RGBAFormat,
    THREE.FloatType
  );
  texture.needsUpdate = true;
  return texture;
};

export function U10ToFetch(windSpeed: number, fetch: number, g: number) {
  return (windSpeed * windSpeed) / (fetch * g);
}

// Funkcja pomocnicza do odwracania bitów (Bit Reversal)
export function reverseBits(index: number, numBits: number): number {
  let reversed = 0;
  for (let i = 0; i < numBits; i++) {
    reversed = (reversed << 1) | (index & 1);
    index >>= 1;
  }
  return reversed;
}

// Główna funkcja generująca dane Tekstury Motylkowej
export function generateButterflyData(N: number): Float32Array {
  const numStages = Math.log2(N);
  // 4 kanały (RGBA) per piksel
  const data = new Float32Array(N * numStages * 4);

  for (let stage = 0; stage < numStages; stage++) {
    const blocks = Math.pow(2, numStages - 1 - stage);
    const inputs = Math.pow(2, stage);

    for (let b = 0; b < blocks; b++) {
      for (let i = 0; i < inputs; i++) {
        const i1 = b * inputs * 2 + i;
        const i2 = b * inputs * 2 + inputs + i;

        let index1 = i1;
        let index2 = i2;

        // W pierwszym etapie (stage === 0) musimy zastosować odwracanie bitów
        if (stage === 0) {
          index1 = reverseBits(i1, numStages);
          index2 = reverseBits(i2, numStages);
        }

        // Obliczanie czynnika obrotu (Twiddle Factor) dla IFFT
        // Znak przy 'phase' zależy od konwencji, dla IFFT zazwyczaj dajemy znak dodatni
        const phase = (2.0 * Math.PI * i * blocks) / N;
        const twiddleReal = Math.cos(phase);
        const twiddleImag = Math.sin(phase);

        // Zapis dla pierwszego węzła (górna gałąź)
        const offset1 = (stage * N + i1) * 4;
        data[offset1 + 0] = twiddleReal;
        data[offset1 + 1] = twiddleImag;
        data[offset1 + 2] = index1;
        data[offset1 + 3] = index2;

        // Zapis dla drugiego węzła (dolna gałąź)
        // W dolnej gałęzi czynnik obrotu mnożymy przez -1
        const offset2 = (stage * N + i2) * 4;
        data[offset2 + 0] = -twiddleReal;
        data[offset2 + 1] = -twiddleImag;
        data[offset2 + 2] = index1;
        data[offset2 + 3] = index2;
      }
    }
  }

  return data;
}
