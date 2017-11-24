#define SHADOW
varying vec3 vLightFront;
#ifdef DOUBLE_SIDED
	varying vec3 vLightBack;
#endif


#include <shadowmap_pars_vertex>

uniform float u_time;
uniform float u_amplitude;
uniform float u_frequence;

float scalarMove;
vec3 newPos;


void main() {
	#include <begin_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>

  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.);
  
}



