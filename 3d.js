import * as THREE from "three";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

var camera, scene, renderer;
var geometry, material, mesh;

function init() {
  const length = 12 * 100; // 12m in centimeters
  const radius = 0.8 / 2; // 0.8cm in radius
  const distance = 20; // 20cm distance between bars


  camera = new THREE.PerspectiveCamera(1.1 * length, window.innerWidth / window.innerHeight, 0.1, 1.1 * length);
  camera.position.x = length;
  camera.position.y = length;
  camera.position.z = length;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // geometry = new THREE.SphereGeometry(1);
  // material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: true });

  // mesh = new THREE.Mesh(geometry, material);
  //scene.add(mesh);

  const lungime = 12;
  const latime = 3.5;
  const inaltime = 1.1;
  const diametru = 0.8;

  // const paralelipipedGeometry = new THREE.BoxGeometry(lungime, latime, inaltime);
  // const material2 = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  // const paralelipiped = new THREE.Mesh(paralelipipedGeometry, material);
  // scene.add(paralelipiped);

  const grosime_placa = 0.1;
  const placi = [];

  const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 24 });
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 32);

  function createSteelBars() {
    const group = new THREE.Group();

    //for (let i = 0; i < 4; i++) {
    function createBar(x, y) {
      const bar = new THREE.Mesh(geometry, material);
      bar.position.set(x, y, 0);
      return bar
    }
    //bar.rotation.z = Math.PI / 2;
    group.add(createBar(0, 0));
    group.add(createBar(0, 20));
    group.add(createBar(20, 0));
    group.add(createBar(20, 20));
    //}
    group.rotation.z = Math.PI / 2;

    return group;
  }

  const steelBars = createSteelBars();
  scene.add(steelBars);
  const axesHelper = new THREE.AxesHelper(2 * length); // 500 este lungimea axelor
  scene.add(axesHelper);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true; // Enable smooth rotation
  controls.dampingFactor = 0.1; // Adjust the damping factor for smoothness

  document.body.appendChild(renderer.domElement);
}

function animate(time) {
  // mesh.rotation.x = time * 0.0005;
  // mesh.rotation.y = time * 0.001;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

init();
requestAnimationFrame(animate);
