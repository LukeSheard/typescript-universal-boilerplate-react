import * as fs from 'fs';
import * as path from 'path';
import { plugin } from './isomorphic';

const nodeModules = {};
fs.readdirSync('node_modules')
	.filter((x) => ['.bin'].indexOf(x) === -1)
	.forEach((mod) => {
		nodeModules[mod] = 'commonjs ' + mod;
	});

export default (config) => {
	config.merge({
		entry: path.join(__dirname, '../src/server'),
		externals: nodeModules,
		node: {
			Buffer: false,
			__dirname: false,
			__filename: false,
			console: false,
			global: false,
			process: false,
		},
		output: {
			filename: 'server.js',
			libraryTarget: 'commonjs2',
			path: path.resolve('./dist'),
		},
		target: 'node',
	});

	config.loader('sass', {
		loaders: [
			'isomorphic-style-loader',
			'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]!postcss!sass',
		],
		test: plugin.regular_expression('sass'),
	});

	config.loader('css', {
		loaders: [
			'isomorphic-style-loader',
			'css',
			'postcss',
		],
		test: plugin.regular_expression('css'),
	});

	return config;
};
