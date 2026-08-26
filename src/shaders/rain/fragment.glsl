uniform vec3 uColor;
varying float vAlpha;

void main() {
  vec2 uv = gl_PointCoord.xy - 0.5;
  float dist = length(uv);
  
  if (dist > 0.5) discard;
  
  float opacity = (0.5 - dist) * 2.0 * vAlpha;
  
  gl_FragColor = vec4(uColor, opacity);
}