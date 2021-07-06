import { Complex } from "complex.js";
import * as THREE from "three";
import { PARAMS } from "./config";

let scene, camera, renderer, material;

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

    varying vec3 vUv;

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

        float scale = exp(0.5) / an;
        return vec2(p.x*z.x - p.y*z.y, p.x*z.y + p.y*z.x) * scale;
        
    }

    void main() {
        vec2 z = vec2(-vUv.y, vUv.x);
        int iterations = 0;
        for (;iterations < maxIterations; iterations++) {
            if (length(z) > 2.0) {
                break;
            }
            z = P(z);
        }
        gl_FragColor = vec4(vec3(float(iterations) / float(maxIterations)), 1.0);
    }
`;
}

const updateUniforms = (an, nl, lejaPoints) => {
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
};

export const setupGL = (lejaStack, A_nStack) => {
  // declare leja points, a_n as uniforms
  // keep 256 possible leja points, or 8 * 32

  // prepare to pass the uniforms
  const lejaPoints = lejaStack[Object.keys(lejaStack)[1]];
  const A_n = A_nStack[Object.keys(A_nStack)[1]];
  const numLejaPoints = lejaPoints.length;

  if (renderer != null) {
    updateUniforms(A_n, numLejaPoints, lejaPoints);
    return;
  }
  scene = new THREE.Scene();
  camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

  const sourceContainer = document.getElementById("resized");
  const renderWidth = sourceContainer.width;
  const renderHeight = sourceContainer.height;

  renderer = new THREE.WebGLRenderer();
  const rendererContainer = document.getElementById("fractal");
  renderer.setSize(renderWidth, renderHeight);
  rendererContainer.appendChild(renderer.domElement);
  console.log("appending renderer");

  const geometry = new THREE.PlaneBufferGeometry(2, 2);
  material = new THREE.ShaderMaterial({
    uniforms: {
      // for now we will just manually have 16 allocations for leja points
      an: { value: A_n },
      nl: { value: numLejaPoints },
      time: { value: 0.0 },
      maxIterations: { value: 64 },
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
    },
    vertexShader: vertexShader(),
    fragmentShader: fragmentShader(),
  });

  updateUniforms(A_n, numLejaPoints, lejaPoints);
  console.log("updated uniforms");
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    material.uniforms.time.value += 0.01;
    renderer.render(scene, camera);
  }
  animate();
};
