import * as webpack from 'webpack';
// just in case you run into any typescript error when configuring `devServer`
import 'webpack-dev-server';

const config: webpack.Configuration = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  // Tell webpack to run babel on every file it runs through
  module: {
    rules: [
      {
        test: /\.js?$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      { test: /\.tsx?$/, loader: 'ts-loader' },
    ],
  },
};

export default config;
