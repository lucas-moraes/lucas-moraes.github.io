import { GLTFLoader } from '../../modules/loaders/GLTFLoader.js';
import { DRACOLoader } from '../../modules/loaders/DRACOLoader.js';
import { scene } from '../env/enviroment.js';

export function Cranium () {

    const dracoLoader = new DRACOLoader();
    const cranium = new GLTFLoader();

    cranium.setDRACOLoader( dracoLoader );

    cranium.load( ( './model/face.glb' ), ( glb ) => {
        const cramiumModel = glb.scene;
        scene.add( cramiumModel );
    } );
}


