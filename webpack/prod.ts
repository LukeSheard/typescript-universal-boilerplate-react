import * as path from 'path';
import * as Webpack from 'webpack';
import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import isomorphicPlugin from './isomorphicPlugin';

export default (config) => {
  config.merge({
    entry: [
			'babel-polyfill',
			path.join(__dirname, '../src/client/index.tsx'),
		]
  });

  config.plugin('uglify', Webpack.optimize.UglifyJsPlugin, [{
    mangle: true,
    comments: false,
    compress: true
  }]);

  config.plugin('optimize', Webpack.optimize.OccurenceOrderPlugin, [
    true,
  ]);

  config.plugin('ExtractTextPlugin', ExtractTextPlugin, [
    'style.css',
  ]);

  config.loader('images', {
    test: isomorphicPlugin.regular_expression('images'),
    loader: 'url',
    query: {
      limit: 10240,
    },
  });

  config.loader('sass', {
    test: isomorphicPlugin.regular_expression('sass'),
    loader: ExtractTextPlugin.extract(
      'style',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
			'postcss',
			'sass',
    ),
  });

  config.loader('css', {
    test: isomorphicPlugin.regular_expression('css'),
    loader: ExtractTextPlugin.extract(
      'style',
      'css!postcss'
    ),
  });

  config.loader('js', {
    test: /\.jsx?$/,
    loader: 'babel',
    exclude: /node_modules/,
  });

	config.loader('ts', {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    exclude: /node_modules/,
  });

  return config;
};
