import { PARAMS } from "./config.js";
import catImage from "../assets/cat.jpeg.proxy.js";

export const randomImageUrl = "https://source.unsplash.com/random";

export const handleUrl = () => {
  // return either the url image or a random unsplash image url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let imgParamUrl = urlParams.get("img");

  // num lejas, max iterations, show source image
  const nL = urlParams.get("nl");
  const mI = urlParams.get("mi");
  const sI = urlParams.get("si");

  if (nL != null) {
    PARAMS.numLejaPoints = parseInt(nL);
  }
  if (mI != null) {
    PARAMS.maxIterations = parseInt(mI);
  }
  if (sI == "false") {
    const sourceCanvas = document.getElementById("source");
    sourceCanvas.classList.add("hidden");
  }

  if (imgParamUrl == null) {
    imgParamUrl = catImage;
  }
  return imgParamUrl;
};
