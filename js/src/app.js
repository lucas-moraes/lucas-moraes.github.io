import * as THREE from 'three';

import { scene, camera } from './env/enviroment.js';

import { Cranium } from './objects/cranium.js';
import { Stars } from './objects/stars.js';

import Stats from '../modules/libs/stats.module.js';


( () => {
    let stats = new Stats();
    document.body.appendChild( stats.dom );

    Stars();
    Cranium();

    let renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setAnimationLoop( () => {
        renderer.render( scene, camera );
        stats.update();
    } );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
    } );

} )();