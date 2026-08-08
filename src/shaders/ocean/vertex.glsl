uniform sampler2D uDisplacementMap;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vViewPosition;
varying float vElevation;

// Bezpieczna funkcja odwracająca szachownicę znaków z IFFT
float getSign(vec2 uv) {
    // Obliczamy dokładny indeks piksela z zabezpieczeniem przed krawędziami
    vec2 index = floor(uv * 256.0 + 0.5);
    index = clamp(index, 0.0, 255.0); 
    return mod(index.x + index.y, 2.0) == 0.0 ? 1.0 : -1.0;
}

void main() {
    vUv = uv;
    float texel = 1.0 / 256.0; 

    // --- KONTROLA FIZYKI ---
    // Wynik z FFT (uDisplacementMap) jest już domyślnie w metrach!
    float choppiness = 1.2; // Ostrość wierzchołków fal (1.0 - 1.5)

    // Pobieramy wektory i naprawiamy "kolce" funkcją getSign
    vec2 uvRight = vUv + vec2(texel, 0.0);
    vec2 uvUp = vUv + vec2(0.0, texel);
    
    vec3 disp = texture2D(uDisplacementMap, vUv).rgb * getSign(vUv);
    vec3 dispRight = texture2D(uDisplacementMap, uvRight).rgb * getSign(uvRight);
    vec3 dispUp = texture2D(uDisplacementMap, uvUp).rgb * getSign(uvUp);

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
    vNormal = normalMatrix * localNormal;
    vElevation = disp.y; 

    // Ostateczna pozycja
    vec4 modelViewPosition = modelViewMatrix * vec4(finalPos, 1.0);
    vViewPosition = -modelViewPosition.xyz;
    gl_Position = projectionMatrix * modelViewPosition;
}