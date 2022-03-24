import * as THREE from 'three';
import { scene } from '../env/enviroment.js';

export const Orbit = ( addObject, rotationX ) => {
    const orbit = new THREE.Group();
    orbit.add( addObject );
    orbit.rotation.x = rotationX;
    scene.add( orbit );
    return orbit;
};

export const OrbitLine = ( color, size ) => {
    const curve = new THREE.EllipseCurve(
        0, 0,
        size, size,
        0, 2 * Math.PI,
        false,
        0
    );
    const points = curve.getPoints( 100 );
    const geometry = new THREE.BufferGeometry().setFromPoints( points );
    const material = new THREE.LineDashedMaterial( {
        color: color,
        linewidth: 0.1,
        dashSize: 0.1,
        gapSize: 0.1,
        transparent: true,
        opacity: 0.5
    } );
    const ellipse = new THREE.Line( geometry, material );
    ellipse.rotation.x = 30;
    ellipse.computeLineDistances();
    return ellipse;
};