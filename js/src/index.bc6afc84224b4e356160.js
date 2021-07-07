/*! For license information please see index.bc6afc84224b4e356160.js.LICENSE.txt */
(self.webpackChunkfractalize=self.webpackChunkfractalize||[]).push([[927],{3324:(e,t,n)=>{"use strict";n.d(t,{a:()=>i,c:()=>a});var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof window?window:void 0!==n.g?n.g:"undefined"!=typeof self?self:{};function a(e,t,n){return e(n={path:t,exports:{},require:function(e,t){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}(null==t&&n.path)}},n.exports),n.exports}},8989:(e,t,n)=>{"use strict";var i=n(6379),a=(0,n(3324).c)((function(e,t){!function(t){var n=function(e){return.5*(Math.exp(e)+Math.exp(-e))},i=function(e){return.5*(Math.exp(e)-Math.exp(-e))},a=function(){throw SyntaxError("Invalid Param")};function r(e,t){var n=Math.abs(e),i=Math.abs(t);return 0===e?Math.log(i):0===t?Math.log(n):n<3e3&&i<3e3?.5*Math.log(e*e+t*t):Math.log(e/Math.cos(Math.atan2(t,e)))}function o(e,t){if(!(this instanceof o))return new o(e,t);var n=function(e,t){var n={re:0,im:0};if(null==e)n.re=n.im=0;else if(void 0!==t)n.re=e,n.im=t;else switch(typeof e){case"object":if("im"in e&&"re"in e)n.re=e.re,n.im=e.im;else if("abs"in e&&"arg"in e){if(!Number.isFinite(e.abs)&&Number.isFinite(e.arg))return o.INFINITY;n.re=e.abs*Math.cos(e.arg),n.im=e.abs*Math.sin(e.arg)}else if("r"in e&&"phi"in e){if(!Number.isFinite(e.r)&&Number.isFinite(e.phi))return o.INFINITY;n.re=e.r*Math.cos(e.phi),n.im=e.r*Math.sin(e.phi)}else 2===e.length?(n.re=e[0],n.im=e[1]):a();break;case"string":n.im=n.re=0;var i=e.match(/\d+\.?\d*e[+-]?\d+|\d+\.?\d*|\.\d+|./g),r=1,s=0;null===i&&a();for(var l=0;l<i.length;l++){var u=i[l];" "===u||"\t"===u||"\n"===u||("+"===u?r++:"-"===u?s++:"i"===u||"I"===u?(r+s===0&&a()," "===i[l+1]||isNaN(i[l+1])?n.im+=parseFloat((s%2?"-":"")+"1"):(n.im+=parseFloat((s%2?"-":"")+i[l+1]),l++),r=s=0):((r+s===0||isNaN(u))&&a(),"i"===i[l+1]||"I"===i[l+1]?(n.im+=parseFloat((s%2?"-":"")+u),l++):n.re+=parseFloat((s%2?"-":"")+u),r=s=0))}r+s>0&&a();break;case"number":n.im=0,n.re=e;break;default:a()}return n}(e,t);this.re=n.re,this.im=n.im}o.prototype={re:0,im:0,sign:function(){var e=this.abs();return new o(this.re/e,this.im/e)},add:function(e,t){var n=new o(e,t);return this.isInfinite()&&n.isInfinite()?o.NAN:this.isInfinite()||n.isInfinite()?o.INFINITY:new o(this.re+n.re,this.im+n.im)},sub:function(e,t){var n=new o(e,t);return this.isInfinite()&&n.isInfinite()?o.NAN:this.isInfinite()||n.isInfinite()?o.INFINITY:new o(this.re-n.re,this.im-n.im)},mul:function(e,t){var n=new o(e,t);return this.isInfinite()&&n.isZero()||this.isZero()&&n.isInfinite()?o.NAN:this.isInfinite()||n.isInfinite()?o.INFINITY:0===n.im&&0===this.im?new o(this.re*n.re,0):new o(this.re*n.re-this.im*n.im,this.re*n.im+this.im*n.re)},div:function(e,t){var n=new o(e,t);if(this.isZero()&&n.isZero()||this.isInfinite()&&n.isInfinite())return o.NAN;if(this.isInfinite()||n.isZero())return o.INFINITY;if(this.isZero()||n.isInfinite())return o.ZERO;e=this.re,t=this.im;var i,a,r=n.re,s=n.im;return 0===s?new o(e/r,t/r):Math.abs(r)<Math.abs(s)?new o((e*(a=r/s)+t)/(i=r*a+s),(t*a-e)/i):new o((e+t*(a=s/r))/(i=s*a+r),(t-e*a)/i)},pow:function(e,t){var n=new o(e,t);if(e=this.re,t=this.im,n.isZero())return o.ONE;if(0===n.im){if(0===t&&e>0)return new o(Math.pow(e,n.re),0);if(0===e)switch((n.re%4+4)%4){case 0:return new o(Math.pow(t,n.re),0);case 1:return new o(0,Math.pow(t,n.re));case 2:return new o(-Math.pow(t,n.re),0);case 3:return new o(0,-Math.pow(t,n.re))}}if(0===e&&0===t&&n.re>0&&n.im>=0)return o.ZERO;var i=Math.atan2(t,e),a=r(e,t);return e=Math.exp(n.re*a-n.im*i),t=n.im*a+n.re*i,new o(e*Math.cos(t),e*Math.sin(t))},sqrt:function(){var e,t,n=this.re,i=this.im,a=this.abs();if(n>=0){if(0===i)return new o(Math.sqrt(n),0);e=.5*Math.sqrt(2*(a+n))}else e=Math.abs(i)/Math.sqrt(2*(a-n));return t=n<=0?.5*Math.sqrt(2*(a-n)):Math.abs(i)/Math.sqrt(2*(a+n)),new o(e,i<0?-t:t)},exp:function(){var e=Math.exp(this.re);return this.im,new o(e*Math.cos(this.im),e*Math.sin(this.im))},expm1:function(){var e=this.re,t=this.im;return new o(Math.expm1(e)*Math.cos(t)+function(e){var t=Math.PI/4;if(-t>e||e>t)return Math.cos(e)-1;var n=e*e;return n*(n*(n*(n*(n*(n*(n*(n/20922789888e3-1/87178291200)+1/479001600)-1/3628800)+1/40320)-1/720)+1/24)-.5)}(t),Math.exp(e)*Math.sin(t))},log:function(){var e=this.re,t=this.im;return new o(r(e,t),Math.atan2(t,e))},abs:function(){return e=this.re,t=this.im,n=Math.abs(e),i=Math.abs(t),n<3e3&&i<3e3?Math.sqrt(n*n+i*i):(n<i?(n=i,i=e/t):i=t/e,n*Math.sqrt(1+i*i));var e,t,n,i},arg:function(){return Math.atan2(this.im,this.re)},sin:function(){var e=this.re,t=this.im;return new o(Math.sin(e)*n(t),Math.cos(e)*i(t))},cos:function(){var e=this.re,t=this.im;return new o(Math.cos(e)*n(t),-Math.sin(e)*i(t))},tan:function(){var e=2*this.re,t=2*this.im,a=Math.cos(e)+n(t);return new o(Math.sin(e)/a,i(t)/a)},cot:function(){var e=2*this.re,t=2*this.im,a=Math.cos(e)-n(t);return new o(-Math.sin(e)/a,i(t)/a)},sec:function(){var e=this.re,t=this.im,a=.5*n(2*t)+.5*Math.cos(2*e);return new o(Math.cos(e)*n(t)/a,Math.sin(e)*i(t)/a)},csc:function(){var e=this.re,t=this.im,a=.5*n(2*t)-.5*Math.cos(2*e);return new o(Math.sin(e)*n(t)/a,-Math.cos(e)*i(t)/a)},asin:function(){var e=this.re,t=this.im,n=new o(t*t-e*e+1,-2*e*t).sqrt(),i=new o(n.re-t,n.im+e).log();return new o(i.im,-i.re)},acos:function(){var e=this.re,t=this.im,n=new o(t*t-e*e+1,-2*e*t).sqrt(),i=new o(n.re-t,n.im+e).log();return new o(Math.PI/2-i.im,i.re)},atan:function(){var e=this.re,t=this.im;if(0===e){if(1===t)return new o(0,1/0);if(-1===t)return new o(0,-1/0)}var n=e*e+(1-t)*(1-t),i=new o((1-t*t-e*e)/n,-2*e/n).log();return new o(-.5*i.im,.5*i.re)},acot:function(){var e=this.re,t=this.im;if(0===t)return new o(Math.atan2(1,e),0);var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).atan():new o(0!==e?e/0:0,0!==t?-t/0:0).atan()},asec:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new o(0,1/0);var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).acos():new o(0!==e?e/0:0,0!==t?-t/0:0).acos()},acsc:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new o(Math.PI/2,1/0);var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).asin():new o(0!==e?e/0:0,0!==t?-t/0:0).asin()},sinh:function(){var e=this.re,t=this.im;return new o(i(e)*Math.cos(t),n(e)*Math.sin(t))},cosh:function(){var e=this.re,t=this.im;return new o(n(e)*Math.cos(t),i(e)*Math.sin(t))},tanh:function(){var e=2*this.re,t=2*this.im,a=n(e)+Math.cos(t);return new o(i(e)/a,Math.sin(t)/a)},coth:function(){var e=2*this.re,t=2*this.im,a=n(e)-Math.cos(t);return new o(i(e)/a,-Math.sin(t)/a)},csch:function(){var e=this.re,t=this.im,a=Math.cos(2*t)-n(2*e);return new o(-2*i(e)*Math.cos(t)/a,2*n(e)*Math.sin(t)/a)},sech:function(){var e=this.re,t=this.im,a=Math.cos(2*t)+n(2*e);return new o(2*n(e)*Math.cos(t)/a,-2*i(e)*Math.sin(t)/a)},asinh:function(){var e=this.im;this.im=-this.re,this.re=e;var t=this.asin();return this.re=-this.im,this.im=e,e=t.re,t.re=-t.im,t.im=e,t},acosh:function(){var e=this.acos();if(e.im<=0){var t=e.re;e.re=-e.im,e.im=t}else t=e.im,e.im=-e.re,e.re=t;return e},atanh:function(){var e=this.re,t=this.im,n=e>1&&0===t,i=1-e,a=1+e,s=i*i+t*t,l=0!==s?new o((a*i-t*t)/s,(t*i+a*t)/s):new o(-1!==e?e/0:0,0!==t?t/0:0),u=l.re;return l.re=r(l.re,l.im)/2,l.im=Math.atan2(l.im,u)/2,n&&(l.im=-l.im),l},acoth:function(){var e=this.re,t=this.im;if(0===e&&0===t)return new o(0,Math.PI/2);var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).atanh():new o(0!==e?e/0:0,0!==t?-t/0:0).atanh()},acsch:function(){var e=this.re,t=this.im;if(0===t)return new o(0!==e?Math.log(e+Math.sqrt(e*e+1)):1/0,0);var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).asinh():new o(0!==e?e/0:0,0!==t?-t/0:0).asinh()},asech:function(){var e=this.re,t=this.im;if(this.isZero())return o.INFINITY;var n=e*e+t*t;return 0!==n?new o(e/n,-t/n).acosh():new o(0!==e?e/0:0,0!==t?-t/0:0).acosh()},inverse:function(){if(this.isZero())return o.INFINITY;if(this.isInfinite())return o.ZERO;var e=this.re,t=this.im,n=e*e+t*t;return new o(e/n,-t/n)},conjugate:function(){return new o(this.re,-this.im)},neg:function(){return new o(-this.re,-this.im)},ceil:function(e){return e=Math.pow(10,e||0),new o(Math.ceil(this.re*e)/e,Math.ceil(this.im*e)/e)},floor:function(e){return e=Math.pow(10,e||0),new o(Math.floor(this.re*e)/e,Math.floor(this.im*e)/e)},round:function(e){return e=Math.pow(10,e||0),new o(Math.round(this.re*e)/e,Math.round(this.im*e)/e)},equals:function(e,t){var n=new o(e,t);return Math.abs(n.re-this.re)<=o.EPSILON&&Math.abs(n.im-this.im)<=o.EPSILON},clone:function(){return new o(this.re,this.im)},toString:function(){var e=this.re,t=this.im,n="";return this.isNaN()?"NaN":this.isInfinite()?"Infinity":(Math.abs(e)<o.EPSILON&&(e=0),Math.abs(t)<o.EPSILON&&(t=0),0===t?n+e:(0!==e?(n+=e,n+=" ",t<0?(t=-t,n+="-"):n+="+",n+=" "):t<0&&(t=-t,n+="-"),1!==t&&(n+=t),n+"i"))},toVector:function(){return[this.re,this.im]},valueOf:function(){return 0===this.im?this.re:null},isNaN:function(){return isNaN(this.re)||isNaN(this.im)},isZero:function(){return 0===this.im&&0===this.re},isFinite:function(){return isFinite(this.re)&&isFinite(this.im)},isInfinite:function(){return!(this.isNaN()||this.isFinite())}},o.ZERO=new o(0,0),o.ONE=new o(1,0),o.I=new o(0,1),o.PI=new o(Math.PI,0),o.E=new o(Math.E,0),o.INFINITY=new o(1/0,1/0),o.NAN=new o(NaN,NaN),o.EPSILON=1e-15,Object.defineProperty(o,"__esModule",{value:!0}),o.default=o,o.Complex=o,e.exports=o}()})).Complex,r=n(7715),o=n(3638);const s={type:"change"},l={type:"start"},u={type:"end"};class c extends o.aQ{constructor(e,t){super(),void 0===t&&console.warn('THREE.OrbitControls: The second parameter "domElement" is now mandatory.'),t===document&&console.error('THREE.OrbitControls: "document" should not be used as the target "domElement". Please use "renderer.domElement" instead.'),this.object=e,this.domElement=t,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new o.fH,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:o.ck.ROTATE,MIDDLE:o.ck.DOLLY,RIGHT:o.ck.PAN},this.touches={ONE:o.f9.ROTATE,TWO:o.f9.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return c.phi},this.getAzimuthalAngle=function(){return c.theta},this.listenToKeyEvents=function(e){e.addEventListener("keydown",K),this._domElementKeyEvents=e},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(s),n.update(),a=i.NONE},this.update=function(){const t=new o.fH,l=(new o.dx).setFromUnitVectors(e.up,new o.fH(0,1,0)),u=l.clone().invert(),d=new o.fH,v=new o.dx,w=2*Math.PI;return function(){const e=n.object.position;t.copy(e).sub(n.target),t.applyQuaternion(l),c.setFromVector3(t),n.autoRotate&&a===i.NONE&&S(2*Math.PI/60/60*n.autoRotateSpeed),n.enableDamping?(c.theta+=h.theta*n.dampingFactor,c.phi+=h.phi*n.dampingFactor):(c.theta+=h.theta,c.phi+=h.phi);let o=n.minAzimuthAngle,g=n.maxAzimuthAngle;return isFinite(o)&&isFinite(g)&&(o<-Math.PI?o+=w:o>Math.PI&&(o-=w),g<-Math.PI?g+=w:g>Math.PI&&(g-=w),c.theta=o<=g?Math.max(o,Math.min(g,c.theta)):c.theta>(o+g)/2?Math.max(o,c.theta):Math.min(g,c.theta)),c.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,c.phi)),c.makeSafe(),c.radius*=m,c.radius=Math.max(n.minDistance,Math.min(n.maxDistance,c.radius)),!0===n.enableDamping?n.target.addScaledVector(f,n.dampingFactor):n.target.add(f),t.setFromSpherical(c),t.applyQuaternion(u),e.copy(n.target).add(t),n.object.lookAt(n.target),!0===n.enableDamping?(h.theta*=1-n.dampingFactor,h.phi*=1-n.dampingFactor,f.multiplyScalar(1-n.dampingFactor)):(h.set(0,0,0),f.set(0,0,0)),m=1,!!(p||d.distanceToSquared(n.object.position)>r||8*(1-v.dot(n.object.quaternion))>r)&&(n.dispatchEvent(s),d.copy(n.object.position),v.copy(n.object.quaternion),p=!1,!0)}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",B),n.domElement.removeEventListener("pointerdown",Z),n.domElement.removeEventListener("pointercancel",q),n.domElement.removeEventListener("wheel",X),n.domElement.ownerDocument.removeEventListener("pointermove",_),n.domElement.ownerDocument.removeEventListener("pointerup",U),null!==n._domElementKeyEvents&&n._domElementKeyEvents.removeEventListener("keydown",K)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let a=i.NONE;const r=1e-6,c=new o.eR,h=new o.eR;let m=1;const f=new o.fH;let p=!1;const d=new o.fG,v=new o.fG,w=new o.fG,g=new o.fG,b=new o.fG,M=new o.fG,x=new o.fG,y=new o.fG,E=new o.fG,I=[],N={};function O(){return Math.pow(.95,n.zoomSpeed)}function S(e){h.theta-=e}function z(e){h.phi-=e}const P=function(){const e=new o.fH;return function(t,n){e.setFromMatrixColumn(n,0),e.multiplyScalar(-t),f.add(e)}}(),T=function(){const e=new o.fH;return function(t,i){!0===n.screenSpacePanning?e.setFromMatrixColumn(i,1):(e.setFromMatrixColumn(i,0),e.crossVectors(n.object.up,e)),e.multiplyScalar(t),f.add(e)}}(),j=function(){const e=new o.fH;return function(t,i){const a=n.domElement;if(n.object.isPerspectiveCamera){const r=n.object.position;e.copy(r).sub(n.target);let o=e.length();o*=Math.tan(n.object.fov/2*Math.PI/180),P(2*t*o/a.clientHeight,n.object.matrix),T(2*i*o/a.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(P(t*(n.object.right-n.object.left)/n.object.zoom/a.clientWidth,n.object.matrix),T(i*(n.object.top-n.object.bottom)/n.object.zoom/a.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function A(e){n.object.isPerspectiveCamera?m/=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom*e)),n.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function L(e){n.object.isPerspectiveCamera?m*=e:n.object.isOrthographicCamera?(n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/e)),n.object.updateProjectionMatrix(),p=!0):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(e){d.set(e.clientX,e.clientY)}function R(e){g.set(e.clientX,e.clientY)}function F(){if(1===I.length)d.set(I[0].pageX,I[0].pageY);else{const e=.5*(I[0].pageX+I[1].pageX),t=.5*(I[0].pageY+I[1].pageY);d.set(e,t)}}function G(){if(1===I.length)g.set(I[0].pageX,I[0].pageY);else{const e=.5*(I[0].pageX+I[1].pageX),t=.5*(I[0].pageY+I[1].pageY);g.set(e,t)}}function Y(){const e=I[0].pageX-I[1].pageX,t=I[0].pageY-I[1].pageY,n=Math.sqrt(e*e+t*t);x.set(0,n)}function C(e){if(1==I.length)v.set(e.pageX,e.pageY);else{const t=W(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);v.set(n,i)}w.subVectors(v,d).multiplyScalar(n.rotateSpeed);const t=n.domElement;S(2*Math.PI*w.x/t.clientHeight),z(2*Math.PI*w.y/t.clientHeight),d.copy(v)}function D(e){if(1===I.length)b.set(e.pageX,e.pageY);else{const t=W(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);b.set(n,i)}M.subVectors(b,g).multiplyScalar(n.panSpeed),j(M.x,M.y),g.copy(b)}function H(e){const t=W(e),i=e.pageX-t.x,a=e.pageY-t.y,r=Math.sqrt(i*i+a*a);y.set(0,r),E.set(0,Math.pow(y.y/x.y,n.zoomSpeed)),A(E.y),x.copy(y)}function Z(e){!1!==n.enabled&&(0===I.length&&(n.domElement.ownerDocument.addEventListener("pointermove",_),n.domElement.ownerDocument.addEventListener("pointerup",U)),function(e){I.push(e)}(e),"touch"===e.pointerType?function(e){switch($(e),I.length){case 1:switch(n.touches.ONE){case o.f9.ROTATE:if(!1===n.enableRotate)return;F(),a=i.TOUCH_ROTATE;break;case o.f9.PAN:if(!1===n.enablePan)return;G(),a=i.TOUCH_PAN;break;default:a=i.NONE}break;case 2:switch(n.touches.TWO){case o.f9.DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;n.enableZoom&&Y(),n.enablePan&&G(),a=i.TOUCH_DOLLY_PAN;break;case o.f9.DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;n.enableZoom&&Y(),n.enableRotate&&F(),a=i.TOUCH_DOLLY_ROTATE;break;default:a=i.NONE}break;default:a=i.NONE}a!==i.NONE&&n.dispatchEvent(l)}(e):function(e){let t;switch(e.button){case 0:t=n.mouseButtons.LEFT;break;case 1:t=n.mouseButtons.MIDDLE;break;case 2:t=n.mouseButtons.RIGHT;break;default:t=-1}switch(t){case o.ck.DOLLY:if(!1===n.enableZoom)return;!function(e){x.set(e.clientX,e.clientY)}(e),a=i.DOLLY;break;case o.ck.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enablePan)return;R(e),a=i.PAN}else{if(!1===n.enableRotate)return;k(e),a=i.ROTATE}break;case o.ck.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===n.enableRotate)return;k(e),a=i.ROTATE}else{if(!1===n.enablePan)return;R(e),a=i.PAN}break;default:a=i.NONE}a!==i.NONE&&n.dispatchEvent(l)}(e))}function _(e){!1!==n.enabled&&("touch"===e.pointerType?function(e){switch($(e),a){case i.TOUCH_ROTATE:if(!1===n.enableRotate)return;C(e),n.update();break;case i.TOUCH_PAN:if(!1===n.enablePan)return;D(e),n.update();break;case i.TOUCH_DOLLY_PAN:if(!1===n.enableZoom&&!1===n.enablePan)return;!function(e){n.enableZoom&&H(e),n.enablePan&&D(e)}(e),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(!1===n.enableZoom&&!1===n.enableRotate)return;!function(e){n.enableZoom&&H(e),n.enableRotate&&C(e)}(e),n.update();break;default:a=i.NONE}}(e):function(e){if(!1!==n.enabled)switch(a){case i.ROTATE:if(!1===n.enableRotate)return;!function(e){v.set(e.clientX,e.clientY),w.subVectors(v,d).multiplyScalar(n.rotateSpeed);const t=n.domElement;S(2*Math.PI*w.x/t.clientHeight),z(2*Math.PI*w.y/t.clientHeight),d.copy(v),n.update()}(e);break;case i.DOLLY:if(!1===n.enableZoom)return;!function(e){y.set(e.clientX,e.clientY),E.subVectors(y,x),E.y>0?A(O()):E.y<0&&L(O()),x.copy(y),n.update()}(e);break;case i.PAN:if(!1===n.enablePan)return;!function(e){b.set(e.clientX,e.clientY),M.subVectors(b,g).multiplyScalar(n.panSpeed),j(M.x,M.y),g.copy(b),n.update()}(e)}}(e))}function U(e){!1!==n.enabled&&(e.pointerType,n.dispatchEvent(u),a=i.NONE,V(e),0===I.length&&(n.domElement.ownerDocument.removeEventListener("pointermove",_),n.domElement.ownerDocument.removeEventListener("pointerup",U)))}function q(e){V(e)}function X(e){!1===n.enabled||!1===n.enableZoom||a!==i.NONE&&a!==i.ROTATE||(e.preventDefault(),n.dispatchEvent(l),function(e){e.deltaY<0?L(O()):e.deltaY>0&&A(O()),n.update()}(e),n.dispatchEvent(u))}function K(e){!1!==n.enabled&&!1!==n.enablePan&&function(e){let t=!1;switch(e.code){case n.keys.UP:j(0,n.keyPanSpeed),t=!0;break;case n.keys.BOTTOM:j(0,-n.keyPanSpeed),t=!0;break;case n.keys.LEFT:j(n.keyPanSpeed,0),t=!0;break;case n.keys.RIGHT:j(-n.keyPanSpeed,0),t=!0}t&&(e.preventDefault(),n.update())}(e)}function B(e){!1!==n.enabled&&e.preventDefault()}function V(e){delete N[e.pointerId];for(let t=0;t<I.length;t++)if(I[t].pointerId==e.pointerId)return void I.splice(t,1)}function $(e){let t=N[e.pointerId];void 0===t&&(t=new o.fG,N[e.pointerId]=t),t.set(e.pageX,e.pageY)}function W(e){const t=e.pointerId===I[0].pointerId?I[1]:I[0];return N[t.pointerId]}n.domElement.addEventListener("contextmenu",B),n.domElement.addEventListener("pointerdown",Z),n.domElement.addEventListener("pointercancel",q),n.domElement.addEventListener("wheel",X,{passive:!1}),this.update()}}let h,m,f,p,d={};const v=()=>{if(0!=d.length)for(let e in d){let t=d[e].material;t.uniforms.maxIterations.value=b.maxIterations,t.uniforms.scale.value=b.scale}},w=(e,t,n,i)=>{let a=d[e].material;function r(e,t){t<n&&(e.value.x=i[t].re,e.value.y=i[t].im)}a.uniforms.an.value=t,a.uniforms.nl.value=n,a.uniforms.maxIterations.value=b.maxIterations,r(a.uniforms.l1,0),r(a.uniforms.l2,1),r(a.uniforms.l3,2),r(a.uniforms.l4,3),r(a.uniforms.l5,4),r(a.uniforms.l6,5),r(a.uniforms.l7,6),r(a.uniforms.l8,7),r(a.uniforms.l9,8),r(a.uniforms.l10,9),r(a.uniforms.l11,10),r(a.uniforms.l12,11),r(a.uniforms.l13,14),r(a.uniforms.l14,13),r(a.uniforms.l15,14),r(a.uniforms.l16,15),r(a.uniforms.l17,16),r(a.uniforms.l18,17),r(a.uniforms.l19,18),r(a.uniforms.l20,19),r(a.uniforms.l21,20),r(a.uniforms.l22,21),r(a.uniforms.l23,22),r(a.uniforms.l24,23),r(a.uniforms.l25,24),r(a.uniforms.l26,25),r(a.uniforms.l27,26),r(a.uniforms.l28,27),r(a.uniforms.l29,28),r(a.uniforms.l30,29),r(a.uniforms.l31,30),r(a.uniforms.l32,31)},g=(e,t,n,i)=>{if(d.length>0)return void((e,t)=>{for(let n in e)w(d[n],t[n],e[n].length,e[n])})(e,t);null==h&&(()=>{const[e,t]=(()=>{const e=document.getElementById("resized");return[e.width,e.height]})();h=new o.fT({alpha:!0,depth:!1});const n=document.getElementById("fractal");h.setSize(e,t),n.appendChild(h.domElement),m=new o.d5(-1,1,1,-1,.1,10),p=new c(m,h.domElement),m.position.z=3})();let a=0;for(let e in i)i[e]>a&&(a=i[e]);f=new o.eA;for(let r in e){let s=e[r],l=t[r],u=n[r],c=i[r];const h=new o.dh(2,2);h.translate(0,0,c/a*-.1);const m=new o.eE({uniforms:{an:{value:l},nl:{value:s.length},time:{value:0},maxIterations:{value:64},scale:{value:1},origin:{value:new o.fG(u.re,u.im)},l1:{value:new o.fG},l2:{value:new o.fG},l3:{value:new o.fG},l4:{value:new o.fG},l5:{value:new o.fG},l6:{value:new o.fG},l7:{value:new o.fG},l8:{value:new o.fG},l9:{value:new o.fG},l10:{value:new o.fG},l11:{value:new o.fG},l12:{value:new o.fG},l13:{value:new o.fG},l14:{value:new o.fG},l15:{value:new o.fG},l16:{value:new o.fG},l17:{value:new o.fG},l18:{value:new o.fG},l19:{value:new o.fG},l20:{value:new o.fG},l21:{value:new o.fG},l22:{value:new o.fG},l23:{value:new o.fG},l24:{value:new o.fG},l25:{value:new o.fG},l26:{value:new o.fG},l27:{value:new o.fG},l28:{value:new o.fG},l29:{value:new o.fG},l30:{value:new o.fG},l31:{value:new o.fG},l32:{value:new o.fG}},vertexShader:"\n    varying vec3 vUv;\n    \n    void main() {\n        vUv = position;\n\n        vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);\n        gl_Position = projectionMatrix * modelViewPosition;    }\n    ",fragmentShader:"\n    uniform float an;\n    uniform int nl;\n    uniform float time;\n    uniform int maxIterations;\n    uniform float scale;\n    uniform vec2 origin;\n\n    uniform vec2 l1;\n    uniform vec2 l2;\n    uniform vec2 l3;\n    uniform vec2 l4;\n    uniform vec2 l5;\n    uniform vec2 l6;\n    uniform vec2 l7;\n    uniform vec2 l8;\n    uniform vec2 l9;\n    uniform vec2 l10;\n    uniform vec2 l11;\n    uniform vec2 l12;\n    uniform vec2 l13;\n    uniform vec2 l14;\n    uniform vec2 l15;\n    uniform vec2 l16;\n    uniform vec2 l17;\n    uniform vec2 l18;\n    uniform vec2 l19;\n    uniform vec2 l20;\n    uniform vec2 l21;\n    uniform vec2 l22;\n    uniform vec2 l23;\n    uniform vec2 l24;\n    uniform vec2 l25;\n    uniform vec2 l26;\n    uniform vec2 l27;\n    uniform vec2 l28;\n    uniform vec2 l29;\n    uniform vec2 l30;\n    uniform vec2 l31;\n    uniform vec2 l32;\n    \n    varying vec3 vUv;\n\n    // from https://stackoverflow.com/questions/4200224/random-noise-functions-for-glsl\n\n    // A single iteration of Bob Jenkins' One-At-A-Time hashing algorithm.\n    uint hash( uint x ) {\n        x += ( x << 10u );\n        x ^= ( x >>  6u );\n        x += ( x <<  3u );\n        x ^= ( x >> 11u );\n        x += ( x << 15u );\n        return x;\n    }\n\n    // Construct a float with half-open range [0:1] using low 23 bits.\n    // All zeroes yields 0.0, all ones yields the next smallest representable value below 1.0.\n    float floatConstruct( uint m ) {\n        const uint ieeeMantissa = 0x007FFFFFu; // binary32 mantissa bitmask\n        const uint ieeeOne      = 0x3F800000u; // 1.0 in IEEE binary32\n\n        m &= ieeeMantissa;                     // Keep only mantissa bits (fractional part)\n        m |= ieeeOne;                          // Add fractional part to 1.0\n\n        float  f = uintBitsToFloat( m );       // Range [1:2]\n        return f - 1.0;                        // Range [0:1]\n    }\n\n    // Pseudo-random value in half-open range [0:1].\n    float random( float x ) { return floatConstruct(hash(floatBitsToUint(x))); }\n\n    vec2 lejaStep(vec2 z, vec2 p, vec2 l, int n) {\n        if (n > nl) return p;\n        vec2 r = vec2(z.x-l.x, z.y-l.y);\n        vec2 p2 = vec2(p.x * r.x - p.y * r.y, p.x * r.y + p.y * r.x);\n        return p2;\n    }\n\n    vec2 P(vec2 z) {\n        vec2 p = vec2(z.x - l1.x,z.y - l1.y);\n        \n        p = lejaStep(z,p,l2,2);\n        p = lejaStep(z,p,l3,3);\n        p = lejaStep(z,p,l4,4);\n        p = lejaStep(z,p,l5,5);\n        p = lejaStep(z,p,l6,6);\n        p = lejaStep(z,p,l7,7);\n        p = lejaStep(z,p,l8,8);\n        p = lejaStep(z,p,l9,9);\n        p = lejaStep(z,p,l10,10);\n        p = lejaStep(z,p,l11,11);\n        p = lejaStep(z,p,l12,12);\n        p = lejaStep(z,p,l13,13);\n        p = lejaStep(z,p,l14,14);\n        p = lejaStep(z,p,l15,15);\n        p = lejaStep(z,p,l16,16);\n        p = lejaStep(z,p,l17,17);\n        p = lejaStep(z,p,l18,18);\n        p = lejaStep(z,p,l19,19);\n        p = lejaStep(z,p,l20,20);\n        p = lejaStep(z,p,l21,21);\n        p = lejaStep(z,p,l22,22);\n        p = lejaStep(z,p,l23,23);\n        p = lejaStep(z,p,l24,24);\n        p = lejaStep(z,p,l25,25);\n        p = lejaStep(z,p,l26,26);\n        p = lejaStep(z,p,l27,27);\n        p = lejaStep(z,p,l28,28);\n        p = lejaStep(z,p,l29,29);\n        p = lejaStep(z,p,l30,30);\n        p = lejaStep(z,p,l31,31);\n        p = lejaStep(z,p,l32,32);\n\n        float scale = exp(0.5) / an;\n        return vec2(p.x*z.x - p.y*z.y, p.x*z.y + p.y*z.x) * scale;\n        \n    }\n\n    vec3 hsv2rgb(vec3 c)\n    {\n        vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);\n        vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);\n        return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);\n    }\n\n    void main() {\n        vec2 z = (vec2(-vUv.y, vUv.x) - origin) / (scale + 0.1 * sin(0.025 * time));\n        float len = 0.0;\n        int iterations = 0;\n        for (;iterations < maxIterations; iterations++) {\n            if (length(z) > 2.0) {\n                break;\n            }\n            vec2 tmp = P(z);\n            len += length(z - tmp);\n            z = tmp;\n        }\n        float h =  0.5 * sin(time * 0.01) + random(an + l1.y);//random(l2.y + l2.x);\n        float s = 0.65;\n        float v = float(iterations)/float(maxIterations);\n        float a = v - 0.3;\n        if (a < 0.1) {\n          discard;\n        }\n        gl_FragColor = vec4(hsv2rgb(vec3(h,s,v)), a);\n    }\n",depthTest:!1,depthWrite:!1,transparent:!0}),p=new o.cr(h,m);f.add(p),d[r]=p,w(r,l,s.length,s),console.log("updated uniforms")}!function e(){requestAnimationFrame(e);for(let e in d)d[e].material.uniforms.time.value+=.01;p.update(),h.render(f,m)}()},b={outputSize:260,minClusterSize:.03,numColors:4,numValidSubsets:"",edgePoints:"",scale:1,origin:{x:0,y:0},numLejaPoints:32,maxIterations:4},M=(e,t,n)=>{if(0==e.length)return t[n].abs();var i=1;for(let a=0;a<e.length;a++)i*=t[n].sub(e[a]).abs();return i},x=e=>{let t=1;for(let n=0;n<e.length-1;n++)t*=e[e.length-1].sub(e[n]).abs();return t},y=e=>{let t=0,n=0;for(let i=0;i<e.length;i++){let a=e[i];t+=a.re,n+=a.im}return t/=e.length,n/=e.length,new a(t,n)},E=async e=>{const t=document.getElementById("resized"),n=t.getContext("2d"),r=URL.createObjectURL(e),o=await(s=r,new Promise((e=>{const t=document.getElementById("resized"),n=t.getContext("2d"),i=new Image;i.onload=()=>{let a=Math.max(i.width,i.height),r=Math.floor(i.width*(b.outputSize/a)),o=Math.floor(i.height*(b.outputSize/a));t.width=r,t.height=o,n.drawImage(i,0,0,i.width,i.height,0,0,r,o),e({width:r,height:o})},i.src=s})));var s;const l=document.getElementById("fractal");l.style.width=o.width,l.style.height=o.height;let u=new i.es("uint8",[o.width,o.height,4]);i.Ur(t,u);let c=u;c=i.Ig(c,b.numColors);const h=i.He(c),m=new i.z_;m.init(c),m.runOp(c,0,h),m.destroy();var f=new i.es("uint8",[o.width,o.height]);function p(e,t,n){return e<o.width&&e>=0&&t<o.height&&t>=0&&f.get(e,t)!=n}function d(e,t){var n=[e];let i,a,r=0;for(;n.length>0;)[i,a]=n.pop(),f.set(i,a,t),r++,p(i-1,a,t)&&h.get(i-1,a,0)==h.get(i,a,0)&&n.push([i-1,a]),p(i,a-1,t)&&h.get(i,a-1,0)==h.get(i,a,0)&&n.push([i,a-1]),p(i+1,a,t)&&h.get(i+1,a,0)==h.get(i,a,0)&&n.push([i+1,a]),p(i,a+1,t)&&h.get(i,a+1,0)==h.get(i,a,0)&&n.push([i,a+1]);return r}function v(e,t){for(let n=0;n<o.width;n++)for(let i=0;i<o.height;i++)f.get(n,i)==e&&f.set(n,i,t)}var w=0,g={};for(let e=0;e<o.width;e++)for(let t=0;t<o.height;t++)if(0==f.get(e,t)){let n=d([e,t],255);n>b.minClusterSize*b.outputSize*b.outputSize&&(v(255,++w),g[w]=n)}b.numValidSubsets=w;var E=f.clone();for(let e=0;e<o.width;e++)for(let t=0;t<o.height;t++){let n=f.get(e,t);255!=n&&f.get(e-1,t)==n&&f.get(e+1,t)==n&&f.get(e,t-1)==n&&f.get(e,t+1)==n&&f.get(e-1,t-1)==n&&f.get(e+1,t-1)==n&&f.get(e-1,t+1)==n&&f.get(e+1,t+1)==n&&E.set(e,t,255)}n.fillStyle="rgba(255,255,255,0.85)",n.fillRect(0,0,o.width,o.height);for(let e=0;e<o.width;e++)for(let t=0;t<o.height;t++)if(255!=f.get(e,t)){let i=f.get(e,t),a=Math.floor(80*Math.sin(i))+100,r=Math.floor(80*Math.cos(i+.5))+100,o=240-r;n.fillStyle=`rgba(${a},${o},${r},0.5)`,n.fillRect(t,e,1,1)}for(let e=0;e<o.width;e++)for(let t=0;t<o.height;t++)if(255!=E.get(e,t)){let i=f.get(e,t),a=Math.floor(80*Math.sin(i))+100,r=Math.floor(80*Math.cos(i+.5))+100,o=240-r;n.fillStyle=`rgb(${a},${o},${r})`,n.fillRect(t,e,1,1)}const[I,N]=(e=>{let t={};const[n,i,r]=e.shape,o=2/Math.max(n,i),s=new a(b.origin.x,b.origin.y);function l(e,t){let n=(e*o-1+s.re)*b.scale,i=(t*o-1+s.im)*b.scale;return new a(n,i)}let u=0,c={};for(let t=0;t<n-0;t++)for(let n=0;n<i-0;n++){let i=e.get(t,n);255!=i&&(u++,null!=c[i]?c[i].push(l(t,n)):c[i]=[l(t,n)])}let h=Math.floor(100*u/(n*i));b.complexPoints=`${u} / ${n*i} (${h}%)`;for(let e in c){let n=y(c[e]);t[e]=n;for(let t=0;t<c[e].length;t++)c[e][t]=c[e][t].sub(n)}return[c,t]})(E),O=(e=>{console.log(e);let t={};for(var n in e){const o=e[n],s=Math.min(b.numLejaPoints,Math.floor(o.length/2));let l=[];for(let e=0;e<s;e++){var i=0,a=0,r=0;for(let e=0;e<o.length;e++)(r=M(l,o,e))>i&&(i=r,a=e);l.push(o[a]),o.splice(a,1)}t[n]=l}return t})(I);return[O,(e=>{var t={};for(var n in e){let i=e[n];t[n]=x(i)}return t})(O),N,g]};(()=>{const e=new r.X({container:document.getElementById("settingsPanel"),title:"Parameters",expanded:!1});b.outputSize=Math.floor(window.innerWidth/2)-64,e.addInput(b,"outputSize",{min:256,max:1024,step:1}),e.addInput(b,"minClusterSize",{min:.01,max:.4}),e.addInput(b,"numColors",{min:2,max:16,step:1}),e.addInput(b,"numLejaPoints",{min:4,max:32,step:1}),e.addSeparator(),e.addInput(b,"maxIterations",{min:4,max:128,step:1}).on("change",(e=>{v()})),e.addInput(b,"scale",{min:.1,max:10,step:.1}).on("change",(e=>{v()})),e.addInput(b,"origin",{picker:"inline",expanded:!1}).on("change",(e=>{v()})),e.addSeparator(),e.addMonitor(b,"numValidSubsets"),e.addMonitor(b,"edgePoints")})();var I=document.getElementById("drop");I.addEventListener("dragover",(function(e){this.classList.add("dragging"),e.preventDefault()})),I.addEventListener("dragleave",(function(e){this.classList.remove("dragging"),e.preventDefault()})),I.addEventListener("drop",(async function(e){if(this.classList.remove("dragging"),e.preventDefault(),e.dataTransfer.items)for(var t=0;t<e.dataTransfer.items.length;t++)if("file"===e.dataTransfer.items[t].kind&&e.dataTransfer.items[t].type.match("^image/")){var n=e.dataTransfer.items[t].getAsFile();const[i,a,r,o]=await E(n);g(i,a,r,o)}}))}},e=>{"use strict";e.O(0,[949,962,325,807],(()=>(8989,e(e.s=8989)))),e.O()}]);