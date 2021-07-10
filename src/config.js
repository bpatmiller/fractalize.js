import { Pane } from "../_snowpack/pkg/tweakpane.js";
import { animate, updateControlUniforms } from "./gl.js";
import { segment, computeFractal } from "./index.js";

export const PARAMS = {
  playing: true,
  model: "",
  outputSize: 260,
  numValidSubsets: "",
  scale: 1.0,
  focus: { x: 0.0, y: 0.0 },
  numLejaPoints: 32,
  maxIterations: 8,
};

export const makePane = () => {
  const pane = new Pane({
    container: document.getElementById("settingsPanel"),
    title: "Parameters",
    expanded: false,
  });

  PARAMS.outputSize = 513;

  pane
    .addInput(PARAMS, "model", {
      options: {
        ade20k: "ade20k",
        pascal: "pascal",
        cityscapes: "cityscapes",
      },
    })
    .on("change", (ev) => {
      segment();
    });
  pane.addInput(PARAMS, "playing").on("change", (ev) => {
    animate();
  });
  pane
    .addInput(PARAMS, "numLejaPoints", { min: 4, max: 64, step: 1 })
    .on("change", () => {
      computeFractal();
    });
  pane.addSeparator();

  pane
    .addInput(PARAMS, "maxIterations", { min: 4, max: 64, step: 1 })
    .on("change", (ev) => {
      updateControlUniforms();
      animate();
    });
  pane
    .addInput(PARAMS, "scale", { min: 0.5, max: 1000.0, step: 0.1 })
    .on("change", (ev) => {
      updateControlUniforms();
      animate();
    });
  pane
    .addInput(PARAMS, "focus", { picker: "inline", expanded: false })
    .on("change", (ev) => {
      updateControlUniforms();
      animate();
    });
  pane.addSeparator();

  pane.addMonitor(PARAMS, "numValidSubsets");

  return [pane];
};
