import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * House
 */
// // Temporary sphere
// const sphere = new THREE.Mesh(
//   new THREE.SphereGeometry(1, 32, 32),
//   new THREE.MeshStandardMaterial({ roughness: 0.7 })
// );
// sphere.position.y = 1;
// scene.add(sphere);

/**
 * Models
 */
const gltfLoader = new GLTFLoader();
// // gltf
// gltfLoader.load("/gltf/bedroll.glb", (gltf) => {
//   const bedroll = gltf.scene.children[0];
//   bedroll.position.set(0, 5, 0);
//   scene.add(bedroll);
// });

// LOading Multiple Models
function loadModel(url) {
  return new Promise((resolve) => {
    new GLTFLoader().load(url, resolve);
  });
}
let model1, model2, model3, model4, model5, model6, model7;

let p1 = loadModel("gltf/bedroll.glb").then((result) => {
  model1 = result.scene.children[0];
});
let p2 = loadModel("gltf/floor.glb").then((result) => {
  model2 = result.scene.children[0];
});
let p3 = loadModel("gltf/bedrollFrame.glb").then((result) => {
  model3 = result.scene.children[0];
});
let p4 = loadModel("gltf/rockA.glb").then((result) => {
  model4 = result.scene.children[0];
});

let p5 = loadModel("gltf/tent.glb").then((result) => {
  model5 = result.scene.children[0];
});

//if all Promises resolved
Promise.all([p1, p2, p3, p4, p5]).then(() => {
  //do something to the model
  model1.position.set(0, 0.5, 0);
  model2.position.set(1, 0, -1);
  model3.position.set(0, 0, 0);
  model4.position.set(0, 0, -6);
  model5.position.set(-4, 0, 0);
  /**
   *
   */

  //   setting the scale
  model4.scale.set(4, 3, 4);
  //   model5.scale.set(0.5, 0.5, 0.5);
  //add model to the scene
  scene.add(model1);
  scene.add(model2);
  scene.add(model3);
  scene.add(model4);
  scene.add(model5);
  //   scene.add(model5);

  //continue the process
  startRenderLoop();
});

/**
 * adding multiple times
 */
// grasses
for (let i = 0; i < 200; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 3 + Math.random() * 6; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  const h = Math.random() + 0.2;

  gltfLoader.load("/gltf/grass.glb", (gltf) => {
    const bedroll = gltf.scene.children[0];
    bedroll.position.set(x, 0, z);
    bedroll.scale.set(0.2, h, 0.2);
    scene.add(bedroll);
  });
}

// tree
for (let i = 0; i < 20; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 5 + Math.random() * 6; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  const h = Math.random() + 0.2;

  gltfLoader.load("/gltf/tree.glb", (gltf) => {
    const bedroll = gltf.scene.children[0];
    bedroll.position.set(x, 0, z);
    bedroll.scale.set(0.5, h, 0.5);
    scene.add(bedroll);
  });
}

// tree fall
// tree
for (let i = 0; i < 10; i++) {
  const angle = Math.random() * Math.PI * 2; // Random angle
  const radius = 5 + Math.random() * 6; // Random radius
  const x = Math.cos(angle) * radius; // Get the x position using cosinus
  const z = Math.sin(angle) * radius; // Get the z position using sinus

  const h = Math.random() + 0.2;

  gltfLoader.load("/gltf/treeFall.glb", (gltf) => {
    const bedroll = gltf.scene.children[0];
    bedroll.position.set(x, 0, z);
    bedroll.scale.set(0.5, h, 0.5);
    scene.add(bedroll);
  });
}

/**
 * // Floor
 *
 */
const grassColorTexture = textureLoader.load("/textures/grass/color.jpg");
const grassAmbientOcclusionTexture = textureLoader.load(
  "/textures/grass/ambientOcclusion.jpg"
);
const grassNormalTexture = textureLoader.load("/textures/grass/normal.jpg");
const grassRoughnessTexture = textureLoader.load(
  "/textures/grass/roughness.jpg"
);

const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20),
  new THREE.MeshStandardMaterial({
    map: grassColorTexture,
    aoMap: grassAmbientOcclusionTexture,
    normalMap: grassNormalTexture,
    roughnessMap: grassRoughnessTexture,
  })
);
floor.geometry.setAttribute(
  "uv2",
  new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
);
// pattern set
grassColorTexture.repeat.set(8, 8);
grassAmbientOcclusionTexture.repeat.set(8, 8);
grassNormalTexture.repeat.set(8, 8);
grassRoughnessTexture.repeat.set(8, 8);

// setting te wraps
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;

grassColorTexture.wrapT = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.15);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new THREE.DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();