import { handleImage } from "./image.js";
import { makePane, PARAMS } from "./config.js";
import { setupGL } from "./gl.js";
const [pane, fpsGraph] = makePane();

const init = async (file) => {
  const [lejaStack, A_nStack, centers, colors, setSizes] = await handleImage(
    file,
    imgParamUrl
  );
  setupGL(lejaStack, A_nStack, centers, colors, setSizes, fpsGraph);
};

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const imgParamUrl = urlParams.get("img");
const nC = urlParams.get("nc");
if (nC != null) {
  PARAMS.numColors = parseInt(nC);
}
if (imgParamUrl != null) {
  init(null, imgParamUrl);
}

var dropZone = document.getElementById("drop");

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
