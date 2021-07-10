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
import {
  animate,
  setupGL,
  toggleSourceDisplay,
  updateControlUniforms,
} from "./gl.js";
import extractColors from "../_snowpack/pkg/extract-colors.js";
let ticking = false;

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

export const computeFractal = () => {
  const lejaStack = getLejaPoints(configuration.complexPoints);
  const A_nStack = getA_nStack(lejaStack);
  setupGL(
    lejaStack,
    A_nStack,
    configuration.centers,
    configuration.colors,
    configuration.setSizes
  );
};

export const segment = async () => {
  const imgData = configuration.imgData;

  const model = configuration.models[PARAMS.model];
  const { legend, segmentationMap } = await segmentImage(model, imgData);
  const [sets, _, setSizes] = await connectedSubsets(imgData, segmentationMap);
  configuration.setSizes = setSizes;
  configuration.colors = getColorScheme(sets);
  const [complexPoints, centers] = getComplexPoints(
    sets,
    imgData.width,
    imgData.height
  );

  configuration.complexPoints = complexPoints;
  configuration.centers = centers;
  computeFractal();
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

// document.addEventListener("onpointerdown", (e) => {
//   scaling = true;
//   console.log(e);
// });

document.addEventListener(
  "mousewheel",
  (e) => {
    if (!ticking) {
      if (e.ctrlKey) {
        ticking = true;
        requestAnimationFrame(() => {
          let newScale = PARAMS.scale - e.deltaY * 0.025;
          PARAMS.scale = Math.max(0.1, Math.min(100.0, newScale));
          updateControlUniforms();
          if (!PARAMS.playing) animate();
          ticking = false;
        });
      }
    }

    e.preventDefault();
  },
  { passive: false }
);

init(imgParamUrl);
