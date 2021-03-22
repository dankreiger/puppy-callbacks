import path from 'path';
import merge from 'webpack-merge';
import baseConfig from './webpack.base';
import webpackNodeExternals from 'webpack-node-externals';
import webpack from 'webpack';

const config = {
  // Inform webpack that we're building a bundle
  // for nodeJS, rather than for the browser
  target: 'node',

  // Tell webpack the root file of our
  // server application
  entry: './src/server/index.ts',

  // Tell webpack where to put the output file
  // that is generated
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  externals: [webpackNodeExternals()],
};

module.exports = merge(baseConfig, config);
