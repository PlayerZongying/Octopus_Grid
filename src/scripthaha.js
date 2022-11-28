import './style.css'
import { vertices } from './vertices'
import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import * as dat from 'lil-gui'
import { initGUI, genenrateBoxHelper, generatePointCloud } from './InitGui'
// import {  } from './InitGui'
import { Color, Vector3 } from 'three'
import OctopusVertexShader from'./shaders/OctopusVertexShader.glsl'
import OctopusFragmentShader from'./shaders/OctopusFragmentShader.glsl'

let camera, scene, renderer, controls;

const objects = [];

let raycaster;

let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
let canJump = false;

let prevTime = performance.now();
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
const vertex = new THREE.Vector3();
const color = new THREE.Color();

init();
animate();

function init() {

    initGUI()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 10;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    scene.fog = new THREE.Fog(0xffffff, 0, 750);

    const light = new THREE.HemisphereLight(0xeeeeff, 0x777788, 0.75);
    light.position.set(0.5, 1, 0.75);
    scene.add(light);

    controls = new PointerLockControls(camera, document.body);

    const blocker = document.getElementById('blocker');
    const instructions = document.getElementById('instructions');

    instructions.addEventListener('click', function () {

        controls.lock();

    });

    controls.addEventListener('lock', function () {

        instructions.style.display = 'none';
        blocker.style.display = 'none';

    });

    controls.addEventListener('unlock', function () {

        blocker.style.display = 'block';
        instructions.style.display = '';

    });

    scene.add(controls.getObject());

    const onKeyDown = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = true;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = true;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = true;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = true;
                break;

            case 'Space':
                if (canJump === true) velocity.y += 350;
                canJump = false;
                break;

        }

    };

    const onKeyUp = function (event) {

        switch (event.code) {

            case 'ArrowUp':
            case 'KeyW':
                moveForward = false;
                break;

            case 'ArrowLeft':
            case 'KeyA':
                moveLeft = false;
                break;

            case 'ArrowDown':
            case 'KeyS':
                moveBackward = false;
                break;

            case 'ArrowRight':
            case 'KeyD':
                moveRight = false;
                break;

        }

    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);

    raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0), 0, 10);

    // floor

    let floorGeometry = new THREE.PlaneGeometry(2000, 2000, 100, 100);
    floorGeometry.rotateX(- Math.PI / 2);

    // vertex displacement

    let position = floorGeometry.attributes.position;

    for (let i = 0, l = position.count; i < l; i++) {

        vertex.fromBufferAttribute(position, i);

        vertex.x += Math.random() * 20 - 10;
        vertex.y += Math.random() * 2;
        vertex.z += Math.random() * 20 - 10;

        position.setXYZ(i, vertex.x, vertex.y, vertex.z);

    }

    floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

    position = floorGeometry.attributes.position;
    const colorsFloor = [];

    for (let i = 0, l = position.count; i < l; i++) {

        color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
        colorsFloor.push(color.r, color.g, color.b);

    }

    floorGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsFloor, 3));

    const floorMaterial = new THREE.MeshBasicMaterial({ vertexColors: true });

    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    scene.add(floor);

    // mesh

    // const geometry = new THREE.BufferGeometry();
    // geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    // const wireframe = new THREE.WireframeGeometry(geometry);

    // const line = new THREE.LineSegments(wireframe);
    // line.material.depthTest = false;
    // // line.material.opacity = 0.75;
    // // line.material.transparent = true;
    // line.material.color = new THREE.Color(0x000000)

    // line.position.x = 0
    // line.position.y = 5
    // line.position.z = -5

    // scene.add(line);
    // console.log(line)

    // objects
    

    // const boxGeometry = new THREE.BoxGeometry(20, 20, 20).toNonIndexed();

    // position = boxGeometry.attributes.position;
    // const colorsBox = [];

    // for (let i = 0, l = position.count; i < l; i++) {

    //     color.setHSL(Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75);
    //     colorsBox.push(color.r, color.g, color.b);

    // }

    // boxGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colorsBox, 3));

    // for (let i = 0; i < 500; i++) {

    //     const boxMaterial = new THREE.MeshPhongMaterial({ specular: 0xffffff, flatShading: true, vertexColors: true });
    //     boxMaterial.color.setHSL(Math.random() * 0.2 + 0.5, 0.75, Math.random() * 0.25 + 0.75);

    //     const box = new THREE.Mesh(boxGeometry, boxMaterial);


    //     box.position.x = Math.floor(Math.random() * 20 - 10) * 20;
    //     box.position.y = Math.floor(Math.random() * 20) * 20 + 10;
    //     box.position.z = Math.floor(Math.random() * 20 - 10) * 20;

    //     scene.add(box);
    //     objects.push(box);

    // }

    const helper = genenrateBoxHelper(0,0,0)
    scene.add(helper)
    const pointCloud = generatePointCloud()
    // scene.add(pointCloud)

    const gltfLoader = new GLTFLoader()

    const OctopusWireFrameMaterial = new THREE.ShaderMaterial({
        vertexShader: OctopusVertexShader,
        fragmentShader: OctopusFragmentShader,
        wireframe: true
    });

    gltfLoader.load(
        // '/models/Duck/glTF-Binary/Duck.glb',
        // '/models/custle.glb',
        '/models/OctopusWireFrame.glb',
        // '/models/tentacle.glb',
        (gltf) => {
            //console.log('success')
            
            const children = [...gltf.scene.children]
            for (const child of children) {
                child.material = OctopusWireFrameMaterial;
            }
            // gltf.scene.position.x = Math.floor(Math.random() * 20 - 10) * 20;
            gltf.scene.position.y = 5;
            // gltf.scene.position.z = Math.floor(Math.random() * 20 - 10) * 20;
            scene.add(gltf.scene)
            console.log(gltf)
        },
        (progress) => {
            //console.log('progress')
            //console.log(progress)
        },
        (error) => {
            //console.log('error')
            //console.log(error)
        }
    )

    // for(let i = 0; i < 100; i++){
    //     gltfLoader.load('/models/GLASSBOX.glb', (gltf) => loadRandom(gltf))
    // }

    // for(let i = 0; i < 1; i++){
    //     gltfLoader.load('/models/Octopus.glb', (gltf) => loadRandom(gltf))
    // }

    // for(let i = 0; i < 10; i++){
    //     gltfLoader.load('/models/custle.glb', (gltf) => loadRandom(gltf))
    // }


    function loadRandom(gltf) {
        console.log(gltf)
        // const children = [...gltf.scene.children]
        // for (const child of children) {
        //     scene.add(child)
        // }
        gltf.scene.position.x = Math.floor(Math.random() * 20 - 10) * 10;
        gltf.scene.position.y = Math.floor(Math.random() * 20) * 10;
        gltf.scene.position.z = Math.floor(Math.random() * 20 - 10) * 10;
        scene.add(gltf.scene)
    }


    //

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    //

    window.addEventListener('resize', onWindowResize);

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

    requestAnimationFrame(animate);

    const time = performance.now();

    if (controls.isLocked === true) {

        raycaster.ray.origin.copy(controls.getObject().position);
        raycaster.ray.origin.y -= 10;

        const intersections = raycaster.intersectObjects(objects, false);

        const onObject = intersections.length > 0;

        const delta = (time - prevTime) / 1000;

        velocity.x -= velocity.x * 10.0 * delta;
        velocity.z -= velocity.z * 10.0 * delta;

        velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass

        direction.z = Number(moveForward) - Number(moveBackward);
        direction.x = Number(moveRight) - Number(moveLeft);
        direction.normalize(); // this ensures consistent movements in all directions

        if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
        if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

        if (onObject === true) {

            velocity.y = Math.max(0, velocity.y);
            canJump = true;

        }

        controls.moveRight(- velocity.x * delta);
        controls.moveForward(- velocity.z * delta);

        controls.getObject().position.y += (velocity.y * delta); // new behavior

        if (controls.getObject().position.y < 10) {

            velocity.y = 0;
            controls.getObject().position.y = 10;

            canJump = true;

        }

    }

    prevTime = time;

    renderer.render(scene, camera);

}



