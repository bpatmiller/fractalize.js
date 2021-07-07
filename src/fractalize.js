import { Complex } from "../_snowpack/pkg/complexjs.js";
import { PARAMS } from "./config.js";

// domain is AT MOST [-1,1] (without scale lelel)

export const getComplexPoints = (groupEdges) => {
  // a tensor with either 255 for invalid points,
  // or some number >= 1 and < 255 for valid points/groups
  let centers = {};

  const [w, h, _] = groupEdges.shape;
  const majorAxis = Math.max(w, h);
  const pixelsToUnitFactor = 2.0 / majorAxis;
  const origin = new Complex(PARAMS.origin.x, PARAMS.origin.y);

  function pixelsToComplex(i, j) {
    let real = (i * pixelsToUnitFactor - 1.0 + origin.re) * PARAMS.scale;
    let imag = (j * pixelsToUnitFactor - 1.0 + origin.im) * PARAMS.scale;
    return new Complex(real, imag);
  }

  let edgePointCount = 0;
  let complexPoints = {};
  const borderSize = 0;
  for (let x = borderSize; x < w - borderSize; x++) {
    for (let y = borderSize; y < h - borderSize; y++) {
      let gn = groupEdges.get(x, y);
      if (gn != 255) {
        edgePointCount++;
        if (complexPoints[gn] != null) {
          complexPoints[gn].push(pixelsToComplex(x, y));
        } else {
          complexPoints[gn] = [pixelsToComplex(x, y)];
        }
      }
    }
  }
  // "edge pixel percent"
  let epp = Math.floor((100 * edgePointCount) / (w * h));
  PARAMS.complexPoints = `${edgePointCount} / ${w * h} (${epp}%)`;

  // center each group about the origin,
  for (let key in complexPoints) {
    let center = findCenter(complexPoints[key]);
    centers[key] = center;
    for (let i = 0; i < complexPoints[key].length; i++) {
      complexPoints[key][i] = complexPoints[key][i].sub(center);
    }
  }

  // for (let key in complexPoints) {
  //   let sum = new Complex(0);
  //   for (let i = 0; i < complexPoints[key].length; i++) {
  //     sum = sum.add(complexPoints[key][i]);
  //   }
  //   console.log(key, sum);
  // }
  return [complexPoints, centers];
};

const PI_Z = (lejaPoints, group, s) => {
  if (lejaPoints.length == 0) {
    return group[s].abs();
  }
  var k = 1.0;
  for (let pt = 0; pt < lejaPoints.length; pt++) {
    k *= group[s].sub(lejaPoints[pt]).abs();
  }
  return k;
};

const A_n = (lejaPoints) => {
  let a = 1.0;
  for (let i = 0; i < lejaPoints.length - 1; i++) {
    a *= lejaPoints[lejaPoints.length - 1].sub(lejaPoints[i]).abs();
  }
  return a;
};

export const getA_nStack = (lejaStack) => {
  var A_nStack = {};
  for (var key in lejaStack) {
    let lejaPoints = lejaStack[key];
    A_nStack[key] = A_n(lejaPoints);
  }
  return A_nStack;
};

const findCenter = (complexList) => {
  let x = 0;
  let y = 0;
  for (let c = 0; c < complexList.length; c++) {
    let tmp = complexList[c];
    x += tmp.re;
    y += tmp.im;
  }
  x /= complexList.length;
  y /= complexList.length;
  return new Complex(x, y);
};

export const getLejaPoints = (complexPoints) => {
  console.log(complexPoints);
  let lejaStack = {};
  for (var key in complexPoints) {
    const group = complexPoints[key];

    const n = Math.min(PARAMS.numLejaPoints, Math.floor(group.length / 2));
    let lejaPoints = [];
    for (let iter = 0; iter < n; iter++) {
      var max = 0;
      var smax = 0;
      var cur = 0;
      for (let s = 0; s < group.length; s++) {
        cur = PI_Z(lejaPoints, group, s);
        if (cur > max) {
          max = cur;
          smax = s;
        }
      }
      lejaPoints.push(group[smax]);
      group.splice(smax, 1);
    }
    lejaStack[key] = lejaPoints;
  }
  return lejaStack;
};
