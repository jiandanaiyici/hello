const path = require('path');

module.exports = {
  entry: "./src/main.js",
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build')
  }
};
