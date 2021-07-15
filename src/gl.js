import * as THREE from "three";
import { PARAMS } from "./config";
import { vertexShader, fragmentShader } from "./shaders";

// panels is a jank global object of shaders on panels
let renderer, camera;
let panels = {};
let scene = new THREE.Scene();
let time = 0;
let timeDelta = -0.02;
let dragging = false;
let mouseX = 0,
  mouseY = 0,
  lastMouseX = 0,
  lastMouseY = 0;

export const updateControlUniforms = () => {
  if (panels.length == 0) return;
  for (let key in panels) {
    let material = panels[key].material;
    material.uniforms.maxIterations.value = PARAMS.maxIterations;
    material.uniforms.scale.value = PARAMS.scale;
    material.uniforms.focus.value.x = PARAMS.focus.x;
    material.uniforms.focus.value.y = PARAMS.focus.y;
  }
};

const updateUniforms = (panelIndex, an, nl, lejaPoints) => {
  let material = panels[panelIndex].material;

  time = 12.0;
  timeDelta = -0.02;
  material.uniforms.time.value = 12.0;

  material.uniforms.an.value = an;
  material.uniforms.nl.value = nl;
  material.uniforms.maxIterations.value = PARAMS.maxIterations;

  function updateLejaUniform(uni, i) {
    if (i < nl) {
      uni.value.x = lejaPoints[i].re;
      uni.value.y = lejaPoints[i].im;
    }
  }

  updateLejaUniform(material.uniforms.l1, 0);
  updateLejaUniform(material.uniforms.l2, 1);
  updateLejaUniform(material.uniforms.l3, 2);
  updateLejaUniform(material.uniforms.l4, 3);
  updateLejaUniform(material.uniforms.l5, 4);
  updateLejaUniform(material.uniforms.l6, 5);
  updateLejaUniform(material.uniforms.l7, 6);
  updateLejaUniform(material.uniforms.l8, 7);
  updateLejaUniform(material.uniforms.l9, 8);
  updateLejaUniform(material.uniforms.l10, 9);
  updateLejaUniform(material.uniforms.l11, 10);
  updateLejaUniform(material.uniforms.l12, 11);
  updateLejaUniform(material.uniforms.l13, 14);
  updateLejaUniform(material.uniforms.l14, 13);
  updateLejaUniform(material.uniforms.l15, 14);
  updateLejaUniform(material.uniforms.l16, 15);
  updateLejaUniform(material.uniforms.l17, 16);
  updateLejaUniform(material.uniforms.l18, 17);
  updateLejaUniform(material.uniforms.l19, 18);
  updateLejaUniform(material.uniforms.l20, 19);
  updateLejaUniform(material.uniforms.l21, 20);
  updateLejaUniform(material.uniforms.l22, 21);
  updateLejaUniform(material.uniforms.l23, 22);
  updateLejaUniform(material.uniforms.l24, 23);
  updateLejaUniform(material.uniforms.l25, 24);
  updateLejaUniform(material.uniforms.l26, 25);
  updateLejaUniform(material.uniforms.l27, 26);
  updateLejaUniform(material.uniforms.l28, 27);
  updateLejaUniform(material.uniforms.l29, 28);
  updateLejaUniform(material.uniforms.l30, 29);
  updateLejaUniform(material.uniforms.l31, 30);
  updateLejaUniform(material.uniforms.l32, 31);
  updateLejaUniform(material.uniforms.l33, 32);
  updateLejaUniform(material.uniforms.l34, 33);
  updateLejaUniform(material.uniforms.l35, 34);
  updateLejaUniform(material.uniforms.l36, 35);
  updateLejaUniform(material.uniforms.l37, 36);
  updateLejaUniform(material.uniforms.l38, 37);
  updateLejaUniform(material.uniforms.l39, 38);
  updateLejaUniform(material.uniforms.l40, 39);
  updateLejaUniform(material.uniforms.l41, 40);
  updateLejaUniform(material.uniforms.l42, 41);
  updateLejaUniform(material.uniforms.l43, 42);
  updateLejaUniform(material.uniforms.l44, 43);
  updateLejaUniform(material.uniforms.l45, 44);
  updateLejaUniform(material.uniforms.l46, 45);
  updateLejaUniform(material.uniforms.l47, 46);
  updateLejaUniform(material.uniforms.l48, 47);
  updateLejaUniform(material.uniforms.l49, 48);
  updateLejaUniform(material.uniforms.l50, 49);
  updateLejaUniform(material.uniforms.l51, 50);
  updateLejaUniform(material.uniforms.l52, 51);
  updateLejaUniform(material.uniforms.l53, 52);
  updateLejaUniform(material.uniforms.l54, 53);
  updateLejaUniform(material.uniforms.l55, 54);
  updateLejaUniform(material.uniforms.l56, 55);
  updateLejaUniform(material.uniforms.l57, 56);
  updateLejaUniform(material.uniforms.l58, 57);
  updateLejaUniform(material.uniforms.l59, 58);
  updateLejaUniform(material.uniforms.l60, 59);
  updateLejaUniform(material.uniforms.l61, 60);
  updateLejaUniform(material.uniforms.l62, 61);
  updateLejaUniform(material.uniforms.l63, 62);
  updateLejaUniform(material.uniforms.l64, 63);
};

const updateStackUniforms = (lejaStack, A_nStack) => {
  for (let key in lejaStack) {
    updateUniforms(
      panels[key],
      A_nStack[key],
      lejaStack[key].length,
      lejaStack[key]
    );
  }
};

const getRenderDimensions = () => {
  let { width, height } = document.getElementById("source");
  const innerWidth = window.innerWidth;
  const innerHeight = window.innerHeight;

  const maxHeightPercent = 0.85;

  // try horiz
  let hw = Math.max(0, innerWidth - width - 128);
  let hh = Math.max(0, innerHeight * maxHeightPercent - 64);
  let horizTileScaleFactor = Math.min(hw / width, hh / height);
  let horizTileArea = hw * hh * horizTileScaleFactor;
  // vertical
  let vw = Math.max(0, innerWidth - 64);
  let vh = Math.max(0, innerHeight * maxHeightPercent - height - 128);
  let vertiTileScaleFactor = Math.min(vw / width, vh / height);
  let vertiTileArea = vw * vh * vertiTileScaleFactor;

  if (horizTileArea > vertiTileArea) {
    width *= horizTileScaleFactor;
    height *= horizTileScaleFactor;
  } else {
    width *= vertiTileScaleFactor;
    height *= vertiTileScaleFactor;
  }
  width = Math.floor(width);
  height = Math.floor(height);
  return [width, height];
};

export const resizeRenderer = () => {
  if (renderer == null) {
    return;
  }
  const [width, height] = getRenderDimensions();
  renderer.setSize(width, height);
};

export const toggleSourceDisplay = () => {
  let sourceCanvas = document.getElementById("source");
  sourceCanvas.classList.toggle("hidden");
  resizeRenderer();
};

const setupRenderer = () => {
  renderer = new THREE.WebGLRenderer({
    alpha: true,
    depth: false,
  });

  const rendererContainer = document.getElementById("fractal-container");
  renderer.domElement.setAttribute("id", "fractal");
  renderer.domElement.classList.add("flex-box");
  resizeRenderer();
  rendererContainer.appendChild(renderer.domElement);
  window.onresize = resizeRenderer;

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  camera.position.z = 3;

  const clickZone = document.getElementById("fractal");
  clickZone.addEventListener("mouseover", () => {
    timeDelta = 0.01;
    if (time <= 0.0) {
      time = Math.max(time, 0.0);
      animate();
    }
  });
  clickZone.addEventListener("mouseout", () => {
    timeDelta = -0.02;
  });
};

export const clearPanels = () => {
  panels.clear();
};

const setupControls = () => {
  const clickZone = document.getElementById("fractal");
  clickZone.addEventListener("mousedown", (ev) => {
    dragging = true;
    lastMouseX = ev.clientX;
    lastMouseY = ev.clientY;
  });

  clickZone.addEventListener("mouseup", () => {
    dragging = false;
  });

  clickZone.addEventListener("mousemove", (ev) => {
    if (dragging) {
      mouseX = ev.clientX;
      mouseY = ev.clientY;
      let deltaX = mouseX - lastMouseX;
      let deltaY = mouseY - lastMouseY;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
      PARAMS.focus.x += (0.005 * deltaX) / PARAMS.scale;
      PARAMS.focus.y += (0.005 * deltaY) / PARAMS.scale;
      updateControlUniforms();
      if (!PARAMS.playing) animate();
    }
  });
};

export const clearScene = () => {
  panels = {};
  scene.clear();
};

export const setupGL = (lejaStack, A_nStack, centers, colors, setSizes) => {
  if (panels.length > 0) {
    updateStackUniforms(lejaStack, A_nStack);
    return;
  }

  if (renderer == null) {
    setupRenderer();
    setupControls();
  } else {
    resizeRenderer();
  }

  let maxSetSize = 0;
  for (let key in setSizes) {
    if (setSizes[key] > maxSetSize) {
      maxSetSize = setSizes[key];
    }
  }

  clearScene();

  const geometry = new THREE.PlaneBufferGeometry(2, 2);
  for (let key in lejaStack) {
    let lejaPoints = lejaStack[key];
    let A_n = A_nStack[key];
    let center = centers[key];
    let setSize = setSizes[key];
    let color = colors[key];

    geometry.translate(0, 0, -0.1 * (setSize / maxSetSize));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        an: { value: A_n },
        nl: { value: lejaPoints.length },
        time: { value: time },
        maxIterations: { value: 8 },
        scale: { value: 1.0 },
        color: { value: new THREE.Vector3(color[0], color[1], color[2]) },
        origin: { value: new THREE.Vector2(center.re, center.im) },
        focus: { value: new THREE.Vector2(PARAMS.focus.x, PARAMS.focus.y) },
        l1: { value: new THREE.Vector2() },
        l2: { value: new THREE.Vector2() },
        l3: { value: new THREE.Vector2() },
        l4: { value: new THREE.Vector2() },
        l5: { value: new THREE.Vector2() },
        l6: { value: new THREE.Vector2() },
        l7: { value: new THREE.Vector2() },
        l8: { value: new THREE.Vector2() },
        l9: { value: new THREE.Vector2() },
        l10: { value: new THREE.Vector2() },
        l11: { value: new THREE.Vector2() },
        l12: { value: new THREE.Vector2() },
        l13: { value: new THREE.Vector2() },
        l14: { value: new THREE.Vector2() },
        l15: { value: new THREE.Vector2() },
        l16: { value: new THREE.Vector2() },
        l17: { value: new THREE.Vector2() },
        l18: { value: new THREE.Vector2() },
        l19: { value: new THREE.Vector2() },
        l20: { value: new THREE.Vector2() },
        l21: { value: new THREE.Vector2() },
        l22: { value: new THREE.Vector2() },
        l23: { value: new THREE.Vector2() },
        l24: { value: new THREE.Vector2() },
        l25: { value: new THREE.Vector2() },
        l26: { value: new THREE.Vector2() },
        l27: { value: new THREE.Vector2() },
        l28: { value: new THREE.Vector2() },
        l29: { value: new THREE.Vector2() },
        l30: { value: new THREE.Vector2() },
        l31: { value: new THREE.Vector2() },
        l32: { value: new THREE.Vector2() },
        l33: { value: new THREE.Vector2() },
        l34: { value: new THREE.Vector2() },
        l35: { value: new THREE.Vector2() },
        l36: { value: new THREE.Vector2() },
        l37: { value: new THREE.Vector2() },
        l38: { value: new THREE.Vector2() },
        l39: { value: new THREE.Vector2() },
        l40: { value: new THREE.Vector2() },
        l41: { value: new THREE.Vector2() },
        l42: { value: new THREE.Vector2() },
        l43: { value: new THREE.Vector2() },
        l44: { value: new THREE.Vector2() },
        l45: { value: new THREE.Vector2() },
        l46: { value: new THREE.Vector2() },
        l47: { value: new THREE.Vector2() },
        l48: { value: new THREE.Vector2() },
        l49: { value: new THREE.Vector2() },
        l50: { value: new THREE.Vector2() },
        l51: { value: new THREE.Vector2() },
        l52: { value: new THREE.Vector2() },
        l53: { value: new THREE.Vector2() },
        l54: { value: new THREE.Vector2() },
        l55: { value: new THREE.Vector2() },
        l56: { value: new THREE.Vector2() },
        l57: { value: new THREE.Vector2() },
        l58: { value: new THREE.Vector2() },
        l59: { value: new THREE.Vector2() },
        l60: { value: new THREE.Vector2() },
        l61: { value: new THREE.Vector2() },
        l62: { value: new THREE.Vector2() },
        l63: { value: new THREE.Vector2() },
        l64: { value: new THREE.Vector2() },
      },
      vertexShader: vertexShader(),
      fragmentShader: fragmentShader(),
      depthTest: false,
      depthWrite: false,
      transparent: true,
    });

    const panel = new THREE.Mesh(geometry, material);
    scene.add(panel);
    panels[key] = panel;
    updateUniforms(key, A_n, lejaPoints.length, lejaPoints);
  }
  animate();
};

export const animate = () => {
  if (renderer == null) return;
  if (PARAMS.playing && time >= 0) {
    time += timeDelta;
    time = Math.max(0.0, time);
    for (let key in panels) {
      panels[key].material.uniforms.time.value = time;
    }
    requestAnimationFrame(animate);
  }
  renderer.render(scene, camera);
};
