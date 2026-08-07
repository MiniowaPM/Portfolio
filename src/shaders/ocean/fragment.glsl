uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
varying float vElevation;

void main() {
  float mixStrength = (vElevation + 0.8) * 0.6;
  mixStrength = clamp(mixStrength, 0.0, 1.0);
  
  vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
  
  gl_FragColor = vec4(color, 1.0);
  
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}