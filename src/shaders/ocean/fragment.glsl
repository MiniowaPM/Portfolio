uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform vec3 uSunPosition; 

varying float vElevation;
varying vec3 vWorldNormal;
varying vec3 vWorldPosition;

void main() {
    // Podstawowy kolor z głębi fali
    float mixStrength = (vElevation + 2.0) * 0.25;
    mixStrength = clamp(mixStrength, 0.0, 1.0);
    vec3 albedo = mix(uDepthColor, uSurfaceColor, mixStrength);

    // Setup wektorów do modelu oświetlenia Blinna-Phonga
    vec3 normal = normalize(vWorldNormal);
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 sunDir = normalize(uSunPosition);
            
    // (a) Światło rozproszone (Diffuse)
    float diff = max(dot(normal, sunDir), 0.0);
    vec3 diffuse = albedo * diff * 0.7; 
            
    // (b) Światło otoczenia (Ambient)
    vec3 ambient = albedo * 0.3;
            
    // (c) Refleksy słoneczne (Specular)
    vec3 reflectDir = reflect(-sunDir, normal);
    float spec = pow(max(dot(viewDir, reflectDir), 0.0), 128.0);
    vec3 specular = vec3(1.0) * spec * 0.8; 
            
    // Połączenie całości
    vec3 finalColor = ambient + diffuse + specular;

    gl_FragColor = vec4(finalColor, 1.0);
            
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}