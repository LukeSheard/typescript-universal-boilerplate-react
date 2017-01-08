import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin } from './isomorphic';

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

	config.loader('images', {
		loader: 'url',
		query: {
			limit: 10240,
		},
		test: plugin.regular_expression('images'),
	});

	config.loader('sass', {
		loaders: [
			'style',
			'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
			'postcss',
			'sass',
		],
		test: plugin.regular_expression('sass'),
	});

	config.loader('css', {
		loaders: [
			'style',
			'css',
			'postcss',
		],
		test: plugin.regular_expression('css'),
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
			'react-hot',
			'ts-loader',
		],
		test: /\.tsx?$/,
	});

	return config;
};
