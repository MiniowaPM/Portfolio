uniform sampler2D uH0;
uniform float uTime;
uniform float uSize;
uniform float uDepth;
uniform vec2 resolution;

const float PI = 3.14159265359;
const float G = 9.81;

vec2 complexMult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    float nx = gl_FragCoord.x - resolution.x * 0.5;
    float nz = gl_FragCoord.y - resolution.y * 0.5;
    
    float kx = (2.0 * PI * nx) / uSize;
    float kz = (2.0 * PI * nz) / uSize;
    float k = sqrt(kx * kx + kz * kz);
    
    if (k < 0.00001) {
        gl_FragColor = vec4(0.0);
        return;
    }

    // Pobranie prekomputowanego widma H0
    vec4 h0Data = texture2D(uH0, uv);
    vec2 h0 = h0Data.xy;               // H0(k)
    vec2 h0_minus_star = h0Data.zw;    // H0(-k)* 

    // Relacja dyspersji uwzględniająca głębokość wody
    float omega = sqrt(G * k * tanh(k * uDepth));

    // Obrót fazy w czasie (Wzór Eulera: e^(iwt))
    float cos_wt = cos(omega * uTime);
    float sin_wt = sin(omega * uTime);
    
    vec2 exp_iwt = vec2(cos_wt, sin_wt);
    vec2 exp_minusiwt = vec2(cos_wt, -sin_wt);

    // Równanie ewolucji fal: h(k, t)
    vec2 h_t = complexMult(h0, exp_iwt) + complexMult(h0_minus_star, exp_minusiwt);

    // Generowanie przesunięć poziomych (X i Z) dla "ostrych fal"
    float kx_k = kx / k;
    float kz_k = kz / k;
    
    vec2 H_Y = h_t;
    vec2 H_X = vec2(h_t.y * kx_k, -h_t.x * kx_k);
    vec2 H_Z = vec2(h_t.y * kz_k, -h_t.x * kz_k);

    // Pakowanie danych do IFFT
    vec2 xy = vec2(H_X.x - H_Y.y, H_X.y + H_Y.x);
    vec2 zw = H_Z;

    gl_FragColor = vec4(xy, zw);
}