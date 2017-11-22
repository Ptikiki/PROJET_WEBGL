uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec2 random2( vec2 p ) {
	return fract(sin(vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))))*43758.5453);
}

float noise(vec2 st) {
	vec2 i = floor(st);
	vec2 f = fract(st);

	vec2 u = f*f*(3.0-2.0*f);

	return mix( mix( dot( random2(i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ),
					dot( random2(i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
				 mix( dot( random2(i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ),
					dot( random2(i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
}

void main() {
	vec2 st = gl_FragCoord.xy/u_resolution.xy;
	st.x *= u_resolution.x/u_resolution.y;
	vec3 color = vec3(.0);

	st *= 14.352;

	vec2 i_st = floor(st);
	vec2 f_st = fract(st);

	float m_dist = 2.;
	vec2 m_point = vec2(0.);

	for (int j=-1; j<=1; j++ ) {
			for (int i=-1; i<=1; i++ ) {
					vec2 neighbor = vec2(float(i),float(j));
					vec2 point = random2(i_st + neighbor);
					point = sin( 10. *  noise(st*0.608)) + 0.5*sin(u_time + 5.523*point);
					vec2 diff = neighbor + point - f_st;
					float dist = length(diff);

					if( dist < m_dist ) {
						m_dist = dist;
						m_point = point;
					}
			}
	}

	color += dot(m_point,vec2(0.760,1.000));
	color.r = m_point.y ;

	gl_FragColor = vec4(color,1.0);
}
