import * as THREE from 'three'

function generateCage() {
    const r = 4;
    const helper = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(r, r, r)));
    helper.material.color.setHex(0xffffff);
    helper.material.blending = THREE.AdditiveBlending;
    helper.material.transparent = true;
    let cage = new THREE.Object3D();
    cage.add(helper);
    cage.position.y = r/2
    return cage;
}

export {generateCage};
