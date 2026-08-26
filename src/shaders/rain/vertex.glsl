uniform float uTime;
uniform float uSpeed;
attribute float aRandom;
varying float vAlpha;

void main() {
  vec3 pos = position;
  
  float baseSpeed = 120.0 + aRandom * 80.0;
  pos.y -= uTime * (baseSpeed * uSpeed);
  
  pos.x -= uTime * (50.0 + aRandom * 30.0) * uSpeed;
  pos.z -= uTime * (20.0 + aRandom * 10.0) * uSpeed;
  
  pos.y = mod(pos.y, 150.0);
  pos.x = mod(pos.x - cameraPosition.x, 400.0) - 200.0 + cameraPosition.x;
  pos.z = mod(pos.z - cameraPosition.z, 400.0) - 200.0 + cameraPosition.z;

  float dist = length(pos.xz - cameraPosition.xz);
  
  vAlpha = 1.0 - smoothstep(100.0, 200.0, dist);

  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_Position = projectionMatrix * mvPosition;
  
  gl_PointSize = (4.0 + aRandom * 3.0) * (50.0 / -mvPosition.z);
}