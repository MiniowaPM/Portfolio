uniform sampler2D uDisplacementMap;
varying vec2 vUv;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying float vElevation;
varying float vJacobian;

const int SIZE = 500;

// getSign function removed as the sign checkerboard is now flipped directly in the IFFT (uFinalPass)

void main() {
    vUv = uv;

    // --- PHYSICS CONTROL ---
    // FFT output (uDisplacementMap) is already in meters
    float choppiness = 1.2; // Wave peak sharpness (1.0 - 1.5)
    float texel = 1.0 / 256.0; 

    // Center the UVs to strictly sample texel centers without edge interpolation issues
    vec2 centerUv = vUv + 0.5 * texel;
    vec2 uvRight = centerUv + vec2(texel, 0.0);
    vec2 uvUp = centerUv + vec2(0.0, texel);
    
    // Sample displacement (LinearFilter will smooth transitions)
    vec3 disp = texture2D(uDisplacementMap, centerUv).rgb;
    vec3 dispRight = texture2D(uDisplacementMap, uvRight).rgb;
    vec3 dispUp = texture2D(uDisplacementMap, uvUp).rgb;

    // Physical distance between vertices (1000m area)
    float step = 1000.0 / 256.0; 

    vec3 pos = position;
    vec3 posRight = pos + vec3(step, 0.0, 0.0);
    vec3 posUp = pos + vec3(0.0, step, 0.0);

    // Vertex displacement
    vec3 finalPos = pos;
    finalPos.x -= disp.x * choppiness;
    finalPos.y -= disp.z * choppiness;
    finalPos.z += disp.y; // Actual Y height

    vec3 finalPosRight = posRight;
    finalPosRight.x -= dispRight.x * choppiness;
    finalPosRight.y -= dispRight.z * choppiness;
    finalPosRight.z += dispRight.y;

    vec3 finalPosUp = posUp;
    finalPosUp.x -= dispUp.x * choppiness;
    finalPosUp.y -= dispUp.z * choppiness;
    finalPosUp.z += dispUp.y;

    // Calculate precise normals using finite differences
    vec3 dx = finalPosRight - finalPos;
    vec3 dy = finalPosUp - finalPos;
    vec3 localNormal = normalize(cross(dx, dy));
    
    // Calculate Jacobian (grid compression) for foam generation
    vJacobian = (dx.x * dy.y - dx.y * dy.x) / (step * step);

    // Send data to fragment shader
    vec4 worldPos = modelMatrix * vec4(finalPos, 1.0);
    vWorldPosition = worldPos.xyz;
    
    // Convert local normal to world space normal
    vWorldNormal = normalize((modelMatrix * vec4(localNormal, 0.0)).xyz);
    vElevation = disp.y; 

    gl_Position = projectionMatrix * viewMatrix * worldPos;
}