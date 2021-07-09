import { PARAMS } from "./config";

export const handleUrl = () => {
  // return either the url image or a random unsplash image url
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  let imgParamUrl = urlParams.get("img");

  // num Colors (deprecated), num lejas, max iterations
  const nC = urlParams.get("nc");
  const nL = urlParams.get("nl");
  const mI = urlParams.get("mi");
  if (nC != null) {
    PARAMS.numColors = parseInt(nC);
  }
  if (nL != null) {
    PARAMS.numLejaPoints = parseInt(nL);
  }
  if (mI != null) {
    PARAMS.maxIterations = parseInt(mI);
  }

  if (imgParamUrl == null) {
    imgParamUrl =
      "https://source.unsplash.com/random?eagle,lion,frog,mosque,cathedral";
  }

  return imgParamUrl;
};
