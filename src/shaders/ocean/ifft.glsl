uniform sampler2D uPingPong; 
uniform sampler2D uTwiddleIndices; 
uniform vec2 uTwiddleResolution;   
uniform float uStage;              
uniform int uDirection;            
uniform vec2 resolution;

uniform bool uFinalPass;

// Complex multiplication helper
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
        
        // Get twiddle data (uv for twiddle texture)
        vec2 twiddleUV = vec2((x + 0.5) / uTwiddleResolution.x, (uStage + 0.5) / uTwiddleResolution.y);
        vec4 twiddleData = texture2D(uTwiddleIndices, twiddleUV);
        
        twiddle = twiddleData.xy; 
        i1 = twiddleData.z;       
        i2 = twiddleData.w;       

        // Read from Ping-Pong texture
        vec4 pData = texture2D(uPingPong, vec2((i1 + 0.5) / resolution.x, uv.y));
        vec4 qData = texture2D(uPingPong, vec2((i2 + 0.5) / resolution.x, uv.y));
        
        // Butterfly operation
        resultData.xy = pData.xy + complexMult(twiddle, qData.xy);
        resultData.zw = pData.zw + complexMult(twiddle, qData.zw);

    } else {        
        // Get twiddle data
        vec2 twiddleUV = vec2((y + 0.5) / uTwiddleResolution.x, (uStage + 0.5) / uTwiddleResolution.y);
        vec4 twiddleData = texture2D(uTwiddleIndices, twiddleUV);
        
        twiddle = twiddleData.xy; 
        i1 = twiddleData.z;       
        i2 = twiddleData.w;       

        // Read from Ping-Pong texture
        vec4 pData = texture2D(uPingPong, vec2(uv.x, (i1 + 0.5) / resolution.y));
        vec4 qData = texture2D(uPingPong, vec2(uv.x, (i2 + 0.5) / resolution.y));
        
        // Butterfly operation
        resultData.xy = pData.xy + complexMult(twiddle, qData.xy);
        resultData.zw = pData.zw + complexMult(twiddle, qData.zw);
    }

    // Apply checkerboard sign flip in the LAST pass
    // This gives the output texture true values, ready for LinearFilter
    if (uFinalPass) {
        float signMultiplier = mod(x + y, 2.0) == 0.0 ? 1.0 : -1.0;
        resultData *= signMultiplier;
    }

    gl_FragColor = resultData;
}