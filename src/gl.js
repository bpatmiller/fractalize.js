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
    uniform float scale;
    uniform vec2 origin;

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
        vec2 z = (vec2(-vUv.y, vUv.x) + origin.yx) / scale;
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
        float h = 0.75;
        float s = 0.65;
        float v = float(iterations)/float(maxIterations);
        gl_FragColor = vec4(hsv2rgb(vec3(h,s,v)), v);
    }
`;
}

export const updateControlUniforms = () => {
  if (material == null) return;
  material.uniforms.maxIterations.value = PARAMS.maxIterations;
  material.uniforms.scale.value = PARAMS.scale;
  material.uniforms.origin.value.x = PARAMS.origin.x;
  material.uniforms.origin.value.y = PARAMS.origin.y;
  console.log("updated iterations");
};

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

export const setupGL = (lejaStack, A_nStack) => {
  // declare leja points, a_n as uniforms
  // keep 256 possible leja points, or 8 * 32

  // prepare to pass the uniforms
  const lejaPoints = lejaStack[Object.keys(lejaStack)[0]];
  const A_n = A_nStack[Object.keys(A_nStack)[0]];
  console.log(Object.keys(A_nStack));
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
      scale: { value: 1.0 },
      origin: { value: new THREE.Vector2() },
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
