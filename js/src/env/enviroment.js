import * as THREE from 'three';

import { OrbitControls } from '../../modules/controls/OrbitControls.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color( 0xf1f1f1 );
scene.fog = new THREE.FogExp2( 0xf1f1f1, 0.00000025 );

export const camera = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1e7
);
camera.position.set( 0.5, 0.5, 2 );


let controls = new OrbitControls( camera, document.body );
controls.target.set( 0, 0, 0 );
controls.minDistance = 0.5;
controls.maxDistance = 3;
controls.update();

const light = new THREE.AmbientLight( 0xffffff );

const dirLight = new THREE.DirectionalLight( 0xffffff );
dirLight.position.set( - 1, 0, 1 ).normalize();

scene.add( light, dirLight );