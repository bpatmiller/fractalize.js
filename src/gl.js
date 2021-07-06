import * as THREE from "three";

let scene, camera, renderer;

export const setupGL = (lejaStack, A_nStack) => {
  // declare leja points, a_n as uniforms
  // keep 256 possible leja points, or 8 * 32
  if (renderer != null) return;

  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

  const sourceContainer = document.getElementById("resized");
  const renderWidth = sourceContainer.width;
  const renderHeight = sourceContainer.height;

  renderer = new THREE.WebGLRenderer();
  const rendererContainer = document.getElementById("fractal");
  renderer.setSize(renderWidth, renderHeight);
  rendererContainer.appendChild(renderer.domElement);

  // just a three js hello world first
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
};
