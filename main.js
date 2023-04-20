import * as THREE from "three";
import { FBXLoader } from "three/addons/loaders/FBXLoader.js";

const avatarDiv = document.getElementById("avatar-bizome");
const canvasWidth = 150;
const canvasHeight = 150;
const backgroundColor = new THREE.Color(0xffffff);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  canvasWidth / canvasHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

const textureLoader = new THREE.TextureLoader();
const modelLoader = new FBXLoader();

renderer.setPixelRatio(window.devicePixelRatio);
renderer.domElement.classList.add("img-perfil");
avatarDiv.appendChild(renderer.domElement);

const textures = {
  baseColor: textureLoader.load("/assets/models/textures/BaseColor.png"),
  normalMap: textureLoader.load("/assets/models/textures/NormalMap.jpg"),
  occlusionMap: textureLoader.load("/assets/models/textures/Oclusion.jpg"),
};

const material = new THREE.MeshBasicMaterial({
  map: textures.baseColor,
  // normalMap: textures.normalMap,
  aoMap: textures.occlusionMap,
  aoMapIntensity: 1,
  side: THREE.DoubleSide,
});

const model = modelLoader.load("/assets/models/Bizome.fbx", function (object) {
  object.traverse(function (child) {
    if (child.isMesh) {
      child.material = material;
    }
  });

  object.scale.set(0.1, 0.1, 0.1);
  scene.add(object);
});

scene.background = backgroundColor;
camera.position.z = 3;
camera.position.y = 13;
camera.position.x = 0;

const animate = function () {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);

  scene.rotation.y += 0.01;
};

animate();
