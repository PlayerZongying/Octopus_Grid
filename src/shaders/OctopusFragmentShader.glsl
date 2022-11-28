varying vec3 vPosition;
varying vec3 vNormal;
void main() {
	vec3 toCamera = vec3(1.0, 0.0, 0.0);
	float visible = (sign(vNormal.x * toCamera.x) + 1.0) * 0.5;
	gl_FragColor = vec4( 0.5, 0.5, 0.5, visible);
}