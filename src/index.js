import { handleImage } from "./image.js";
import { makePane, PARAMS } from "./config.js";
import { setupGL } from "./gl.js";
const [pane, fpsGraph] = makePane();

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const imgParamUrl = urlParams.get("img");

const init = async (file) => {
  let ipu = null;
  if (file == null) {
    ipu = imgParamUrl;
  }

  const [lejaStack, A_nStack, centers, colors, setSizes] = await handleImage(
    file,
    ipu
  );
  setupGL(lejaStack, A_nStack, centers, colors, setSizes, fpsGraph);
};

const nC = urlParams.get("nc");
const nL = urlParams.get("nl");
if (nL != null) {
  PARAMS.numLejaPoints = parseInt(nL);
}
if (nC != null) {
  PARAMS.numColors = parseInt(nC);
}
if (imgParamUrl != null) {
  init(null, imgParamUrl);
}

const dropZone = document.getElementById("drop");

const clickContainer = document.getElementById("fractal-container");

clickContainer.addEventListener("click", (e) => {
  const fractalView = document.getElementById("fractal");
  const imageView = document.getElementById("resized");
  fractalView.classList.toggle("hidden");
  imageView.classList.toggle("hidden");
  console.log("e");
  e.preventDefault();
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
        init(file);
      }
    }
  }
});
