import * as fs from 'fs';
import * as path from 'path';
import isomorphicPlugin from './isomorphicPlugin';

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

export default (config) => {
	config.merge({
    externals: nodeModules,
		target: 'node',

		entry: path.join(__dirname, '../src/server'),

		output: {
			path: path.resolve('./dist'),
			filename: 'server.js',
			libraryTarget: 'commonjs2'
		},

		plugins: [],

		node: {
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: false,
			__dirname: false
		}
  });

	config.loader('json', {
		test: /.json$/,
		loader: 'json',
	});

	config.loader('images', {
    test: isomorphicPlugin.regular_expression('images'),
    loader: 'url',
    query: {
      limit: 10240,
    },
  });

  config.loader('sass', {
    test: isomorphicPlugin.regular_expression('sass'),
    loaders:[
			'isomorphic-style-loader',
      'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]',
			'postcss',
			'sass',
		],
  });

  config.loader('css', {
    test: isomorphicPlugin.regular_expression('css'),
    loaders:[
      'isomorphic-style-loader',
      'css',
			'postcss'
		],
  });

	config.loader('js', {
		test: /\.jsx?$/,
		loader: 'babel'
	});

	config.loader('ts', {
		test: /\.tsx?$/,
		loader: 'ts-loader',
		exclude: /node_modules/
	});

  return config;
};
