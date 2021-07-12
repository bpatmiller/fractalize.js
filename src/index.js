import {
  connectedSubsets,
  loadImage,
  loadModel,
  segmentImage,
} from "./image.js";
import { makePane, PARAMS } from "./config.js";
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import { handleUrl } from "./url";
import { getLejaPoints, getComplexPoints, getA_nStack } from "./fractalize.js";
import {
  animate,
  setupGL,
  toggleSourceDisplay,
  updateControlUniforms,
} from "./gl.js";
import extractColors from "extract-colors";
import { LoadingPane } from "./loadingPane";

export let loading = true;
let ticking = false;
const imgParamUrl = handleUrl();
makePane();
const loadingPane = new LoadingPane();

tf.setBackend("webgl");

let configuration = {
  models: {
    pascal: null,
    ade20k: null,
    cityscapes: null,
  },
  imgData: null,
  colorscheme: null,
  complexPoints: null,
  centers: null,
};

const getColorScheme = (sets) => {
  let colors = {};
  let colorCt = 0;
  let numColors = configuration.colorscheme.length;
  for (let key in sets) {
    let colorIndex = colorCt % numColors;
    let color = configuration.colorscheme[colorIndex];
    colors[key] = [color.red / 255.0, color.green / 255.0, color.blue / 255.0];
    colorCt++;
  }
  return colors;
};

export const computeFractal = (complexPoints, centers, setSizes, colors) => {
  loadingPane.sendMessage("generating leja points");
  const lejaStack = getLejaPoints(complexPoints);
  const A_nStack = getA_nStack(lejaStack);
  loadingPane.sendMessage("setting up renderer");
  setupGL(lejaStack, A_nStack, centers, colors, setSizes);
  loadingPane.clear();
  loading = false;
};

export const segment = async (imgDataInput = null) => {
  loadingPane.sendMessage("segmenting image");
  const imgData = imgDataInput == null ? configuration.imgData : imgDataInput;
  const model = configuration.models[PARAMS.model];
  const { segmentationMap } = await segmentImage(model, imgData);
  loadingPane.sendMessage("finding closed jordan curves");
  const [sets, setSizes] = await connectedSubsets(imgData, segmentationMap);
  const colors = getColorScheme(sets);
  const [complexPoints, centers] = getComplexPoints(
    sets,
    imgData.width,
    imgData.height
  );

  computeFractal(complexPoints, centers, setSizes, colors);
};

export const init = async (imgUrl) => {
  loading = true;
  loadingPane.sendMessage("loading image");
  const { imgData } = await loadImage(imgUrl);
  loadingPane.sendMessage("loading tensorflow models");
  for (let key in configuration.models) {
    if (configuration.models[key] == null) {
      configuration.models[key] = await loadModel(key);
    }
  }

  loadingPane.sendMessage("extracting colorscheme");
  configuration.colorscheme = await extractColors.extractColors(imgData, {
    distance: 0.2,
    splitPower: 14,
    saturationImportance: 0.23,
  });

  configuration.imgData = imgData;
  await segment(imgData);
};

// spacebar to fetch new random image
// q to clear context
document.addEventListener("keypress", (e) => {
  if (e.key == " ") {
    PARAMS.playing = !PARAMS.playing;
    if (PARAMS.playing) animate();
    e.preventDefault();
  } else if (e.key == "s") {
    toggleSourceDisplay();
  }
});

const dropZone = document.getElementById("drop");

dropZone.addEventListener("dragover", function (e) {
  this.classList.add("dragging");
  e.preventDefault();
});

dropZone.addEventListener("dragleave", function (e) {
  this.classList.remove("dragging");
  e.preventDefault();
});

dropZone.addEventListener("drop", async function (e) {
  this.classList.remove("dragging");
  e.preventDefault();
  if (e.dataTransfer.items) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      if (
        e.dataTransfer.items[i].kind === "file" &&
        e.dataTransfer.items[i].type.match("^image/")
      ) {
        var file = e.dataTransfer.items[i].getAsFile();
        init(URL.createObjectURL(file));
      }
    }
  }
});

document.addEventListener(
  "mousewheel",
  (e) => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        let zoomFac = 1.0 + e.deltaY * 0.1;
        let newScale = zoomFac * PARAMS.scale;
        PARAMS.scale = Math.max(0.5, Math.min(1000.0, newScale));
        updateControlUniforms();
        if (!PARAMS.playing) animate();
        ticking = false;
      });
    }
    e.preventDefault();
  },
  { passive: false }
);

init(imgParamUrl);
