import * as THREE from 'three';
import { scene } from '../env/enviroment.js';

export const Stars = () => {

    const radius = 6371;

    let colorStars1 = 0x000000;//0x555555;
    let colorStars2 = 0x000000;//0x555555;
    let colorStars3 = 0x000000;//0x333333;
    let colorStars4 = 0x000000;//0x3a3a3a;
    let colorStars5 = 0x000000;//0x1a1a1a;
    let colorStars6 = 0x000000;//0x1a1a1a;

    const r = radius, starsGeometry = [ new THREE.BufferGeometry(), new THREE.BufferGeometry() ];

    const vertices1 = [];
    const vertices2 = [];

    const vertex = new THREE.Vector3();

    for ( let i = 0; i < 250; i++ )
    {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );

        vertices1.push( vertex.x, vertex.y, vertex.z );

    }

    for ( let i = 0; i < 1500; i++ )
    {

        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar( r );

        vertices2.push( vertex.x, vertex.y, vertex.z );

    }

    starsGeometry[ 0 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices1, 3 ) );
    starsGeometry[ 1 ].setAttribute( 'position', new THREE.Float32BufferAttribute( vertices2, 3 ) );

    const starsMaterials = [
        new THREE.PointsMaterial( { color: colorStars1, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: colorStars2, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: colorStars3, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: colorStars4, size: 1, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: colorStars5, size: 2, sizeAttenuation: false } ),
        new THREE.PointsMaterial( { color: colorStars6, size: 1, sizeAttenuation: false } )
    ];

    for ( let i = 10; i < 30; i++ )
    {

        const stars = new THREE.Points( starsGeometry[ i % 2 ], starsMaterials[ i % 6 ] );

        stars.rotation.x = Math.random() * 6;
        stars.rotation.y = Math.random() * 6;
        stars.rotation.z = Math.random() * 6;
        stars.scale.setScalar( i * 10 );

        stars.matrixAutoUpdate = false;
        stars.updateMatrix();

        scene.add( stars );

    }


};

