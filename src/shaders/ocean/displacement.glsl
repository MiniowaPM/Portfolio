uniform float uTime;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  
  float x = uv.x * 20.0;
  float y = uv.y * 20.0;
  
  float elevation = sin(x + uTime) * 1.5 + cos(y + uTime * 0.8) * 1.5;
  float chopX = cos(x + uTime) * 0.5;
  float chopZ = sin(y + uTime) * 0.5;
  
  gl_FragColor = vec4(chopX, elevation, chopZ, 1.0);
}