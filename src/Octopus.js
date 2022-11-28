import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import OctopusVertexShader from './shaders/OctopusVertexShader.glsl'
import OctopusFragmentShader from './shaders/OctopusFragmentShader.glsl'


const gltfLoader = new GLTFLoader()

const OctopusWireFrameMaterial = new THREE.ShaderMaterial({
    vertexShader: OctopusVertexShader,
    fragmentShader: OctopusFragmentShader,
    wireframe: true
});



function generateOctopus() {
    const Octopus = new THREE.Object3D();
    gltfLoader.load(
        //'/models/Duck/glTF-Binary/Duck.glb',
        '/models/OctopusLow.glb',
        (gltf) => {
            console.log('success')
            const children = [...gltf.scene.children]
            for (const child of children) {
                console.log(child)
                child.material = OctopusWireFrameMaterial
                Octopus.add(child)
            }
            console.log(gltf)
        },
        // (progress) => {
        //     console.log('progress')
            // console.log(progress)
        // },
        // (error) => {
        //     console.log('error')
        //     console.log(error)
        // }
    )
    // console.log(Octopus)
    //const OctopusClone = Octopus.clone();
    // OctopusClone.children = Octopus.children
    // console.log(OctopusClone)
    Octopus.position.y = 1.5
    Octopus.rotation.x = Math.random() * 2 * Math.PI
    Octopus.rotation.y = Math.random() * 2 * Math.PI
    Octopus.rotation.z = Math.random() * 2 * Math.PI
    return Octopus
}

export { generateOctopus }