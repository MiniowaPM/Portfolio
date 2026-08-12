uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSkyColor;
uniform vec3 uFoamColor;
uniform vec3 uSunPosition;
uniform float uTime;
uniform float uFogNear;
uniform float uFogFar;

varying float vElevation;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying float vJacobian;

void main() {
    // Normalize vectors
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunPosition);
    
    // Ripple
    vec2 rippleUv = vWorldPosition.xz * 0.8;

    float ripple1 = sin(rippleUv.x * 3.0 + uTime * 2.0) * cos(rippleUv.y * 3.0);
    float ripple2 = sin(rippleUv.x * -2.0 + uTime * 1.5) * cos(rippleUv.y * 4.0 - uTime);
    vec3 rippleNormal = vec3(ripple1, 0.0, ripple2) * 0.03;
    normal = normalize(normal + rippleNormal);

    // 1. Procedural Sky for Fresnel Reflection
    vec3 reflection = reflect(-viewDir, normal);
    float skyFactor = max(reflection.y, 0.0);
    
    // Horizon is whitish/cyan, zenith is deep sky color
    vec3 horizonColor = mix(vec3(1.0), uSkyColor, 0.5);
    vec3 proceduralSky = mix(horizonColor, uSkyColor, skyFactor);

    // 2. Base Water Color (Albedo)
    float mixStrength = smoothstep(-5.0, 5.0, vElevation);
    vec3 albedo = mix(uDepthColor, uSurfaceColor, mixStrength);

    // 3. Diffuse Lighting with Half-Lambert effect (softer, toon-like)
    float diff = dot(normal, sunDir) * 0.5 + 0.5;
    vec3 diffuse = albedo * diff * 0.6;

    // 4. Subsurface Scattering (Beer-Lambert Law)
    float backlight = max(dot(viewDir, -sunDir), 0.0); 
    
    // Wave thickness is thinnest at the peaks
    float thickness = max(8.0 - vElevation, 0.0) * 0.5;
    
    // Water absorption coefficients: strongly absorbs red, moderately green, weakly blue
    vec3 absorption = vec3(1.5, 0.3, 0.1); 
    vec3 transmittance = exp(-absorption * thickness);
    
    // SSS intensity increases when looking towards the sun through thin water
    float sssIntensity = pow(backlight, 4.0); 
    vec3 sss = (transmittance * sssIntensity * 2.0); 

    // 5. Fresnel Effect (Water F0 = 0.02)
    float R0 = 0.02;
    float fresnelFactor = R0 + (1.0 - R0) * pow(1.0 - max(dot(viewDir, normal), 0.0), 5.0);
    vec3 fresnel = proceduralSky * fresnelFactor * 1.5;

    // 6. Multi-lobe Specular Reflection (Dual-Lobe + Dispersion)
    // vec3 halfVector = normalize(sunDir + viewDir);
    // float NdotH = max(dot(normal, halfVector), 0.0);
    
    // // Sharp, blinding sun core
    // float coreSpec = smoothstep(0.98, 0.99, NdotH);
    
    // // Chromatic dispersion halo
    // float haloR = pow(NdotH, 60.0);
    // float haloG = pow(NdotH, 80.0);
    // float haloB = pow(NdotH, 120.0);
    // vec3 haloSpec = vec3(haloR, haloG, haloB);

    // vec3 specular = (vec3(coreSpec) + haloSpec * 1.2);


    // 6. Multi-lobe Specular Reflection (Ostre, szkliste iskry)
    vec3 halfVector = normalize(sunDir + viewDir);
    float NdotH = max(dot(normal, halfVector), 0.0);
    
    // Zamiast szerokiego smoothstep, używamy potężnej potęgi dla mikroskopijnego rdzenia słońca
    float coreSpec = pow(NdotH, 400.0);
    
    // Dyspersja chromatyczna też musi być znacznie ciaśniejsza
    float haloR = pow(NdotH, 150.0);
    float haloG = pow(NdotH, 200.0);
    float haloB = pow(NdotH, 300.0);
    vec3 haloSpec = vec3(haloR, haloG, haloB);
    
    // Mieszamy je i obniżamy globalną jasność odblasku, żeby nie wypalał ekranu
    vec3 specular = (vec3(coreSpec) + haloSpec * 0.5) * 0.8;

    // 7. Sea Foam based on Jacobian
    float foamMask = smoothstep(0.7, 0.3, vJacobian); 
    foamMask *= smoothstep(0.5, 1.5, vElevation);

    // float foamMask = smoothstep(0.7, 0.3, vJacobian); 
    // foamMask *= smoothstep(0.5, 1.5, vElevation);

    // vec2 foamScale = vWorldPosition.xz * 1.5;
    // float foamNoise = sin(foamScale.x) * cos(foamScale.y) * 0.5 + 0.5;

    // float foamNoise2 = sin(foamScale.x * 0.7 - uTime) * cos(foamScale.y * 0.7 + uTime) * 0.5 + 0.5;

    // foamMask *= mix(0.4, 1.2, foamNoise * foamNoise2);

    // 8. Final Composite
    vec3 ambient = uDepthColor * 0.2; 
    vec3 finalColor = ambient + diffuse + sss + fresnel + specular;
    
    finalColor = mix(finalColor, uFoamColor, foamMask);

    // 9. Custom Fog - Horizon
    float dist = length(cameraPosition - vWorldPosition);

    float horizonFog = smoothstep(900.0, 1500.0, dist);
    
    finalColor = mix(finalColor, uSkyColor, horizonFog);

    // 10. Custom Fog - Altitude
    vec2 fogUv = vWorldPosition.xz * 0.01;

    float altitudeFog = smoothstep(200.0, 550.0, clamp(cameraPosition.y, 0.0, 500.0));
    float cloudTurbulence = sin(fogUv.x * 3.0 - (uTime * 0.3)) * cos(fogUv.y * 2.0 + (uTime * 0.4));
    
    float dynamicAltitudeFog = altitudeFog + (cloudTurbulence * 0.15 * altitudeFog);
    dynamicAltitudeFog = clamp(dynamicAltitudeFog, 0.0, 1.0);

    finalColor = mix(finalColor, uFoamColor, dynamicAltitudeFog);

    // FINAL RENDER
    gl_FragColor = vec4(finalColor, 1.0);
            
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}