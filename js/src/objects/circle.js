import * as THREE from 'three';
import { scene } from '../env/enviroment.js';

export const Circle = ( color, radius, position ) => {

    const colorCircle = new THREE.Color( color );
    const widthSegments = 50;  // ui: widthSegments
    const heightSegments = 50;  // ui: heightSegments
    const geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
    const material = new THREE.MeshPhongMaterial( { color: colorCircle, emissive: 0x112244 } );
    const circle = new THREE.Mesh( geometry, material );
    circle.position.x = position;
    scene.add( circle );
    return circle;
};