uniform float uTime;
varying float vElevation;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  
  float elevation = sin(modelPosition.x * 0.5 + uTime) * 0.5;
  elevation += sin(modelPosition.z * 0.8 + uTime * 0.8) * 0.3;
  
  modelPosition.y += elevation;
  
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;
  
  gl_Position = projectedPosition;
  vElevation = elevation;
}