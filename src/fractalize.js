import { Complex } from "complex.js";
import { PARAMS } from "./config";

// domain is AT MOST [-1,1] (without scale lelel)

export const getComplexPoints = (groupEdges) => {
  // a tensor with either 255 for invalid points,
  // or some number >= 1 and < 255 for valid points/groups

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
  let edgePoints = {};
  const borderSize = 1;
  for (let x = borderSize; x < w - borderSize; x++) {
    for (let y = borderSize; y < h - borderSize; y++) {
      let gn = groupEdges.get(x, y);
      if (gn != 255) {
        edgePointCount++;
        if (edgePoints[gn] != null) {
          edgePoints[gn].push(pixelsToComplex(x, y));
        } else {
          edgePoints[gn] = [pixelsToComplex(x, y)];
        }
      }
    }
  }
  // "edge pixel percent"
  let epp = Math.floor((100 * edgePointCount) / (w * h));
  PARAMS.edgePoints = `${edgePointCount} / ${w * h} (${epp}%)`;
  return edgePoints;
};

const PI_Z = (lejaPoints, group, s) => {
  if (lejaPoints.length == 0) {
    // console.log(group);
    return group[s].abs();
  }
  var k = 1.0;
  for (let pt = 0; pt < lejaPoints.length; pt++) {
    k *= group[s].sub(lejaPoints[pt]).abs();
  }
  return k;
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

export const getLejaPoints = (edgePoints) => {
  let lejaStack = {};
  for (var key in edgePoints) {
    const group = edgePoints[key];
    // center group about 0,0
    let center = findCenter(group);
    console.log(center);

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
