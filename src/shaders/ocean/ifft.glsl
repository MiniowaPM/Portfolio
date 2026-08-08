uniform sampler2D uPingPong; 
uniform sampler2D uTwiddleIndices; 
uniform vec2 uTwiddleResolution;   
uniform float uStage;              
uniform int uDirection;            
uniform vec2 resolution;

// Funkcja pomocnicza: Mnożenie liczb zespolonych
vec2 complexMult(vec2 a, vec2 b) {
    return vec2(
        a.x * b.x - a.y * b.y,
        a.x * b.y + a.y * b.x
    );
}

void main() {
    vec2 uv = gl_FragCoord.xy / resolution.xy;
    
    float x = floor(gl_FragCoord.x);
    float y = floor(gl_FragCoord.y);

    vec4 resultData;
    
    vec2 p, q, twiddle;
    float i1, i2;

    if (uDirection == 0) {
        
        // Pobieramy dane motylka (uv dla tekstury motylkowej)
        vec2 twiddleUV = vec2((x + 0.5) / uTwiddleResolution.x, (uStage + 0.5) / uTwiddleResolution.y);
        vec4 twiddleData = texture2D(uTwiddleIndices, twiddleUV);
        
        twiddle = twiddleData.xy; 
        i1 = twiddleData.z;       
        i2 = twiddleData.w;       

        // Odczyt z tekstury Ping-Pong 
        vec4 pData = texture2D(uPingPong, vec2((i1 + 0.5) / resolution.x, uv.y));
        vec4 qData = texture2D(uPingPong, vec2((i2 + 0.5) / resolution.x, uv.y));
        
        // Operacja motylkowa
        resultData.xy = pData.xy + complexMult(twiddle, qData.xy);
        resultData.zw = pData.zw + complexMult(twiddle, qData.zw);

    } else {        
        // Pobieramy dane motylka 
        vec2 twiddleUV = vec2((y + 0.5) / uTwiddleResolution.x, (uStage + 0.5) / uTwiddleResolution.y);
        vec4 twiddleData = texture2D(uTwiddleIndices, twiddleUV);
        
        twiddle = twiddleData.xy; 
        i1 = twiddleData.z;       
        i2 = twiddleData.w;       

        // Odczyt z tekstury Ping-Pong 
        vec4 pData = texture2D(uPingPong, vec2(uv.x, (i1 + 0.5) / resolution.y));
        vec4 qData = texture2D(uPingPong, vec2(uv.x, (i2 + 0.5) / resolution.y));
        
        // Operacja motylkowa
        resultData.xy = pData.xy + complexMult(twiddle, qData.xy);
        resultData.zw = pData.zw + complexMult(twiddle, qData.zw);
    }

    gl_FragColor = resultData;
}