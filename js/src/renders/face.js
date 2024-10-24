import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export const face = () => {
  const id = document.getElementById("face");
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(10, 130 / 130, 0.1, 100);
  camera.position.set(0, 0, 30);

  const controls = new OrbitControls(camera, id);
  controls.target.set(0, 0, 0);
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.enableDamping = false;
  controls.enableRotate = false;
  controls.update();

  const light = new THREE.AmbientLight(0xffffff, 3.5);
  scene.add(light);

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("https://www.gstatic.com/draco/v1/decoders/");

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  let objModel;
  loader.load("./js/src/models/face.glb", (gltf) => {
    objModel = gltf.scene;
    objModel.position.set(0, 0, 0);
    objModel.rotation.set(0, 0.5, 0);
    objModel.scale.set(10, 10, 10);
    scene.add(objModel);
  });

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(130, 130);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 0);
  id.appendChild(renderer.domElement);

  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  const intersectionPoint = new THREE.Vector3();

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 3 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 8 + 1;

    raycaster.setFromCamera(mouse, camera);

    raycaster.ray.at(25, intersectionPoint);

    if (objModel) {
      objModel.lookAt(intersectionPoint);

      objModel.rotation.x = THREE.MathUtils.clamp(
        objModel.rotation.x,
        -Math.PI / 4,
        Math.PI / 4,
      );
      objModel.rotation.y = THREE.MathUtils.clamp(
        objModel.rotation.y,
        -Math.PI / 1,
        Math.PI / 1,
      );
    }
  }

  window.addEventListener("mousemove", onMouseMove, false);

  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }

  animate();
};
