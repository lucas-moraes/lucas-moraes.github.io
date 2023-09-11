import * as THREE from 'three';
import { GLTFLoader } from '../../modules/loaders/GLTFLoader.js';
import { DRACOLoader } from '../../modules/loaders/DRACOLoader.js';
import { scene } from '../env/enviroment.js';

export let cramiumModel;

export const Cranium = () => {
    const dracoLoader = new DRACOLoader();
    const cranium = new GLTFLoader();
    

    cranium.setDRACOLoader( dracoLoader );

    cranium.load( ( './model/face.glb' ), ( glb ) => {
        cramiumModel = glb.scene;
        scene.add( cramiumModel );
    } );
};


