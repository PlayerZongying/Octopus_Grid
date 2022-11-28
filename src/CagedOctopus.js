import * as THREE from 'three'
import { generateOctopus } from './Octopus'
import { generateCage } from './Cage'

function generateCagedOctopus() {
    const set = new THREE.Object3D();
    // if (Math.random() > 0.5) {
    // }
    const octopus = generateOctopus();
    set.add(octopus);
    const cage = generateCage();
    set.add(cage);
    return set
}


function generateWall() {
    const wall = new THREE.Object3D();

    // console.log(set)
    for (let i = -2; i < 3; i++) {
        for (let j = 0; j < 7; j++) {
            const set = generateCagedOctopus();
            set.position.x = i * 7;
            set.position.y = j * 5;
            wall.add(set);
        }
    }
    return wall;
}



const middleIntervel = 13.5
const wallIntervel = 7

function generateCorridor() {
    const corridor = new THREE.Object3D();
    for (let i = 0; i < 1; i++) {
        const wall1 = generateWall();
        wall1.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.5 * Math.PI)
        wall1.position.x = -(7.5 + middleIntervel);
        wall1.position.z = -30 * i;
        const wall2 = generateWall();
        wall2.rotateOnAxis(new THREE.Vector3(0, 1, 0), - 0.5 * Math.PI)
        wall2.position.x = (7.5 + middleIntervel);
        wall2.position.z = -30 * i;
        corridor.add(wall1)
        corridor.add(wall2)

        const wall3 = generateWall();
        wall3.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.5 * Math.PI)
        wall3.position.x = -(7.5 + wallIntervel * 2 + middleIntervel);
        wall3.position.z = -30 * i;
        const wall4 = generateWall();
        wall4.rotateOnAxis(new THREE.Vector3(0, 1, 0), - 0.5 * Math.PI)
        wall4.position.x = (7.5 + wallIntervel * 2 + middleIntervel);
        wall4.position.z = -30 * i;
        corridor.add(wall3)
        corridor.add(wall4)

        const wall5 = generateWall();
        wall5.rotateOnAxis(new THREE.Vector3(0, 1, 0), 0.5 * Math.PI)
        wall5.position.x = -(7.5 - wallIntervel * 2 + middleIntervel);
        wall5.position.z = -30 * i;
        const wall6 = generateWall();
        wall6.rotateOnAxis(new THREE.Vector3(0, 1, 0), - 0.5 * Math.PI)
        wall6.position.x = (7.5 - wallIntervel * 2 + middleIntervel);
        wall6.position.z = -30 * i;
        corridor.add(wall5)
        corridor.add(wall6)
    }
    return corridor;
}



export { generateCorridor };