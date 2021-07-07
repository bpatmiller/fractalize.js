import * as gm from "gammacv";
import { getA_nStack, getComplexPoints, getLejaPoints } from "./fractalize.js";
import { PARAMS } from "./config";

// basically just
// - handle an image upload
// - resize it to fit with our params
// - perform color segmentation
// - find connected regions of the same color
// - find edges of those connected regions
// - draw the original and the connected regions on canvas

const drawCanvasFromURL = (dataURL) =>
  new Promise((resolve) => {
    const canvas = document.getElementById("resized");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.setAttribute("crossOrigin", "");
    img.onload = () => {
      let mainAxis = Math.max(img.width, img.height);
      let w = Math.floor(img.width * (PARAMS.outputSize / mainAxis));
      let h = Math.floor(img.height * (PARAMS.outputSize / mainAxis));
      canvas.width = w;
      canvas.height = h;
      ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, w, h);
      resolve({
        width: w,
        height: h,
      });
    };
    img.src = dataURL;
  });

export const handleImage = async (file, remoteUrl) => {
  const canvas = document.getElementById("resized");
  const ctx = canvas.getContext("2d");
  let srcImgUrl;
  if (remoteUrl != null) {
    srcImgUrl = remoteUrl;
  } else {
    srcImgUrl = URL.createObjectURL(file);
  }

  const dim = await drawCanvasFromURL(srcImgUrl);

  const rendererContainer = document.getElementById("fractal");
  rendererContainer.style.width = dim.width;
  rendererContainer.style.height = dim.height;

  // resized image tensor
  let imgT = new gm.Tensor("uint8", [dim.width, dim.height, 4]);

  // i think canvasToTensor is only giving us a square sooo
  // gm.canvasToTensor(canvas, imgT);
  // gm.tensor
  const imgTData = ctx.getImageData(0, 0, dim.width, dim.height);
  for (let x = 0; x < dim.width; x++) {
    for (let y = 0; y < dim.height; y++) {
      let loc = (x + y * dim.width) * 4;
      for (let w = 0; w < 4; w++) {
        imgT.set(x, y, w, imgTData.data[loc + w]);
      }
    }
  }

  // segment and draw over
  let pipeline = imgT;
  pipeline = gm.colorSegmentation(pipeline, PARAMS.numColors);
  const out = gm.tensorFrom(pipeline);
  const sess = new gm.Session();
  sess.init(pipeline);
  sess.runOp(pipeline, 0, out);

  sess.destroy();

  var groups = new gm.Tensor("uint8", [dim.width, dim.height]);

  function followable(x, y, g) {
    return (
      x < dim.width &&
      x >= 0 &&
      y < dim.height &&
      y >= 0 &&
      groups.get(x, y) != g
    );
  }

  function expandCluster(pix, g) {
    var stack = [pix];
    let x, y;
    let count = 0;
    while (stack.length > 0) {
      [x, y] = stack.pop();
      groups.set(x, y, g);
      count++;

      if (followable(x - 1, y, g) && out.get(x - 1, y, 0) == out.get(x, y, 0)) {
        stack.push([x - 1, y]);
      }
      if (followable(x, y - 1, g) && out.get(x, y - 1, 0) == out.get(x, y, 0)) {
        stack.push([x, y - 1]);
      }
      if (followable(x + 1, y, g) && out.get(x + 1, y, 0) == out.get(x, y, 0)) {
        stack.push([x + 1, y]);
      }
      if (followable(x, y + 1, g) && out.get(x, y + 1, 0) == out.get(x, y, 0)) {
        stack.push([x, y + 1]);
      }
    }
    return count;
  }

  // find avg rgb color of each group
  var colors = {};
  function replaceCluster(sub, g) {
    for (let x = 0; x < dim.width; x++) {
      for (let y = 0; y < dim.height; y++) {
        if (groups.get(x, y) == sub) {
          groups.set(x, y, g);
          if (colors[g] == null) {
            colors[g] = [
              imgT.get(x, y, 0),
              imgT.get(x, y, 1),
              imgT.get(x, y, 2),
            ];
          } else {
            colors[g][0] += imgT.get(x, y, 0);
            colors[g][1] += imgT.get(x, y, 1);
            colors[g][2] += imgT.get(x, y, 2);
          }
        }
      }
    }
  }
  // find connected clusters
  var groupIndex = 0;
  var validGroups = 0;
  var setSizes = {};
  for (let x = 0; x < dim.width; x++) {
    for (let y = 0; y < dim.height; y++) {
      if (groups.get(x, y) == 0) {
        groupIndex++;
        let count = expandCluster([x, y], 255);
        if (
          count >
          PARAMS.minClusterSize * PARAMS.outputSize * PARAMS.outputSize
        ) {
          validGroups++;
          replaceCluster(255, validGroups);
          // take avg pixel vals
          colors[validGroups][0] /= 255.0 * count;
          colors[validGroups][1] /= 255.0 * count;
          colors[validGroups][2] /= 255.0 * count;

          setSizes[validGroups] = count;
        }
      }
    }
  }
  PARAMS.numValidSubsets = validGroups;
  var groupEdges = groups.clone();

  // remove interior points hehehehe
  for (let x = 0; x < dim.width; x++) {
    for (let y = 0; y < dim.height; y++) {
      let gn = groups.get(x, y);
      if (gn != 255) {
        if (
          groups.get(x - 1, y) == gn &&
          groups.get(x + 1, y) == gn &&
          groups.get(x, y - 1) == gn &&
          groups.get(x, y + 1) == gn &&
          groups.get(x - 1, y - 1) == gn &&
          groups.get(x + 1, y - 1) == gn &&
          groups.get(x - 1, y + 1) == gn &&
          groups.get(x + 1, y + 1) == gn
        ) {
          groupEdges.set(x, y, 255);
        }
      }
    }
  }

  ctx.fillStyle = `rgba(255,255,255,0.85)`;
  ctx.fillRect(0, 0, dim.width, dim.height);

  // draw over group colors, then white over, then draw outlines
  for (let x = 0; x < dim.width; x++) {
    for (let y = 0; y < dim.height; y++) {
      if (groups.get(x, y) != 255) {
        let gn = groups.get(x, y);
        let r = Math.floor(Math.sin(10 * gn) * 80) + 100;
        let b = Math.floor(Math.cos(10 * gn + 0.5) * 80) + 100;
        let g = 240 - b;
        ctx.fillStyle = `rgba(${r},${g},${b},0.3)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  for (let x = 0; x < dim.width; x++) {
    for (let y = 0; y < dim.height; y++) {
      if (groupEdges.get(x, y) != 255) {
        let gn = groups.get(x, y);
        let r = Math.floor(Math.sin(gn) * 80) + 100;
        let b = Math.floor(Math.cos(gn + 0.5) * 80) + 100;
        let g = 240 - b;
        ctx.fillStyle = `rgb(${r},${g},${b})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  const [complexPoints, centers] = getComplexPoints(groupEdges);

  const lejaStack = getLejaPoints(complexPoints);
  const A_nStack = getA_nStack(lejaStack);
  // at this point we are done with the precomputation and ready to render
  return [lejaStack, A_nStack, centers, colors, setSizes];
};
