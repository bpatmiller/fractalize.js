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
import { setupGL, toggleSourceDisplay } from "./gl.js";
import extractColors from "extract-colors";

tf.setBackend("webgl");
const imgParamUrl = handleUrl();
const [pane] = makePane();

const configuration = {
  models: {
    pascal: null,
    ade20k: null,
    cityscapes: null,
  },
  imgData: null,
  colorscheme: null,
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

export const segment = async () => {
  const imgData = configuration.imgData;

  const model = configuration.models[PARAMS.model];
  const { legend, segmentationMap } = await segmentImage(model, imgData);
  const [sets, _, setSizes] = await connectedSubsets(imgData, segmentationMap);
  const colors = getColorScheme(sets);
  const [complexPoints, centers] = getComplexPoints(
    sets,
    imgData.width,
    imgData.height
  );
  const lejaStack = getLejaPoints(complexPoints);
  const A_nStack = getA_nStack(lejaStack);
  setupGL(lejaStack, A_nStack, centers, colors, setSizes);
};

const init = async (imgUrl) => {
  for (let key in configuration.models) {
    if (configuration.models[key] == null) {
      configuration.models[key] = await loadModel(key);
    }
  }

  let { imgData } = await loadImage(imgUrl);
  configuration.colorscheme = await extractColors.extractColors(imgData, {
    distance: 0.2,
    splitPower: 14,
    saturationImportance: 0.23,
  });
  // console.log(configuration.colorscheme);
  configuration.imgData = imgData;
  segment();
};

// spacebar to fetch new random image
// q to clear context
document.addEventListener("keypress", (e) => {
  console.log(e);
  if (e.key == " ") {
    // init();
  } else if (e.key == "q") {
    // TODO
  }
});

const dropZone = document.getElementById("drop");
const clickZone = document.getElementById("fractal-container");
clickZone.addEventListener("click", () => {
  toggleSourceDisplay();
});

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

init(imgParamUrl);
