import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin } from './isomorphic';

export default (config) => {
	config.merge({
		entry: [
			'babel-polyfill',
			path.join(__dirname, '../src/client/index.tsx'),
		],
	});

	config.plugin('uglify', Webpack.optimize.UglifyJsPlugin, [{
		comments: false,
		compress: true,
		mangle: true,
	}]);

	config.plugin('optimize', Webpack.optimize.OccurenceOrderPlugin, [
		true,
	]);

	config.plugin('ExtractTextPlugin', ExtractTextPlugin, [
		'style.css',
	]);

	config.loader('images', {
		loader: 'url',
		query: {
			limit: 10240,
		},
		test: plugin.regular_expression('images'),
	});

	config.loader('sass', {
		loader: ExtractTextPlugin.extract(
			'style',
			'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
			'postcss',
			'sass',
		),
		test: plugin.regular_expression('sass'),
	});

	config.loader('css', {
		loader: ExtractTextPlugin.extract(
			'style',
			'css!postcss',
		),
		test: plugin.regular_expression('css'),
	});

	config.loader('js', {
		exclude: /node_modules/,
		loader: 'babel',
		test: /\.jsx?$/,
	});

	config.loader('ts', {
		exclude: /node_modules/,
		loader: 'ts-loader',
		test: /\.tsx?$/,
	});

	return config;
};
