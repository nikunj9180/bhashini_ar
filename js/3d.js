// 3d.js

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader';

let scene, camera, renderer, controls, model;

export function loadModel(modelPath) {
  const container = document.getElementById('container');

  // If scene already exists, remove all its children
  if (scene) {
    scene.remove(model);
    renderer.dispose(); // Dispose renderer to release resources
  } else {
    // Create scene, camera, and renderer
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);

    camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.setY(3);
    camera.position.setZ(7);
    camera.position.setX(-2);

    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // Window resize handler
    function onWindowResize() {
      const width = container.clientWidth;
      const height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    }

    window.addEventListener('resize', onWindowResize);
  }

  // Load custom .glb file
  const loader = new GLTFLoader();
  loader.load(
    modelPath,
    function (gltf) {
      if (model) {
        scene.remove(model);
      }
      model = gltf.scene;

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
      // console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      console.error('Error loading GLTF model:', error);
    }
  );
}
