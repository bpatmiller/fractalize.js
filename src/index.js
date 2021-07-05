import * as gm from "gammacv";
import { getExtensionMatch } from "snowpack/lib/util";

const canvas = document.getElementById("resized");
const ctx = canvas.getContext("2d");

// const getHeightAndWidthFromDataUrl = (dataURL) =>
//   new Promise((resolve) => {
//     const img = new Image();
//     img.onload = () => {
//       resolve({
//         height: img.height,
//         width: img.width,
//       });
//     };
//     img.src = dataURL;
//   });

const drawCanvasFromURL = (dataURL) =>
  new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      let mainAxis = Math.max(img.width, img.height);
      let w = Math.floor(img.width * (400 / mainAxis));
      let h = Math.floor(img.height * (400 / mainAxis));
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

var dropZone = document.getElementById("drop");

dropZone.addEventListener("dragover", function (e) {
  this.classList.add("dragging");
  e.preventDefault();
});

dropZone.addEventListener("dragleave", function (e) {
  this.classList.remove("dragging");
  e.preventDefault();
});

dropZone.addEventListener("drop", function (e) {
  this.classList.remove("dragging");
  e.preventDefault();
  if (e.dataTransfer.items) {
    for (var i = 0; i < e.dataTransfer.items.length; i++) {
      if (
        e.dataTransfer.items[i].kind === "file" &&
        e.dataTransfer.items[i].type.match("^image/")
      ) {
        var file = e.dataTransfer.items[i].getAsFile();
        handleImage(file);
      }
    }
  }
});

const handleImage = async (file) => {
  const srcImgUrl = URL.createObjectURL(file);
  const dim = await drawCanvasFromURL(srcImgUrl);
  console.log(dim);

  let imgT = new gm.Tensor("uint8", [dim.width, dim.height, 4]);
  gm.canvasToTensor(canvas, imgT);

  //   const op = gm.colorSegmentation(imgT, 4);
  //   const out = gm.tensorFrom(op);
  //   const sess = new gm.Session();
  //   sess.init(op);
  //   sess.runOp(op, 0, out);
  //   gm.canvasFromTensor(canvas, out);
};
