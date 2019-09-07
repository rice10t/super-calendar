const path = require('path');

module.exports = {
  entry: './src/index.js',
  module: {
      rules:[{

    }]
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
};