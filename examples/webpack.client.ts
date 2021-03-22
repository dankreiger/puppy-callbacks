import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';

const config = {
  // Tell webpack the root file of our
  // client application
  entry: './src/client/index.tsx',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
  },
};

module.exports = merge(baseConfig, config);
