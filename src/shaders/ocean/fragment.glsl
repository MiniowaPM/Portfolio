uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSkyColor;
uniform vec3 uFoamColor;
uniform vec3 uSunPosition;
uniform float uTime;
uniform float uLightIntensity;
uniform float uAmbientIntensity;

varying float vElevation;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying float vJacobian;

void main() {
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunPosition);
    
    vec2 rippleUv = vWorldPosition.xz * 0.8;
    float ripple1 = sin(rippleUv.x * 3.0 + uTime * 2.0) * cos(rippleUv.y * 3.0);
    float ripple2 = sin(rippleUv.x * -2.0 + uTime * 1.5) * cos(rippleUv.y * 4.0 - uTime);
    vec3 rippleNormal = vec3(ripple1, 0.0, ripple2) * 0.03;
    normal = normalize(normal + rippleNormal);

    // 1. Procedural Sky for Fresnel
    vec3 reflection = reflect(-viewDir, normal);
    float skyFactor = max(reflection.y, 0.0);
    
    // Zamiast dodawać chamską biel, bazujemy na kolorze nieba (ściemnia się w nocy)
    vec3 horizonColor = uSkyColor * mix(1.2, 2.5, uAmbientIntensity);
    vec3 proceduralSky = mix(horizonColor, uSkyColor, skyFactor);

    // 2. Base Water Color
    float mixStrength = smoothstep(-5.0, 5.0, vElevation);
    vec3 albedo = mix(uDepthColor, uSurfaceColor, mixStrength);

    // 3. Diffuse
    float diff = dot(normal, sunDir) * 0.5 + 0.5;
    // Ograniczamy wpływ ostrego światła na diffuse podczas sztormu
    vec3 diffuse = albedo * diff * mix(0.3, 0.6, uAmbientIntensity);

    // 4. Subsurface Scattering
    float backlight = max(dot(viewDir, -sunDir), 0.0); 
    float thickness = max(8.0 - vElevation, 0.0) * 0.5;
    vec3 absorption = vec3(1.5, 0.3, 0.1); 
    vec3 transmittance = exp(-absorption * thickness);
    
    float sssIntensity = pow(backlight, 4.0); 
    // Mnożnik uLightIntensity gasi sztuczne żarzenie pod światło w nocy
    vec3 sss = (transmittance * sssIntensity * 1.5) * uLightIntensity; 

    // 5. Fresnel Effect
    float R0 = 0.02;
    float fresnelFactor = R0 + (1.0 - R0) * pow(1.0 - max(dot(viewDir, normal), 0.0), 5.0);
    vec3 fresnel = proceduralSky * fresnelFactor * mix(0.5, 1.2, uAmbientIntensity);

    // 6. Multi-lobe Specular Reflection
    vec3 halfVector = normalize(sunDir + viewDir);
    float NdotH = max(dot(normal, halfVector), 0.0);
    
    float coreSpec = pow(NdotH, 400.0);
    float haloR = pow(NdotH, 150.0);
    float haloG = pow(NdotH, 200.0);
    float haloB = pow(NdotH, 300.0);
    vec3 haloSpec = vec3(haloR, haloG, haloB);
    
    // Obcinamy odblaski, by uniknąć wypalenia pikseli na ekranie
    vec3 specular = (vec3(coreSpec) + haloSpec * 0.5) * (0.5 * uLightIntensity);

    // 7. Sea Foam
    float foamMask = smoothstep(0.7, 0.3, vJacobian); 
    foamMask *= smoothstep(0.5, 1.5, vElevation);

    // 8. Final Composite
    // Podbijamy bazowy ambient, żeby woda "od tyłu" nigdy nie była smolista
    vec3 ambient = uDepthColor * mix(0.4, 0.8, uAmbientIntensity); 
    vec3 finalColor = ambient + diffuse + sss + fresnel + specular;
    
    // Piana w nocy robi się szaro-granatowa, nie może świecić jak jarzeniówka!
    vec3 currentFoamColor = uFoamColor * mix(0.15, 0.9, uAmbientIntensity);
    finalColor = mix(finalColor, currentFoamColor, foamMask);

    // 9. Fog - Horizon
    float dist = length(cameraPosition - vWorldPosition);
    float horizonFog = smoothstep(900.0, 1500.0, dist);
    finalColor = mix(finalColor, uSkyColor, horizonFog);

    // 10. Fog - Altitude
    vec2 fogUv = vWorldPosition.xz * 0.01;
    float altitudeFog = smoothstep(200.0, 550.0, clamp(cameraPosition.y, 0.0, 500.0));
    float cloudTurbulence = sin(fogUv.x * 3.0 - (uTime * 0.3)) * cos(fogUv.y * 2.0 + (uTime * 0.4));
    
    float dynamicAltitudeFog = altitudeFog + (cloudTurbulence * 0.15 * altitudeFog);
    dynamicAltitudeFog = clamp(dynamicAltitudeFog, 0.0, 1.0);
    finalColor = mix(finalColor, currentFoamColor, dynamicAltitudeFog);

    // FINAL RENDER
    gl_FragColor = vec4(finalColor, 1.0);
            
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}