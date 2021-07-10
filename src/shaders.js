export const vertexShader = () => {
  return `
      varying vec3 vUv;
      
      void main() {
          vUv = position;
  
          vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_Position = projectionMatrix * modelViewPosition;    }
      `;
};

export const fragmentShader = () => {
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
};
