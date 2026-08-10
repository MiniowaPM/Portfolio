uniform sampler2D uDisplacementMap;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying float vElevation;

// Bezpieczna funkcja odwracająca szachownicę znaków z IFFT
float getSign(vec2 uv) {
    // Obliczamy dokładny indeks piksela z zabezpieczeniem przed krawędziami
    vec2 index = floor(uv * 256.0 + 0.5);
    index = mod(index, 256.0); // Zamiast clamp używamy mod dla poprawnego powtarzania
    return mod(index.x + index.y, 2.0) == 0.0 ? 1.0 : -1.0;
}

void main() {
    vUv = uv;
    float texel = 1.0 / 256.0; 

    // --- KONTROLA FIZYKI ---
    // Wynik z FFT (uDisplacementMap) jest już domyślnie w metrach!
    float choppiness = 1.2; // Ostrość wierzchołków fal (1.0 - 1.5)

    // Center the UVs to strictly sample texel centers without edge interpolation issues
    vec2 centerUv = vUv + 0.5 * texel;
    vec2 uvRight = centerUv + vec2(texel, 0.0);
    vec2 uvUp = centerUv + vec2(0.0, texel);
    
    // Używamy vUv do getSign, aby zachować starą logikę sprawdzania indeksów
    vec3 disp = texture2D(uDisplacementMap, centerUv).rgb * getSign(vUv);
    vec3 dispRight = texture2D(uDisplacementMap, uvRight).rgb * getSign(vUv + vec2(texel, 0.0));
    vec3 dispUp = texture2D(uDisplacementMap, uvUp).rgb * getSign(vUv + vec2(0.0, texel));

    // Skalujemy przemieszczenie (FFT generuje fale dla obszaru 1000m, nasza siatka ma 100m)
    float scale = 100.0 / 1000.0;
    disp *= scale;
    dispRight *= scale;
    dispUp *= scale;

    float step = 100.0 / 256.0; // Odległość fizyczna między wierzchołkami (w metrach)

    vec3 pos = position;
    vec3 posRight = pos + vec3(step, 0.0, 0.0);
    vec3 posUp = pos + vec3(0.0, step, 0.0);

    // Aplikacja wektorów z FFT (odejmujemy poziome, by wyostrzyć fale)
    vec3 finalPos = pos;
    finalPos.x -= disp.x * choppiness;
    finalPos.y -= disp.z * choppiness;
    finalPos.z += disp.y; // Faktyczna wysokość Y

    vec3 finalPosRight = posRight;
    finalPosRight.x -= dispRight.x * choppiness;
    finalPosRight.y -= dispRight.z * choppiness;
    finalPosRight.z += dispRight.y;

    vec3 finalPosUp = posUp;
    finalPosUp.x -= dispUp.x * choppiness;
    finalPosUp.y -= dispUp.z * choppiness;
    finalPosUp.z += dispUp.y;

    // Różnice skończone - obliczanie wektora normalnego do oświetlenia
    vec3 dx = finalPosRight - finalPos;
    vec3 dy = finalPosUp - finalPos;
    vec3 localNormal = normalize(cross(dx, dy));

    // Przekazanie danych do Fragment Shadera
    vec4 worldPos = modelMatrix * vec4(finalPos, 1.0);
    vWorldPosition = worldPos.xyz;
    
    // Convert local normal to world space normal
    vWorldNormal = normalize((modelMatrix * vec4(localNormal, 0.0)).xyz);
    vElevation = disp.y; 

    gl_Position = projectionMatrix * viewMatrix * worldPos;
}