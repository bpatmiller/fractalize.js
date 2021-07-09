// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  exclude: ["**/node_modules/**/*", "**/LICENSE", "**/deploy.sh"],
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
