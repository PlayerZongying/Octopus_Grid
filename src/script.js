import './style.css'
import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { generateOctopus } from './Octopus'
import { generateCage } from './Cage'
import { generateCorridor } from './CagedOctopus'


//import * as dat from 'lil-gui'


/**
 * Base
 */
// Debug
//const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000000);

/**
 * Floor
 */
// const floor = new THREE.Mesh(
//     new THREE.PlaneGeometry(100, 100),
//     new THREE.MeshStandardMaterial({
//         color: '#444444',
//         metalness: 0,
//         roughness: 0.5
//     })
// )
// floor.receiveShadow = true
// floor.rotation.x = - Math.PI * 0.5
// scene.add(floor)

const size = 77;
const divisions = 11;

const gridHelper1 = new THREE.GridHelper(size, divisions, 0xffeded, 0xffeded);
scene.add(gridHelper1);
const gridHelper2 = new THREE.GridHelper(size, divisions, 0xffeded, 0xffeded);
scene.add(gridHelper2);
const gridHelper3 = new THREE.GridHelper(size, divisions, 0xffeded, 0xffeded);
scene.add(gridHelper3);


/**
 * Lights
 */
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
// scene.add(ambientLight)

// const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
// directionalLight.castShadow = true
// directionalLight.shadow.mapSize.set(1024, 1024)
// directionalLight.shadow.camera.far = 15
// directionalLight.shadow.camera.left = - 7
// directionalLight.shadow.camera.top = 7
// directionalLight.shadow.camera.right = 7
// directionalLight.shadow.camera.bottom = - 7
// directionalLight.position.set(5, 5, 5)
// scene.add(directionalLight)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}


window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Models
 */

// let octopus = generateOctopus()
// scene.add(octopus)
// console.log(octopus.children)
// let octopus2 = generateOctopus()
// octopus2.position.y = 10
// scene.add(octopus2)
// console.log(octopus2.children)
// let cage = generateCage()
// scene.add(cage)
let Corridor1 = generateCorridor()
scene.add(Corridor1)
let Corridor2 = generateCorridor()
scene.add(Corridor2)
let Corridor3 = generateCorridor()
scene.add(Corridor3)
// let Corridor4 = generateCorridor()
// scene.add(Corridor4)
// const r = 5
// const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
// helper.material.color.setHex(0x101010);
// helper.material.blending = THREE.AdditiveBlending;
// helper.material.transparent = true;
// scene.add(helper)


/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 60)
camera.position.set(0, 10, 20)
// camera.rotateX(-Math.PI/4);
// camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), -45)
scene.add(camera)

/**
 * Contral
 */
// const controls = new OrbitControls(camera, canvas)
// controls.target.set(0, 0.75, 0)
// controls.enableDamping = true
// scene.add(controls.object);

/**
 * Movement
 */
// let moveForward = false;
// let moveBackward = false;
// let moveLeft = false;
// let moveRight = false;
// let canJump = false;

// let prevTime = performance.now();
// const velocity = new THREE.Vector3();
// const direction = new THREE.Vector3();
// const vertex = new THREE.Vector3();

// const onKeyDown = function (event) {
//     console.log(event.code + "down")

//     switch (event.code) {

//         case 'ArrowUp':
//         case 'KeyW':
//             moveForward = true;
//             break;

//         case 'ArrowLeft':
//         case 'KeyA':
//             moveLeft = true;
//             break;

//         case 'ArrowDown':
//         case 'KeyS':
//             moveBackward = true;
//             break;

//         case 'ArrowRight':
//         case 'KeyD':
//             moveRight = true;
//             break;

//         case 'Space':
//             if (canJump === true) velocity.y += 350;
//             canJump = false;
//             break;

//     }

// };

// const onKeyUp = function (event) {
//     console.log(event.code + "up")

//     switch (event.code) {

//         case 'ArrowUp':
//         case 'KeyW':
//             moveForward = false;
//             break;

//         case 'ArrowLeft':
//         case 'KeyA':
//             moveLeft = false;
//             break;

//         case 'ArrowDown':
//         case 'KeyS':
//             moveBackward = false;
//             break;

//         case 'ArrowRight':
//         case 'KeyD':
//             moveRight = false;
//             break;

//     }

// };

// document.addEventListener('keydown', onKeyDown);
// document.addEventListener('keyup', onKeyUp);



/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Update controls
    // controls.update()

    // Update Object
    let freq = 1 / (3 * 6) // a whole period is 3 * x seconds
    let phase = 1 / 3
    let corridorInterval = 63
    Corridor1.position.z = 2 * corridorInterval * (elapsedTime * freq + phase * 0 - Math.floor(elapsedTime * freq + phase * 0)) - corridorInterval
    Corridor2.position.z = 2 * corridorInterval * (elapsedTime * freq + phase * 1 - Math.floor(elapsedTime * freq + phase * 1)) - corridorInterval
    Corridor3.position.z = 2 * corridorInterval * (elapsedTime * freq + phase * 2 - Math.floor(elapsedTime * freq + phase * 2)) - corridorInterval
    // Corridor4.position.z = 2 * 60 * (elapsedTime * freq + phase * 3 - Math.floor(elapsedTime * freq + phase * 3)) - 60

    let gridInterval = 105
    freq = freq * corridorInterval / gridInterval
    gridHelper1.position.z = 2 * gridInterval * (elapsedTime * freq + phase * 0 - Math.floor(elapsedTime * freq + phase * 0)) - gridInterval
    gridHelper2.position.z = 2 * gridInterval * (elapsedTime * freq + phase * 1 - Math.floor(elapsedTime * freq + phase * 1)) - gridInterval
    gridHelper3.position.z = 2 * gridInterval * (elapsedTime * freq + phase * 2 - Math.floor(elapsedTime * freq + phase * 2)) - gridInterval

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()