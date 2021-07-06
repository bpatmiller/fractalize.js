// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: ["**/node_modules/**/*", "**/LICENSE"],
  mount: {
    /* ... */
  },
  plugins: [["@snowpack/plugin-webpack"]],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    baseUrl: "/fractalize.js/",
  },
};
