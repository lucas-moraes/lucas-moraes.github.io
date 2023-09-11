import * as THREE from 'three';

import { scene, camera } from './env/enviroment.js';

import { Cranium, cramiumModel } from './objects/cranium.js';
import { Stars } from './objects/stars.js';

let renderer;

( () => {   

    Stars();
    Cranium();

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( render );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    } );

    const mouse = new THREE.Vector2();

    window.addEventListener('mousemove', onMouseMove, false);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    function animate() {
        requestAnimationFrame(animate);
        if (cramiumModel) {
            const direction = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera).sub(camera.position).normalize();
            cramiumModel.lookAt(camera.position.clone().add(direction));
        }
        renderer.render(scene, camera);
    }
    
    animate();
} )();




function render () {
    renderer.render( scene, camera );
};

