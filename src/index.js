import { handleImage } from "./image.js";
import { makePane } from "./config.js";
import { setupGL } from "./gl.js";
const [pane, fpsGraph] = makePane();

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
        const [lejaStack, A_nStack, centers, setSizes] = await handleImage(
          file
        );
        setupGL(lejaStack, A_nStack, centers, setSizes, fpsGraph);
      }
    }
  }
});
