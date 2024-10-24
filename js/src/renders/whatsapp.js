import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export class state {
  constructor() {
    this.isMouseOver = false;
  }

  get() {
    return this.isMouseOver;
  }

  set(value) {
    this.isMouseOver = value;
  }
}

export const whatsapp = () => {
  const data = new state();
  const id = document.getElementById("whatsapp");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(1, 100 / 100, 10, 1000);
  camera.position.set(0, 0, 40);

  const controls = new OrbitControls(camera, id);
  controls.target.set(0, 0, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.update();

  const light = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(light);

  const directionalLightLeft = new THREE.DirectionalLight(0xffffff, 2);
  directionalLightLeft.position.set(-1.5, 0, 1);
  scene.add(directionalLightLeft);

  const directionalLightRight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLightRight.position.set(1.5, 0, 1);
  scene.add(directionalLightRight);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  let objModel;
  loader.load("./js/src/models/whatsapp.glb", (gltf) => {
    objModel = gltf.scene;
    objModel.position.set(0, 0, 0);
    scene.add(objModel);
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(70, 70);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  id.appendChild(renderer.domElement);

  const clock = new THREE.Clock();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let mouseSpeed = 0.5;
  const rotationRange = Math.PI / 6;

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (objModel) {
      const intersects = raycaster.intersectObject(objModel, true);
      if (intersects.length > 0) {
        data.set(true);
      } else {
        data.set(false);
      }
    }
  }

  id.addEventListener("mouseover", onMouseMove, false);

  id.addEventListener("mouseout", () => data.set(false), false);

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (data.get() && objModel) {
      objModel.rotation.y += mouseSpeed * delta;
      if (
        objModel.rotation.y > rotationRange ||
        objModel.rotation.y < -rotationRange
      ) {
        mouseSpeed *= -1;
      }
    }
    if (objModel && !data.get()) {
      objModel.rotation.y = 0;
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
};
