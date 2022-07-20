const withTM = require("next-transpile-modules")([
  "@academy-manager/ui"
]);

module.exports = withTM({
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });
    return config;
  }
});
