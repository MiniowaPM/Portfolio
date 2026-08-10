uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSkyColor;
uniform vec3 uFoamColor;
uniform vec3 uSunPosition; 

varying float vElevation;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;
varying float vJacobian;

void main() {
    // Normalize vectors
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunPosition);
    
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
    vec3 halfVector = normalize(sunDir + viewDir);
    float NdotH = max(dot(normal, halfVector), 0.0);
    
    // Sharp, blinding sun core
    float coreSpec = smoothstep(0.98, 0.99, NdotH);
    
    // Chromatic dispersion halo
    float haloR = pow(NdotH, 60.0);
    float haloG = pow(NdotH, 80.0);
    float haloB = pow(NdotH, 120.0);
    vec3 haloSpec = vec3(haloR, haloG, haloB);
    
    vec3 specular = (vec3(coreSpec) + haloSpec * 1.2);

    // 7. Sea Foam based on Jacobian
    float foamMask = smoothstep(0.7, 0.3, vJacobian); 
    foamMask *= smoothstep(0.5, 1.5, vElevation);

    // 8. Final Composite
    vec3 ambient = uDepthColor * 0.2; 
    vec3 finalColor = ambient + diffuse + sss + fresnel + specular;
    
    finalColor = mix(finalColor, uFoamColor, foamMask);

    gl_FragColor = vec4(finalColor, 1.0);
            
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}