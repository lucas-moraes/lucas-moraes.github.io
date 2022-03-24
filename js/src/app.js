import * as THREE from 'three';

import { scene, camera } from './env/enviroment.js';

import { Cranium } from './objects/cranium.js';
import { Stars } from './objects/stars.js';
import { Circle } from './objects/circle.js';
import { Orbit, OrbitLine } from './objects/properts.js';

import Stats from '../modules/libs/stats.module.js';

let renderer, orbit_1, orbit_2, stats;

( () => {
    stats = new Stats();
    document.body.appendChild( stats.dom );

    Stars();
    Cranium();

    const circle1 = Circle( 0xbd00ff, 0.1, 0.5 );
    orbit_1 = Orbit( circle1, 10 );
    const circle1_orbit_line = OrbitLine( 0xbd00ff, 0.5 );
    orbit_1.add( circle1_orbit_line );


    const circle2 = Circle( 0x0077d0, 0.1, 1 );
    orbit_2 = Orbit( circle2, -10 );
    const circle2_orbit_line = OrbitLine( 0x0077d0, 1 );
    orbit_2.add( circle2_orbit_line );


    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    //renderer.setAnimationLoop( render );
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.85;
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    } );

    animate();
} )();


function animate () {

    requestAnimationFrame( animate );

    orbit_1.rotation.y = - performance.now() * 0.001;
    orbit_2.rotation.y = performance.now() * 0.0015;

    render();
    stats.update();
};

function render () {
    renderer.render( scene, camera );
};

