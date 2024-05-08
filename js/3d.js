// import '../style/3d.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

const container = document.getElementById('container');

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
camera.position.setY(3);
camera.position.setZ(7);
camera.position.setX(-2);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Load custom .glb file

const loader = new GLTFLoader();
loader.load(
  '../models/specs1.glb',
  function (gltf) {
    const model = gltf.scene;

    // Calculate bounding box of the model
    const bbox = new THREE.Box3().setFromObject(model);
    const modelSize = bbox.getSize(new THREE.Vector3());

    // Calculate scaling factor based on window size
    const maxDimension = Math.max(modelSize.x, modelSize.y, modelSize.z);
    const maxWindowSize = Math.max(container.clientWidth, container.clientHeight);
    const scaleFactor = maxWindowSize / maxDimension * 0.01; // Adjust scale as needed

    // Apply scaling factor to the model
    model.scale.set(scaleFactor, scaleFactor, scaleFactor);

    scene.add(model);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error('Error loading GLTF model:', error);
  }
);


const point = new THREE.PointLight(0xffffff);
point.position.set(5, 5, 5);
const ambient = new THREE.AmbientLight(0xffffff);
scene.add(ambient);

const lighthelper = new THREE.PointLightHelper(point);
const grid = new THREE.GridHelper(1000, 100);
// scene.add(lighthelper,grid);

const controls = new OrbitControls(camera, renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

function onWindowResize() {
  const width = container.clientWidth;
  const height = container.clientHeight;

  camera.aspect = width / height;
  camera.updateProjectionMatrix();

  renderer.setSize(width, height);
}


window.addEventListener('resize', onWindowResize);
