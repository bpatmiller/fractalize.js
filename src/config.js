import { Pane } from "tweakpane";

export const PARAMS = {
  outputSize: 260,
  minClusterSize: 0.03,
  numColors: 6,
  numValidSubsets: "",
  edgePoints: "",
  scale: 1.0,
  origin: { x: 0.0, y: 0.0 },
  numLejaPoints: 16,
  maxIterations: 64,
};

export const makePane = () => {
  const pane = new Pane({
    // container: document.getElementById("settingsPanel"),
  });

  PARAMS.outputSize = Math.floor(window.innerWidth / 2) - 64;

  pane.addInput(PARAMS, "outputSize", { min: 256, max: 1024, step: 1 });
  pane.addInput(PARAMS, "minClusterSize", { min: 0.01, max: 0.4 });
  pane.addInput(PARAMS, "numColors", { min: 2, max: 16, step: 1 });
  pane.addInput(PARAMS, "numLejaPoints", { min: 4, max: 32, step: 1 });
  pane.addInput(PARAMS, "maxIterations", { min: 4, max: 128, step: 1 });
  pane.addInput(PARAMS, "scale", { min: 0.1, max: 10.0, step: 0.1 });
  pane.addInput(PARAMS, "origin", { picker: "inline", expanded: false });
  pane.addMonitor(PARAMS, "numValidSubsets");
  pane.addMonitor(PARAMS, "edgePoints");
  return pane;
};
