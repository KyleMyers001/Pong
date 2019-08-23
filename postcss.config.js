const postcssimport = require('postcss-import');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    postcssimport,
    postcssPresetEnv()
  ]
}