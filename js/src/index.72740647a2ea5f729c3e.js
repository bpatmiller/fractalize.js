/*! For license information please see index.72740647a2ea5f729c3e.js.LICENSE.txt */
(self.webpackChunkfractalize=self.webpackChunkfractalize||[]).push([[927],{3324:(e,n,t)=>{"use strict";t.d(n,{a:()=>i,c:()=>r});var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==t.g?t.g:"undefined"!=typeof self?self:{};function r(e,n,t){return e(t={path:n,exports:{},require:function(e,n){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==n&&t.path)}},t.exports),t.exports}},5124:(e,n,t)=>{"use strict";var i=t(6379),r=(0,t(3324).c)((function(e,n){!function(n){var t=function(e){return.5*(Math.exp(e)+Math.exp(-e))},i=function(e){return.5*(Math.exp(e)-Math.exp(-e))},r=function(){throw SyntaxError("Invalid Param")};function a(e,n){var t=Math.abs(e),i=Math.abs(n);return 0===e?Math.log(i):0===n?Math.log(t):t<3e3&&i<3e3?.5*Math.log(e*e+n*n):Math.log(e/Math.cos(Math.atan2(n,e)))}function s(e,n){if(!(this instanceof s))return new s(e,n);var t=function(e,n){var t={re:0,im:0};if(null==e)t.re=t.im=0;else if(void 0!==n)t.re=e,t.im=n;else switch(typeof e){case"object":if("im"in e&&"re"in e)t.re=e.re,t.im=e.im;else if("abs"in e&&"arg"in e){if(!Number.isFinite(e.abs)&&Number.isFinite(e.arg))return s.INFINITY;t.re=e.abs*Math.cos(e.arg),t.im=e.abs*Math.sin(e.arg)}else if("r"in e&&"phi"in e){if(!Number.isFinite(e.r)&&Number.isFinite(e.phi))return s.INFINITY;t.re=e.r*Math.cos(e.phi),t.im=e.r*Math.sin(e.phi)}else 2===e.length?(t.re=e[0],t.im=e[1]):r();break;case"string":t.im=t.re=0;var i=e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),a=1,o=0;null===i&&r();for(var l=0;l<i.length;l++){var u=i[l];" "===u||"\t"===u||"\n"===u||("+"===u?a++:"-"===u?o++:"i"===u||"I"===u?(a+o===0&&r()," "===i[l+1]||isNaN(i[l+1])?t.im+=parseFloat((o%2?"-":"")+"1"):(t.im+=parseFloat((o%2?"-":"")+i[l+1]),l++),a=o=0):((a+o===0||isNaN(u))&&r(),"i"===i[l+1]||"I"===i[l+1]?(t.im+=parseFloat((o%2?"-":"")+u),l++):t.re+=parseFloat((o%2?"-":"")+u),a=o=0))}a+o>0&&r();break;case"number":t.im=0,t.re=e;break;default:r()}return t}(e,n);this.re=t.re,this.im=t.im}s.prototype={re:0,im:0,sign:function(){var e=this.abs();return new s(this.re/e,this.im/e)},add:function(e,n){var t=new s(e,n);return this.isInfinite()&&t.isInfinite()?s.NAN:this.isInfinite()||t.isInfinite()?s.INFINITY:new s(this.re+t.re,this.im+t.im)},sub:function(e,n){var t=new s(e,n);return this.isInfinite()&&t.isInfinite()?s.NAN:this.isInfinite()||t.isInfinite()?s.INFINITY:new s(this.re-t.re,this.im-t.im)},mul:function(e,n){var t=new s(e,n);return this.isInfinite()&&t.isZero()||this.isZero()&&t.isInfinite()?s.NAN:this.isInfinite()||t.isInfinite()?s.INFINITY:0===t.im&&0===this.im?new s(this.re*t.re,0):new s(this.re*t.re-this.im*t.im,this.re*t.im+this.im*t.re)},div:function(e,n){var t=new s(e,n);if(this.isZero()&&t.isZero()||this.isInfinite()&&t.isInfinite())return s.NAN;if(this.isInfinite()||t.isZero())return s.INFINITY;if(this.isZero()||t.isInfinite())return s.ZERO;e=this.re,n=this.im;var i,r,a=t.re,o=t.im;return 0===o?new s(e/a,n/a):Math.abs(a)<Math.abs(o)?new s((e*(r=a/o)+n)/(i=a*r+o),(n*r-e)/i):new s((e+n*(r=o/a))/(i=o*r+a),(n-e*r)/i)},pow:function(e,n){var t=new s(e,n);if(e=this.re,n=this.im,t.isZero())return s.ONE;if(0===t.im){if(0===n&&e>0)return new s(Math.pow(e,t.re),0);if(0===e)switch((t.re%4+4)%4){case 0:return new s(Math.pow(n,t.re),0);case 1:return new s(0,Math.pow(n,t.re));case 2:return new s(-Math.pow(n,t.re),0);case 3:return new s(0,-Math.pow(n,t.re))}}if(0===e&&0===n&&t.re>0&&t.im>=0)return s.ZERO;var i=Math.atan2(n,e),r=a(e,n);return e=Math.exp(t.re*r-t.im*i),n=t.im*r+t.re*i,new s(e*Math.cos(n),e*Math.sin(n))},sqrt:function(){var e,n,t=this.re,i=this.im,r=this.abs();if(t>=0){if(0===i)return new s(Math.sqrt(t),0);e=.5*Math.sqrt(2*(r+t))}else e=Math.abs(i)/Math.sqrt(2*(r-t));return n=t<=0?.5*Math.sqrt(2*(r-t)):Math.abs(i)/Math.sqrt(2*(r+t)),new s(e,i<0?-n:n)},exp:function(){var e=Math.exp(this.re);return this.im,new s(e*Math.cos(this.im),e*Math.sin(this.im))},expm1:function(){var e=this.re,n=this.im;return new s(Math.expm1(e)*Math.cos(n)+function(e){var n=Math.PI/4;if(-n>e||e>n)return Math.cos(e)-1;var t=e*e;return t*(t*(t*(t*(t*(t*(t*(t/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-.5)}(n),Math.exp(e)*Math.sin(n))},log:function(){var e=this.re,n=this.im;return new s(a(e,n),Math.atan2(n,e))},abs:function(){return e=this.re,n=this.im,t=Math.abs(e),i=Math.abs(n),t<3e3&&i<3e3?Math.sqrt(t*t+i*i):(t<i?(t=i,i=e/n):i=n/e,t*Math.sqrt(1+i*i));var e,n,t,i},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var e=this.re,n=this.im;return new s(Math.sin(e)*t(n),Math.cos(e)*i(n))},cos:function(){var e=this.re,n=this.im;return new s(Math.cos(e)*t(n),-Math.sin(e)*i(n))},tan:function(){var e=2*this.re,n=2*this.im,r=Math.cos(e)+t(n);return new s(Math.sin(e)/r,i(n)/r)},cot:function(){var e=2*this.re,n=2*this.im,r=Math.cos(e)-t(n);return new s(-Math.sin(e)/r,i(n)/r)},sec:function(){var e=this.re,n=this.im,r=.5*t(2*n)+.5*Math.cos(2*e);return new s(Math.cos(e)*t(n)/r,Math.sin(e)*i(n)/r)},csc:function(){var e=this.re,n=this.im,r=.5*t(2*n)-.5*Math.cos(2*e);return new s(Math.sin(e)*t(n)/r,-Math.cos(e)*i(n)/r)},asin:function(){var e=this.re,n=this.im,t=new s(n*n-e*e+1,-2*e*n).sqrt(),i=new s(t.re-n,t.im+e).log();return new s(i.im,-i.re)},acos:function(){var e=this.re,n=this.im,t=new s(n*n-e*e+1,-2*e*n).sqrt(),i=new s(t.re-n,t.im+e).log();return new s(Math.PI/2-i.im,i.re)},atan:function(){var e=this.re,n=this.im;if(0===e){if(1===n)return new s(0,1/0);if(-1===n)return new s(0,-1/0)}var t=e*e+(1-n)*(1-n),i=new s((1-n*n-e*e)/t,-2*e/t).log();return new s(-.5*i.im,.5*i.re)},acot:function(){var e=this.re,n=this.im;if(0===n)return new s(Math.atan2(1,e),0);var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).atan():new s(0!==e?e/0:0,0!==n?-n/0:0).atan()},asec:function(){var e=this.re,n=this.im;if(0===e&&0===n)return new s(0,1/0);var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).acos():new s(0!==e?e/0:0,0!==n?-n/0:0).acos()},acsc:function(){var e=this.re,n=this.im;if(0===e&&0===n)return new s(Math.PI/2,1/0);var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).asin():new s(0!==e?e/0:0,0!==n?-n/0:0).asin()},sinh:function(){var e=this.re,n=this.im;return new s(i(e)*Math.cos(n),t(e)*Math.sin(n))},cosh:function(){var e=this.re,n=this.im;return new s(t(e)*Math.cos(n),i(e)*Math.sin(n))},tanh:function(){var e=2*this.re,n=2*this.im,r=t(e)+Math.cos(n);return new s(i(e)/r,Math.sin(n)/r)},coth:function(){var e=2*this.re,n=2*this.im,r=t(e)-Math.cos(n);return new s(i(e)/r,-Math.sin(n)/r)},csch:function(){var e=this.re,n=this.im,r=Math.cos(2*n)-t(2*e);return new s(-2*i(e)*Math.cos(n)/r,2*t(e)*Math.sin(n)/r)},sech:function(){var e=this.re,n=this.im,r=Math.cos(2*n)+t(2*e);return new s(2*t(e)*Math.cos(n)/r,-2*i(e)*Math.sin(n)/r)},asinh:function(){var e=this.im;this.im=-this.re,this.re=e;var n=this.asin();return this.re=-this.im,this.im=e,e=n.re,n.re=-n.im,n.im=e,n},acosh:function(){var e=this.acos();if(e.im<=0){var n=e.re;e.re=-e.im,e.im=n}else n=e.im,e.im=-e.re,e.re=n;return e},atanh:function(){var e=this.re,n=this.im,t=e>1&&0===n,i=1-e,r=1+e,o=i*i+n*n,l=0!==o?new s((r*i-n*n)/o,(n*i+r*n)/o):new s(-1!==e?e/0:0,0!==n?n/0:0),u=l.re;return l.re=a(l.re,l.im)/2,l.im=Math.atan2(l.im,u)/2,t&&(l.im=-l.im),l},acoth:function(){var e=this.re,n=this.im;if(0===e&&0===n)return new s(0,Math.PI/2);var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).atanh():new s(0!==e?e/0:0,0!==n?-n/0:0).atanh()},acsch:function(){var e=this.re,n=this.im;if(0===n)return new s(0!==e?Math.log(e+Math.sqrt(e*e+1)):1/0,0);var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).asinh():new s(0!==e?e/0:0,0!==n?-n/0:0).asinh()},asech:function(){var e=this.re,n=this.im;if(this.isZero())return s.INFINITY;var t=e*e+n*n;return 0!==t?new s(e/t,-n/t).acosh():new s(0!==e?e/0:0,0!==n?-n/0:0).acosh()},inverse:function(){if(this.isZero())return s.INFINITY;if(this.isInfinite())return s.ZERO;var e=this.re,n=this.im,t=e*e+n*n;return new s(e/t,-n/t)},conjugate:function(){return new s(this.re,-this.im)},neg:function(){return new s(-this.re,-this.im)},ceil:function(e){return e=Math.pow(10,e||0),new s(Math.ceil(this.re*e)/e,Math.ceil(this.im*e)/e)},floor:function(e){return e=Math.pow(10,e||0),new s(Math.floor(this.re*e)/e,Math.floor(this.im*e)/e)},round:function(e){return e=Math.pow(10,e||0),new s(Math.round(this.re*e)/e,Math.round(this.im*e)/e)},equals:function(e,n){var t=new s(e,n);return Math.abs(t.re-this.re)<=s.EPSILON&&Math.abs(t.im-this.im)<=s.EPSILON},clone:function(){return new s(this.re,this.im)},toString:function(){var e=this.re,n=this.im,t="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(e)<s.EPSILON&&(e=0),Math.abs(n)<s.EPSILON&&(n=0),0===n?t+e:(0!==e?(t+=e,t+=" ",n<0?(n=-n,t+="-"):t+="+",t+=" "):n<0&&(n=-n,t+="-"),1!==n&&(t+=n),t+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return 0===this.im&&0===this.re},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!(this.isNaN()||this.isFinite())}},s.ZERO=new s(0,0),s.ONE=new s(1,0),s.I=new s(0,1),s.PI=new s(Math.PI,0),s.E=new s(Math.E,0),s.INFINITY=new s(1/0,1/0),s.NAN=new s(NaN,NaN),s.EPSILON=1e-15,Object.defineProperty(s,"__esModule",{value:!0}),s.default=s,s.Complex=s,e.exports=s}()})).Complex,a=t(7715),s=t(9935);let o,l,u,h;const f=()=>{null!=h&&(h.uniforms.maxIterations.value=v.maxIterations,h.uniforms.scale.value=v.scale,h.uniforms.origin.value.x=v.origin.x,h.uniforms.origin.value.y=v.origin.y,console.log("updated iterations"))},m=(e,n,t)=>{function i(e,i){i<n&&(e.value.x=t[i].re,e.value.y=t[i].im)}h.uniforms.an.value=e,h.uniforms.nl.value=n,h.uniforms.maxIterations.value=v.maxIterations,i(h.uniforms.l1,0),i(h.uniforms.l2,1),i(h.uniforms.l3,2),i(h.uniforms.l4,3),i(h.uniforms.l5,4),i(h.uniforms.l6,5),i(h.uniforms.l7,6),i(h.uniforms.l8,7),i(h.uniforms.l9,8),i(h.uniforms.l10,9),i(h.uniforms.l11,10),i(h.uniforms.l12,11),i(h.uniforms.l13,14),i(h.uniforms.l14,13),i(h.uniforms.l15,14),i(h.uniforms.l16,15),i(h.uniforms.l17,16),i(h.uniforms.l18,17),i(h.uniforms.l19,18),i(h.uniforms.l20,19),i(h.uniforms.l21,20),i(h.uniforms.l22,21),i(h.uniforms.l23,22),i(h.uniforms.l24,23),i(h.uniforms.l25,24),i(h.uniforms.l26,25),i(h.uniforms.l27,26),i(h.uniforms.l28,27),i(h.uniforms.l29,28),i(h.uniforms.l30,29),i(h.uniforms.l31,30),i(h.uniforms.l32,31)},c=(e,n)=>{const t=e[Object.keys(e)[0]],i=n[Object.keys(n)[0]];console.log(Object.keys(n));const r=t.length;if(null!=u)return void m(i,r,t);o=new s.xsS,l=new s.iKG(-1,1,1,-1,.1,10);const a=document.getElementById("resized"),f=a.width,c=a.height;u=new s.CP7;const v=document.getElementById("fractal");u.setSize(f,c),v.appendChild(u.domElement),console.log("appending renderer");const p=new s.BKK(2,2);h=new s.jyz({uniforms:{an:{value:i},nl:{value:r},time:{value:0},maxIterations:{value:64},scale:{value:1},origin:{value:new s.FM8},l1:{value:new s.FM8},l2:{value:new s.FM8},l3:{value:new s.FM8},l4:{value:new s.FM8},l5:{value:new s.FM8},l6:{value:new s.FM8},l7:{value:new s.FM8},l8:{value:new s.FM8},l9:{value:new s.FM8},l10:{value:new s.FM8},l11:{value:new s.FM8},l12:{value:new s.FM8},l13:{value:new s.FM8},l14:{value:new s.FM8},l15:{value:new s.FM8},l16:{value:new s.FM8},l17:{value:new s.FM8},l18:{value:new s.FM8},l19:{value:new s.FM8},l20:{value:new s.FM8},l21:{value:new s.FM8},l22:{value:new s.FM8},l23:{value:new s.FM8},l24:{value:new s.FM8},l25:{value:new s.FM8},l26:{value:new s.FM8},l27:{value:new s.FM8},l28:{value:new s.FM8},l29:{value:new s.FM8},l30:{value:new s.FM8},l31:{value:new s.FM8},l32:{value:new s.FM8}},vertexShader:"\n    varying vec3 vUv;\n    \n    void main() {\n        vUv = position;\n\n        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * modelViewPosition;    }\n    ",fragmentShader:"\n    uniform float an;\n    uniform int nl;\n    uniform float time;\n    uniform int maxIterations;\n    uniform float scale;\n    uniform vec2 origin;\n\n    uniform vec2 l1;\n    uniform vec2 l2;\n    uniform vec2 l3;\n    uniform vec2 l4;\n    uniform vec2 l5;\n    uniform vec2 l6;\n    uniform vec2 l7;\n    uniform vec2 l8;\n    uniform vec2 l9;\n    uniform vec2 l10;\n    uniform vec2 l11;\n    uniform vec2 l12;\n    uniform vec2 l13;\n    uniform vec2 l14;\n    uniform vec2 l15;\n    uniform vec2 l16;\n    uniform vec2 l17;\n    uniform vec2 l18;\n    uniform vec2 l19;\n    uniform vec2 l20;\n    uniform vec2 l21;\n    uniform vec2 l22;\n    uniform vec2 l23;\n    uniform vec2 l24;\n    uniform vec2 l25;\n    uniform vec2 l26;\n    uniform vec2 l27;\n    uniform vec2 l28;\n    uniform vec2 l29;\n    uniform vec2 l30;\n    uniform vec2 l31;\n    uniform vec2 l32;\n    \n    varying vec3 vUv;\n\n    // from https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\n\n    // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.\n    uint hash( uint x ) {\n        x += ( x << 10u );\n        x ^= ( x >>  6u );\n        x += ( x <<  3u );\n        x ^= ( x >> 11u );\n        x += ( x << 15u );\n        return x;\n    }\n\n    // Construct a float with half-open range [0:1] using low 23 bits.\n    // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.\n    float floatConstruct( uint m ) {\n        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask\n        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32\n\n        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)\n        m |= ieeeOne;                          // Add fractional part to 1.0\n\n        float  f = uintBitsToFloat( m );       // Range [1:2]\n        return f - 1.0;                        // Range [0:1]\n    }\n\n    // Pseudo-random value in half-open range [0:1].\n    float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }\n\n    vec2 lejaStep(vec2 z, vec2 p, vec2 l, int n) {\n        if (n > nl) return p;\n        vec2 r = vec2(z.x-l.x, z.y-l.y);\n        vec2 p2 = vec2(p.x * r.x - p.y * r.y, p.x * r.y + p.y * r.x);\n        return p2;\n    }\n\n    vec2 P(vec2 z) {\n        vec2 p = vec2(z.x - l1.x,z.y - l1.y);\n        \n        p = lejaStep(z,p,l2,2);\n        p = lejaStep(z,p,l3,3);\n        p = lejaStep(z,p,l4,4);\n        p = lejaStep(z,p,l5,5);\n        p = lejaStep(z,p,l6,6);\n        p = lejaStep(z,p,l7,7);\n        p = lejaStep(z,p,l8,8);\n        p = lejaStep(z,p,l9,9);\n        p = lejaStep(z,p,l10,10);\n        p = lejaStep(z,p,l11,11);\n        p = lejaStep(z,p,l12,12);\n        p = lejaStep(z,p,l13,13);\n        p = lejaStep(z,p,l14,14);\n        p = lejaStep(z,p,l15,15);\n        p = lejaStep(z,p,l16,16);\n        p = lejaStep(z,p,l17,17);\n        p = lejaStep(z,p,l18,18);\n        p = lejaStep(z,p,l19,19);\n        p = lejaStep(z,p,l20,20);\n        p = lejaStep(z,p,l21,21);\n        p = lejaStep(z,p,l22,22);\n        p = lejaStep(z,p,l23,23);\n        p = lejaStep(z,p,l24,24);\n        p = lejaStep(z,p,l25,25);\n        p = lejaStep(z,p,l26,26);\n        p = lejaStep(z,p,l27,27);\n        p = lejaStep(z,p,l28,28);\n        p = lejaStep(z,p,l29,29);\n        p = lejaStep(z,p,l30,30);\n        p = lejaStep(z,p,l31,31);\n        p = lejaStep(z,p,l32,32);\n\n        float scale = exp(0.5) / an;\n        return vec2(p.x*z.x - p.y*z.y, p.x*z.y + p.y*z.x) * scale;\n        \n    }\n\n    vec3 hsv2rgb(vec3 c)\n    {\n        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n    }\n\n    void main() {\n        vec2 z = (vec2(-vUv.y, vUv.x) + origin.yx) / scale;\n        float len = 0.0;\n        int iterations = 0;\n        for (;iterations < maxIterations; iterations++) {\n            if (length(z) > 2.0) {\n                break;\n            }\n            vec2 tmp = P(z);\n            len += length(z - tmp);\n            z = tmp;\n        }\n        float h = 0.75;\n        float s = 0.65;\n        float v = float(iterations)/float(maxIterations);\n        gl_FragColor = vec4(hsv2rgb(vec3(h,s,v)), v);\n    }\n"}),m(i,r,t),console.log("updated uniforms");const w=new s.Kj0(p,h);o.add(w),l.position.z=5,function e(){requestAnimationFrame(e),h.uniforms.time.value+=.01,u.render(o,l)}()},v={outputSize:260,minClusterSize:.03,numColors:2,numValidSubsets:"",edgePoints:"",scale:1,origin:{x:0,y:0},numLejaPoints:32,maxIterations:64},p=(e,n,t)=>{if(0==e.length)return n[t].abs();var i=1;for(let r=0;r<e.length;r++)i*=n[t].sub(e[r]).abs();return i},w=e=>{let n=1;for(let t=0;t<e.length-1;t++)n*=e[e.length-1].sub(e[t]).abs();return n},M=e=>{let n=0,t=0;for(let i=0;i<e.length;i++){let r=e[i];n+=r.re,t+=r.im}return n/=e.length,t/=e.length,new r(n,t)},d=async e=>{const n=document.getElementById("resized"),t=n.getContext("2d"),a=URL.createObjectURL(e),s=await(o=a,new Promise((e=>{const n=document.getElementById("resized"),t=n.getContext("2d"),i=new Image;i.onload=()=>{let r=Math.max(i.width,i.height),a=Math.floor(i.width*(v.outputSize/r)),s=Math.floor(i.height*(v.outputSize/r));n.width=a,n.height=s,t.drawImage(i,0,0,i.width,i.height,0,0,a,s),e({width:a,height:s})},i.src=o})));var o;const l=document.getElementById("fractal");l.style.width=s.width,l.style.height=s.height;let u=new i.es("uint8",[s.width,s.height,4]);i.Ur(n,u);let h=u;h=i.Ig(h,v.numColors);const f=i.He(h),m=new i.z_;m.init(h),m.runOp(h,0,f),m.destroy();var c=new i.es("uint8",[s.width,s.height]);function d(e,n,t){return e<s.width&&e>=0&&n<s.height&&n>=0&&c.get(e,n)!=t}function g(e,n){var t=[e];let i,r,a=0;for(;t.length>0;)[i,r]=t.pop(),c.set(i,r,n),a++,d(i-1,r,n)&&f.get(i-1,r,0)==f.get(i,r,0)&&t.push([i-1,r]),d(i,r-1,n)&&f.get(i,r-1,0)==f.get(i,r,0)&&t.push([i,r-1]),d(i+1,r,n)&&f.get(i+1,r,0)==f.get(i,r,0)&&t.push([i+1,r]),d(i,r+1,n)&&f.get(i,r+1,0)==f.get(i,r,0)&&t.push([i,r+1]);return a}function x(e,n){for(let t=0;t<s.width;t++)for(let i=0;i<s.height;i++)c.get(t,i)==e&&c.set(t,i,n)}var I=0;for(let e=0;e<s.width;e++)for(let n=0;n<s.height;n++)0==c.get(e,n)&&g([e,n],255)>v.minClusterSize*v.outputSize*v.outputSize&&x(255,++I);v.numValidSubsets=I;var z=c.clone();for(let e=0;e<s.width;e++)for(let n=0;n<s.height;n++){let t=c.get(e,n);255!=t&&c.get(e-1,n)==t&&c.get(e+1,n)==t&&c.get(e,n-1)==t&&c.get(e,n+1)==t&&c.get(e-1,n-1)==t&&c.get(e+1,n-1)==t&&c.get(e-1,n+1)==t&&c.get(e+1,n+1)==t&&z.set(e,n,255)}t.fillStyle="rgba(255,255,255,0.85)",t.fillRect(0,0,s.width,s.height);for(let e=0;e<s.width;e++)for(let n=0;n<s.height;n++)if(255!=c.get(e,n)){let i=c.get(e,n),r=Math.floor(80*Math.sin(i))+100,a=Math.floor(80*Math.cos(i+.5))+100,s=240-a;t.fillStyle=`rgba(${r},${s},${a},0.5)`,t.fillRect(n,e,1,1)}for(let e=0;e<s.width;e++)for(let n=0;n<s.height;n++)if(255!=z.get(e,n)){let i=c.get(e,n),r=Math.floor(80*Math.sin(i))+100,a=Math.floor(80*Math.cos(i+.5))+100,s=240-a;t.fillStyle=`rgb(${r},${s},${a})`,t.fillRect(n,e,1,1)}const F=(e=>{let n={};for(var t in e){const s=e[t];let o=M(s);for(let e=0;e<s.length;e++)s[e]=s[e].sub(o);const l=Math.min(v.numLejaPoints,Math.floor(s.length/2));let u=[];for(let e=0;e<l;e++){var i=0,r=0,a=0;for(let e=0;e<s.length;e++)(a=p(u,s,e))>i&&(i=a,r=e);u.push(s[r]),s.splice(r,1)}for(let e=0;e<u.length;e++)u[e]=u[e].add(o);n[t]=u}return n})((e=>{const[n,t,i]=e.shape,a=2/Math.max(n,t),s=new r(v.origin.x,v.origin.y);function o(e,n){let t=(e*a-1+s.re)*v.scale,i=(n*a-1+s.im)*v.scale;return new r(t,i)}let l=0,u={};for(let i=1;i<n-1;i++)for(let n=1;n<t-1;n++){let t=e.get(i,n);255!=t&&(l++,null!=u[t]?u[t].push(o(i,n)):u[t]=[o(i,n)])}let h=Math.floor(100*l/(n*t));return v.edgePoints=`${l} / ${n*t} (${h}%)`,u})(z));return[F,(e=>{var n={};for(var t in e){let i=e[t];n[t]=w(i)}return n})(F)]};(()=>{const e=new a.X({container:document.getElementById("settingsPanel"),title:"Parameters",expanded:!1});v.outputSize=Math.floor(window.innerWidth/2)-64,e.addInput(v,"outputSize",{min:256,max:1024,step:1}),e.addInput(v,"minClusterSize",{min:.01,max:.4}),e.addInput(v,"numColors",{min:2,max:16,step:1}),e.addInput(v,"numLejaPoints",{min:4,max:32,step:1}),e.addSeparator(),e.addInput(v,"maxIterations",{min:4,max:128,step:1}).on("change",(e=>{f()})),e.addInput(v,"scale",{min:.1,max:10,step:.1}).on("change",(e=>{f()})),e.addInput(v,"origin",{picker:"inline",expanded:!1}).on("change",(e=>{f()})),e.addSeparator(),e.addMonitor(v,"numValidSubsets"),e.addMonitor(v,"edgePoints")})();var g=document.getElementById("drop");g.addEventListener("dragover",(function(e){this.classList.add("dragging"),e.preventDefault()})),g.addEventListener("dragleave",(function(e){this.classList.remove("dragging"),e.preventDefault()})),g.addEventListener("drop",(async function(e){if(this.classList.remove("dragging"),e.preventDefault(),e.dataTransfer.items)for(var n=0;n<e.dataTransfer.items.length;n++)if("file"===e.dataTransfer.items[n].kind&&e.dataTransfer.items[n].type.match("^image/")){var t=e.dataTransfer.items[n].getAsFile();const[i,r]=await d(t);c(i,r)}}))}},e=>{"use strict";e.O(0,[949,475,962,807],(()=>(5124,e(e.s=5124)))),e.O()}]);