import * as path from 'path';
import * as Webpack from 'webpack';
import isomorphicPlugin from './isomorphicPlugin';

export default (config) => {
  config.merge({
    devtool: 'inline-source-map',
    debug: true,
    entry: [
      'webpack-hot-middleware/client',
			path.join(__dirname, '../src/client/index.tsx'),
    ]
  });

  config.plugin('hotmodule', Webpack.HotModuleReplacementPlugin);

  config.loader('images', {
    test: isomorphicPlugin.regular_expression('images'),
    loader: 'url',
    query: {
      limit: 10240,
    },
  });

  config.loader('sass', {
    test: isomorphicPlugin.regular_expression('sass'),
    loaders: [
      'style',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
      'postcss',
      'sass',
    ],
  });

  config.loader('css', {
    test: isomorphicPlugin.regular_expression('css'),
    loaders: [
      'style',
      'css',
      'postcss',
    ],
  });

  config.loader('js', {
    test: /\.jsx?$/,
    loaders: [
      'react-hot',
      'babel',
    ],
    exclude: /node_modules/,
  });

	config.loader('ts', {
    test: /\.tsx?$/,
    loaders: [
      'react-hot',
      'ts-loader',
    ],
    exclude: /node_modules/,
  });

  return config;
};
