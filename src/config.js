import { Pane } from "../_snowpack/pkg/tweakpane.js";
import { animate, updateControlUniforms } from "./gl.js";
import * as EssentialsPlugin from "../_snowpack/pkg/@tweakpane/plugin-essentials.js";
import { segment, computeFractal } from "./index.js";

export const PARAMS = {
  playing: true,
  model: "",
  outputSize: 260,
  minClusterSize: 0.02,
  numColors: 4,
  numValidSubsets: "",
  edgePoints: "",
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
  pane.registerPlugin(EssentialsPlugin);

  PARAMS.outputSize = Math.floor(
    513 //Math.min(513, 0.85 * Math.min(window.innerHeight, window.innerWidth))
  );

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
  // pane.addInput(PARAMS, "outputSize", { min: 256, max: 1024, step: 1 });
  // pane.addInput(PARAMS, "minClusterSize", {
  //   min: 0.005,
  //   max: 0.4,
  //   step: 0.005,
  // });
  // pane.addInput(PARAMS, "numColors", { min: 2, max: 16, step: 1 });
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
    .addInput(PARAMS, "scale", { min: 0.1, max: 250.0, step: 0.1 })
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
  // pane.addMonitor(PARAMS, "edgePoints");
  // pane.addSeparator();
  // fpsGraph = pane.addBlade({
  //   view: "fpsgraph",
  //   label: "fpsgraph",
  // });
  return [pane];
};
