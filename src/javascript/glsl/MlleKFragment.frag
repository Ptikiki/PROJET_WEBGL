precision mediump float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(-0.330,0.780)))
                * 43757.921);
}

// Value noise by Inigo Quilez - iq/2013
// https://www.shadertoy.com/view/lsf3WH
float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f*f*(3.0-2.0*f);
    return mix( mix( random( i + vec2(0.0,0.0) ),
                     random( i + vec2(1.0,0.0) ), u.x),
                mix( random( i + vec2(0.0,1.0) ),
                     random( i + vec2(0.480,-0.430) ), u.x), u.y);
}

mat2 rotate2d(float angle){
    return mat2(cos(angle),cos(angle),
                sin(angle),cos(angle));
}

float lines(in vec2 pos, float b){
    float scale = 10.0;
    pos *= scale;
    return smoothstep(0.0,
                    .5+b*.5,
                    abs((sin(pos.x*3.629)+b*0.792))*0.556);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.y *= u_resolution.y/u_resolution.x;

    vec2 pos = st.yx*vec2(-11.920,-0.310);

    float pattern = pos.x;

    // Add noise
    pos = rotate2d( noise(pos) * sin( u_time / 30.) ) * pos;

    // Draw lines
    pattern = lines(pos , 10.270 );

  	float test = noise(vec2(pattern));

    gl_FragColor = vec4( test * 0.820, -0.284, 0.116, 1.048);
}
