import { Complex } from "../_snowpack/pkg/complexjs.js";
import * as THREE from "../_snowpack/pkg/three.js";
import { PARAMS } from "./config.js";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

// panels is a jank global object of shaders on panels
// similarly, targets is a bunch of render textures which will later be composed
let renderer, camera;
let panels = {};
let targets = {};
let scenes = {};
let displayScene;
let displayPanel;
let scene;
let controls;

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
    
    varying vec3 vUv;

    // from https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl

    // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.
    uint hash( uint x ) {
        x += ( x << 10u );
        x ^= ( x >>  6u );
        x += ( x <<  3u );
        x ^= ( x >> 11u );
        x += ( x << 15u );
        return x;
    }

    // Construct a float with half-open range [0:1] using low 23 bits.
    // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.
    float floatConstruct( uint m ) {
        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask
        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32

        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)
        m |= ieeeOne;                          // Add fractional part to 1.0

        float  f = uintBitsToFloat( m );       // Range [1:2]
        return f - 1.0;                        // Range [0:1]
    }

    // Pseudo-random value in half-open range [0:1].
    float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }

    vec2 lejaStep(vec2 z, vec2 p, vec2 l, int n) {
        if (n > nl) return p;
        vec2 r = vec2(z.x-l.x, z.y-l.y);
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
        vec2 z = (vec2(vUv.x, -vUv.y) - origin) / (scale + 0.05 * sin(0.35 * time));
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
        // float h =  0.5 * sin(time * 0.01) + random(an + l1.y);//random(l2.y + l2.x);
        // float s = 0.65;
        float v = float(iterations)/float(maxIterations);
        float a = v - 0.2;
        if (a < 0.1) {
          discard;
        }
        gl_FragColor = vec4(color, a);
    }
`;
}

export const updateControlUniforms = () => {
  if (panels.length == 0) return;
  for (let key in panels) {
    let material = panels[key].material;
    material.uniforms.maxIterations.value = PARAMS.maxIterations;
    material.uniforms.scale.value = PARAMS.scale;
    // material.uniforms.origin.value.x = PARAMS.origin.x;
    // material.uniforms.origin.value.y = PARAMS.origin.y;
  }
};

const updateUniforms = (panelIndex, an, nl, lejaPoints) => {
  let material = panels[panelIndex].material;

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
  const sourceContainer = document.getElementById("resized");
  const renderWidth = sourceContainer.width;
  const renderHeight = sourceContainer.height;
  return [renderWidth, renderHeight];
};

// const setupDisplayScene = () => {
//   displayScene = new THREE.Scene();
//   const geometry = new THREE.PlaneBufferGeometry(2, 2);
//   const material = new THREE.MeshBasicMaterial
//   displayPanel = new THREE.Mesh(geometry, material);

// }

const setupRenderer = () => {
  const [renderWidth, renderHeight] = getRenderDimensions();

  renderer = new THREE.WebGLRenderer({
    alpha: true,
    depth: false,
  });
  const rendererContainer = document.getElementById("fractal");
  renderer.setSize(renderWidth, renderHeight);
  rendererContainer.appendChild(renderer.domElement);

  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

  // controls = new OrbitControls(camera, renderer.domElement);

  camera.position.z = 3;
};

export const clearPanels = () => {
  panels.clear();
};

export const setupGL = (
  lejaStack,
  A_nStack,
  centers,
  colors,
  setSizes,
  fpsGraph
) => {
  if (panels.length > 0) {
    updateStackUniforms(lejaStack, A_nStack);
    return;
  }

  if (renderer == null) {
    setupRenderer();
  } else {
    const [renderWidth, renderHeight] = getRenderDimensions();
    renderer.setSize(renderWidth, renderHeight);
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
        maxIterations: { value: 64 },
        scale: { value: 1.0 },
        color: { value: new THREE.Vector3(color[0], color[1], color[2]) },
        origin: { value: new THREE.Vector2(center.re, center.im) },
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

  function animate() {
    fpsGraph.begin();
    requestAnimationFrame(animate);
    // for (let key in panels) {
    //   renderer.setRenderTarget(targets[key]);
    //   renderer.render(scenes[key], camera);
    // }
    // renderer.setRenderTarget(null);
    // renderer.render(displayScene, camera);
    for (let key in panels) {
      panels[key].material.uniforms.time.value += 0.01;
    }
    // controls.update();
    renderer.render(scene, camera);
    fpsGraph.end();
  }
  animate();
};
