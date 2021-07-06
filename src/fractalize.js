import { Complex } from "complex.js";

export const getComplexPoints = () => {
  const canvas = document.getElementById("clustered");
  const ctx = canvas.getContext("2d");
  var imgData = ctx.getImageData(0, 0, canvas.clientWidth, canvas.clientHeight);
  console.log(ctx.clientHeight);
};

export const getLejaPoints = () => {
  return 0;
};
