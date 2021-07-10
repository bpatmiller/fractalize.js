import { load } from "@tensorflow-models/deeplab";
import { getA_nStack, getComplexPoints, getLejaPoints } from "./fractalize.js";
import { PARAMS } from "./config";
import * as tf from "@tensorflow/tfjs-core";
// import {} from "@tensorflow/tfjs-core";
// basically just
// - handle an image upload
// - resize it to fit with our params
// - perform color segmentation
// - find connected regions of the same color
// - find edges of those connected regions
// - draw the original and the connected regions on canvas

const srcImgCanvasName = "source";
function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    var hue2rgb = function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}

// TODO convert to async await
const resizeURLImagetoCanvas = (dataURL, canvasId) =>
  // draw canvas, return its imagedata and dimensions
  // TODO support file upload (if a file exists then override)
  new Promise((resolve) => {
    const canvas = document.getElementById(canvasId);
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
        imgData: ctx.getImageData(0, 0, w, h),
      });
    };
    img.src = dataURL;
  });

export const loadImage = (imgUrl) => {
  return resizeURLImagetoCanvas(imgUrl, srcImgCanvasName);
};

export const loadModel = async (modelName) => {
  // const modelName = "ade20k"; // "pascal" "ade20k"
  return await load({ base: modelName, quantizationBytes: 4 });
};

export const segmentImage = async (model, imgData) => {
  // const segCanvas = document.getElementById(segImgCanvasName);
  const { legend, segmentationMap } = await model.segment(
    imgData
    // canvas: segCanvas,
  );
  return { legend, segmentationMap };
};

export const connectedSubsets = async (imgData, segmentationMap) => {
  const width = imgData.width;
  const height = imgData.height;

  // key: which subset
  // value: list of pixels
  // sets will be used for quickly finding each complex point
  let sets = {};
  // avg color for each cluster
  let colors = {};
  // sizes for all clusters
  let setSizes = {};
  // image texture where pixel val
  // => group membership
  // useful for constant reeeeadddd for clustering
  // not really useful after this process
  // READ/WRITE
  let groups = tf.zeros([height, width]).bufferSync();
  // copy of the original (scaled) image to get the avg color of each cluster
  // READ ONLY
  // const orig = tf.browser.fromPixels(imgData);
  // get our segmented image into a tensor
  // READ ONLY

  const seg = tf.browser
    .fromPixels(new ImageData(segmentationMap, width, height))
    .bufferSync();

  const check = (g, x, y, w, z) => {
    const inBounds = w < width && w >= 0 && z < height && z >= 0;
    if (!inBounds) {
      return false;
    }
    const notChecked = groups.get(z, w) != g;
    let sameColor = true;
    [0, 1, 2].forEach((channel) => {
      sameColor = sameColor && seg.get(z, w, channel) == seg.get(y, x, channel);
    });

    if (notChecked && sameColor) {
      return true;
    }

    return false;
  };

  const expandCluster = (pix, group) => {
    let stack = [pix];
    let y, x;
    let count = 0;
    let r = 0,
      g = 0,
      b = 0;
    while (stack.length > 0) {
      [y, x] = stack.pop();
      groups.set(group, y, x);
      count++;

      // add to avg color
      // x,y to ImgData index:
      let flatIndex = (x + y * width) * 4;
      r += imgData.data[flatIndex] / 255.0;
      g += imgData.data[flatIndex + 1] / 255.0;
      b += imgData.data[flatIndex + 2] / 255.0;

      let neighbors = [
        [y, x + 1],
        [y, x - 1],
        [y + 1, x],
        [y - 1, x],
      ];

      neighbors.forEach(([yy, xx]) => {
        if (check(group, x, y, xx, yy)) {
          stack.push([yy, xx]);
        }
      });
    }
    const color = [r / count, g / count, b / count];
    return [count, color];
  };

  let numGroups = 1;
  // let validGroups = 0;
  const minSize = 500;
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      if (groups.get(y, x) == 0) {
        let [count, color] = expandCluster([y, x], numGroups);
        if (count > minSize) {
          // validGroups++;
          colors[numGroups] = color;
          sets[numGroups] = [];
          setSizes[numGroups] = count;
        }
        numGroups++;
      }
    }
  }

  // find the set of boundary pixels for each valid group
  for (let x = 1; x < width - 1; x++) {
    for (let y = 1; y < height - 1; y++) {
      const group = groups.get(y, x);
      if (group in colors) {
        const isBoundary =
          groups.get(y, x - 1) != group ||
          groups.get(y, x + 1) != group ||
          groups.get(y + 1, x) != group ||
          groups.get(y - 1, x) != group ||
          groups.get(y - 1, x - 1) != group ||
          groups.get(y + 1, x + 1) != group ||
          groups.get(y + 1, x - 1) != group ||
          groups.get(y - 1, x + 1) != group;
        if (isBoundary) {
          sets[group].push([x, y]);
        }
      }
    }
  }

  // overlay onto orig canvas
  const srcCanvas = document.getElementById(srcImgCanvasName);
  const ctx = srcCanvas.getContext("2d");
  ctx.putImageData(imgData, 0, 0);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      let group = groups.get(y, x);
      if (group in colors) {
        let [r, g, b] = hslToRgb(0.5 * (1 + Math.sin(group * 130.1)), 0.8, 0.9);
        ctx.fillStyle = `rgba(${r},${g},${b},0.7)`;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  // console.log(
  //   `there are ${Object.keys(sets).length} valid sets (sanity check ${
  //     Object.keys(colors).length
  //   })`
  // );
  PARAMS.numValidSubsets = Object.keys(sets).length;

  // and overlay boundaries
  for (let key in sets) {
    const set = sets[key];
    for (let i = 0; i < set.length; i++) {
      let [x, y] = set[i];
      ctx.fillStyle = `rgba(255,100,100,0.5)`;
      ctx.fillRect(x, y, 1, 1);
    }
  }

  return [sets, colors, setSizes];
};
