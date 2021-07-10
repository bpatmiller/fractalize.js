import { Complex } from "../_snowpack/pkg/complexjs.js";
import * as THREE from "../_snowpack/pkg/three.js";
import { PARAMS } from "./config.js";

// panels is a jank global object of shaders on panels
// similarly, targets is a bunch of render textures which will later be composed
let renderer, camera;
let panels = {};
let scene;
let time = 0;
let timeDelta = -0.02;
let dragging = false;
let mouseX = 0,
  mouseY = 0,
  lastMouseX = 0,
  lastMouseY = 0;

function vertexShader() {
  return `
    varying vec3 vUv;
    
    void main() {
        vUv = position;

        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * modelViewPosition;    }
    `;
}

function fragmentShader() {
  return `
    uniform float an;
    uniform int nl;
    uniform float time;
    uniform int maxIterations;
    uniform float scale;
    uniform vec2 origin;
    uniform vec2 focus;
    uniform vec3 color;

    uniform vec2 l1;
    uniform vec2 l2;
    uniform vec2 l3;
    uniform vec2 l4;
    uniform vec2 l5;
    uniform vec2 l6;
    uniform vec2 l7;
    uniform vec2 l8;
    uniform vec2 l9;
    uniform vec2 l10;
    uniform vec2 l11;
    uniform vec2 l12;
    uniform vec2 l13;
    uniform vec2 l14;
    uniform vec2 l15;
    uniform vec2 l16;
    uniform vec2 l17;
    uniform vec2 l18;
    uniform vec2 l19;
    uniform vec2 l20;
    uniform vec2 l21;
    uniform vec2 l22;
    uniform vec2 l23;
    uniform vec2 l24;
    uniform vec2 l25;
    uniform vec2 l26;
    uniform vec2 l27;
    uniform vec2 l28;
    uniform vec2 l29;
    uniform vec2 l30;
    uniform vec2 l31;
    uniform vec2 l32; 
    uniform vec2 l33;
    uniform vec2 l34;
    uniform vec2 l35;
    uniform vec2 l36;
    uniform vec2 l37;
    uniform vec2 l38;
    uniform vec2 l39;
    uniform vec2 l40;
    uniform vec2 l41;
    uniform vec2 l42;
    uniform vec2 l43;
    uniform vec2 l44;
    uniform vec2 l45;
    uniform vec2 l46;
    uniform vec2 l47;
    uniform vec2 l48;
    uniform vec2 l49;
    uniform vec2 l50;
    uniform vec2 l51;
    uniform vec2 l52;
    uniform vec2 l53;
    uniform vec2 l54;
    uniform vec2 l55;
    uniform vec2 l56;
    uniform vec2 l57;
    uniform vec2 l58;
    uniform vec2 l59;
    uniform vec2 l60;
    uniform vec2 l61;
    uniform vec2 l62;
    uniform vec2 l63;
    uniform vec2 l64;

    varying vec3 vUv;

    vec2 lejaStep(vec2 z, vec2 p, vec2 l, int n) {
        if (n > nl) return p;
        vec2 r = vec2(z.x-l.x, z.y-l.y) * (1.0+0.07*sin(time*0.13));
        vec2 p2 = vec2(p.x * r.x - p.y * r.y, p.x * r.y + p.y * r.x);
        return p2;
    }

    vec2 P(vec2 z) {
        vec2 p = vec2(z.x - l1.x,z.y - l1.y);
        
        p = lejaStep(z,p,l2,2);
        p = lejaStep(z,p,l3,3);
        p = lejaStep(z,p,l4,4);
        p = lejaStep(z,p,l5,5);
        p = lejaStep(z,p,l6,6);
        p = lejaStep(z,p,l7,7);
        p = lejaStep(z,p,l8,8);
        p = lejaStep(z,p,l9,9);
        p = lejaStep(z,p,l10,10);
        p = lejaStep(z,p,l11,11);
        p = lejaStep(z,p,l12,12);
        p = lejaStep(z,p,l13,13);
        p = lejaStep(z,p,l14,14);
        p = lejaStep(z,p,l15,15);
        p = lejaStep(z,p,l16,16);
        p = lejaStep(z,p,l17,17);
        p = lejaStep(z,p,l18,18);
        p = lejaStep(z,p,l19,19);
        p = lejaStep(z,p,l20,20);
        p = lejaStep(z,p,l21,21);
        p = lejaStep(z,p,l22,22);
        p = lejaStep(z,p,l23,23);
        p = lejaStep(z,p,l24,24);
        p = lejaStep(z,p,l25,25);
        p = lejaStep(z,p,l26,26);
        p = lejaStep(z,p,l27,27);
        p = lejaStep(z,p,l28,28);
        p = lejaStep(z,p,l29,29);
        p = lejaStep(z,p,l30,30);
        p = lejaStep(z,p,l31,31);
        p = lejaStep(z,p,l32,32); 
        p = lejaStep(z,p,l33,33);
        p = lejaStep(z,p,l34,34);
        p = lejaStep(z,p,l35,35);
        p = lejaStep(z,p,l36,36);
        p = lejaStep(z,p,l37,37);
        p = lejaStep(z,p,l38,38);
        p = lejaStep(z,p,l39,39);
        p = lejaStep(z,p,l40,40);
        p = lejaStep(z,p,l41,41);
        p = lejaStep(z,p,l42,42);
        p = lejaStep(z,p,l43,43);
        p = lejaStep(z,p,l44,44);
        p = lejaStep(z,p,l45,45);
        p = lejaStep(z,p,l46,46);
        p = lejaStep(z,p,l47,47);
        p = lejaStep(z,p,l48,48);
        p = lejaStep(z,p,l49,49);
        p = lejaStep(z,p,l50,50);
        p = lejaStep(z,p,l51,51);
        p = lejaStep(z,p,l52,52);
        p = lejaStep(z,p,l53,53);
        p = lejaStep(z,p,l54,54);
        p = lejaStep(z,p,l55,55);
        p = lejaStep(z,p,l56,56);
        p = lejaStep(z,p,l57,57);
        p = lejaStep(z,p,l58,58);
        p = lejaStep(z,p,l59,59);
        p = lejaStep(z,p,l60,60);
        p = lejaStep(z,p,l61,61);
        p = lejaStep(z,p,l62,62);
        p = lejaStep(z,p,l63,63);
        p = lejaStep(z,p,l64,64);

        float scale = exp(0.5) / an;
        return vec2(p.x*z.x - p.y*z.y, p.x*z.y + p.y*z.x) * scale;
        
    }

    vec3 hsv2rgb(vec3 c)
    {
        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
    }

    void main() {
        vec2 z = (vec2(vUv.x, -vUv.y) / (scale + 0.05 * sin(0.1 * time))) - origin - focus;
        float len = 0.0;
        int iterations = 0;
        for (;iterations < maxIterations; iterations++) {
            if (length(z) > 2.0) {
                break;
            }
            vec2 tmp = P(z);
            len += length(z - tmp);
            z = tmp;
        }
        float h =  sin(len * 0.5);
        float s = 0.65;
        float v = float(iterations)/float(maxIterations);
        vec3 rgb = hsv2rgb(vec3(h,s,v));
        //float a = v-0.2;
        float a = mix(0.5+0.5*cos(1.0/float(iterations)),v - 0.2,clamp(0.7 + 0.5*sin(0.729+time*.09),0.8,1.0));
        if (a < 0.1) {
          discard;
        }
        gl_FragColor = vec4(mix(rgb,color,0.5 + 0.75*sin(0.729+time*0.05)), a);
    }
`;
}

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

  time = 0;
  timeDelta = 0;
  material.uniforms.time.value = 0;

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
  const sourceCanvas = document.getElementById("source");
  let sourceW = 0;
  // sourceH = 0;
  if (sourceCanvas.classList.contains("hidden")) {
    sourceW = sourceCanvas.clientWidth;
    // sourceH = sourceCanvas.clientHeight;
  }

  const sourceContainer = document.getElementById("source");
  let renderWidth = Math.floor(sourceContainer.width);
  let renderHeight = Math.floor(sourceContainer.height);
  let xR = renderWidth / (window.innerWidth * 0.85 - sourceW);
  let yR = renderHeight / (window.innerHeight * 0.85);
  let expandRatio = Math.max(xR, yR);
  renderWidth /= expandRatio;
  renderHeight /= expandRatio;
  return [renderWidth, renderHeight];
};

// const setupDisplayScene = () => {
//   displayScene = new THREE.Scene();
//   const geometry = new THREE.PlaneBufferGeometry(2, 2);
//   const material = new THREE.MeshBasicMaterial
//   displayPanel = new THREE.Mesh(geometry, material);

// }

export const resizeRenderer = () => {
  if (renderer == null) {
    return;
  }
  const [renderWidth, renderHeight] = getRenderDimensions();
  renderer.setSize(renderWidth, renderHeight);
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
  // renderer.setClearColor(0x1e1e1e, 1);

  const rendererContainer = document.getElementById("fractal-container");
  renderer.domElement.setAttribute("id", "fractal");
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
      PARAMS.focus.x += (0.01 * deltaX) / PARAMS.scale;
      PARAMS.focus.y += (0.01 * deltaY) / PARAMS.scale;
      updateControlUniforms();
      if (!PARAMS.playing) animate();
    }
  });
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

  // if (displayScene == null) {
  //   setupDisplayScene();
  // }
  scene = new THREE.Scene();

  for (let key in lejaStack) {
    let lejaPoints = lejaStack[key];
    let A_n = A_nStack[key];
    let center = centers[key];
    let setSize = setSizes[key];
    let color = colors[key];

    const geometry = new THREE.PlaneBufferGeometry(2, 2);
    geometry.translate(0, 0, -0.1 * (setSize / maxSetSize));
    const material = new THREE.ShaderMaterial({
      uniforms: {
        an: { value: A_n },
        nl: { value: lejaPoints.length },
        time: { value: 0.0 },
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
    // scenes[key] = scene;
    // const renderTarget = new THREE.WebGLRenderTarget(renderWidth, renderHeight);
    // targets[key] = renderTarget;
    // console.log("created render targets");
  }
  animate();
};

export const animate = () => {
  if (renderer == null) return;
  if (PARAMS.playing && time >= 0) {
    requestAnimationFrame(animate);
    for (let key in panels) {
      time += timeDelta;
      panels[key].material.uniforms.time.value += timeDelta;
    }
  }
  renderer.render(scene, camera);
};
