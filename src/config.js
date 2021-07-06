import { Pane } from "tweakpane";

export const PARAMS = {
  outputSize: 260,
  minClusterSize: 0.03,
  numColors: 8,
};

export const makePane = () => {
  const pane = new Pane();

  pane.addInput(PARAMS, "outputSize", { min: 256, max: 1024, step: 1 });
  pane.addInput(PARAMS, "minClusterSize", { min: 0.01, max: 0.4 });
  pane.addInput(PARAMS, "numColors", { min: 2, max: 16, step: 1 });

  return pane;
};
