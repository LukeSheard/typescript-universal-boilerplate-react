import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin as isomorphicPlugin } from './isomorphic';

export default (config) => {
	config.merge({
		debug: true,
		devtool: 'inline-source-map',
		entry: [
			'webpack-hot-middleware/client',
			path.join(__dirname, '../src/client/index.tsx'),
		],
	});

	config.plugin('hotmodule', Webpack.HotModuleReplacementPlugin);

	config.loader('sass', {
		loaders: [
			'style',
			'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
			'postcss',
			'sass',
		],
		test: isomorphicPlugin.regular_expression('sass'),
	});

	config.loader('css', {
		loaders: [
			'style',
			'css',
			'postcss',
		],
		test: isomorphicPlugin.regular_expression('css'),
	});

	config.loader('js', {
		exclude: /node_modules/,
		loaders: [
			'react-hot',
			'babel',
		],
		test: /\.jsx?$/,
	});

	config.loader('ts', {
		exclude: /node_modules/,
		loaders: [
			'ts-loader',
		],
		test: /\.tsx?$/,
	});

	return config;
};
