import {
  connectedSubsets,
  loadImage,
  loadModel,
  segmentImage,
} from "./image.js";
import { makePane, PARAMS } from "./config.js";
import * as tf from "../_snowpack/pkg/@tensorflow/tfjs-core.js";
import "../_snowpack/pkg/@tensorflow/tfjs-backend-webgl.js";
import { handleUrl } from "./url.js";
import { getLejaPoints, getComplexPoints, getA_nStack } from "./fractalize.js";
import { setupGL } from "./gl.js";

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
};

export const segment = async () => {
  const imgData = configuration.imgData;

  const model = configuration.models[PARAMS.model];
  const { legend, segmentationMap } = await segmentImage(model, imgData);
  const [sets, colors, setSizes] = await connectedSubsets(
    imgData,
    segmentationMap
  );

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

const clickContainer = document.getElementById("fractal-container");

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
