import * as THREE from 'three'
import * as dat from 'lil-gui'

const maxParticleCount = 1000;
let particleCount = 500;
const r = 800;
const rHalf = r / 2;

const effectController = {
    showDots: true,
    showLines: true,
    minDistance: 150,
    limitConnections: false,
    maxConnections: 20,
    particleCount: 500
};
function initGUI() {

    const gui = new dat.GUI();

    gui.add(effectController, 'showDots').onChange(function (value) {

        pointCloud.visible = value;

    });
    gui.add(effectController, 'showLines').onChange(function (value) {

        linesMesh.visible = value;

    });
    gui.add(effectController, 'minDistance', 10, 300);
    gui.add(effectController, 'limitConnections');
    gui.add(effectController, 'maxConnections', 0, 30, 1);
    gui.add(effectController, 'particleCount', 0, maxParticleCount, 1).onChange(function (value) {

        particleCount = parseInt(value);
        particles.setDrawRange(0, particleCount);

    });

}
function genenrateBoxHelper(x = 0, y = 0, z = 0) {
    const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
    helper.material.color.setHex(0x101010);
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    helper.position.x = x;
    helper.position.y = y;
    helper.position.z = z;
    return helper;
}
const segments = maxParticleCount * maxParticleCount;

let positions = new Float32Array(segments * 3);
let colors = new Float32Array(segments * 3);

const pMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 3,
    blending: THREE.AdditiveBlending,
    transparent: true,
    sizeAttenuation: false
});
function generatePointCloud(){

    let particles = new THREE.BufferGeometry();
    let particlePositions = new Float32Array(maxParticleCount * 3);
    const particlesData = []
    
    for (let i = 0; i < maxParticleCount; i++) {
    
        const x = Math.random() * r - r / 2;
        const y = Math.random() * r - r / 2;
        const z = Math.random() * r - r / 2;
    
        particlePositions[i * 3] = x;
        particlePositions[i * 3 + 1] = y;
        particlePositions[i * 3 + 2] = z;
    
        // add it to the geometry
        particlesData.push({
            velocity: new THREE.Vector3(- 1 + Math.random() * 2, - 1 + Math.random() * 2, - 1 + Math.random() * 2),
            numConnections: 0
        });
    
    }
    
    particles.setDrawRange(0, particleCount);
    particles.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3).setUsage(THREE.DynamicDrawUsage));
    
    // create the particle system
    let pointCloud = new THREE.Points(particles, pMaterial);
    return pointCloud;
}

export { initGUI, genenrateBoxHelper, generatePointCloud };