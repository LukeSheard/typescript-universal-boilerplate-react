import * as cssnano from 'cssnano';
import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin as isomorphicPlugin } from './isomorphic';

export default (config) => {
	const directory = process.cwd();

	config.merge({
		context: path.join(__dirname, '..'),
		output: {
			filename: 'bundle.min.js',
			path: path.join(__dirname, '..', 'dist/static'),
			publicPath: '/static/',
		},
		resolve: {
			extensions: [
				'',
				'.js',
				'.jsx',
				'.ts',
				'.tsx',
				'.scss',
			],
			modulesDirectories: [
				`${directory}/src`,
				`${directory}/src/common`,
				'node_modules',
			],
		},
	});

	config.merge({
		postcss: [
			cssnano({
				autoprefixer: {
					add: true,
					browsers: [
						'last 3 versions',
						'ie >= 8',
						'> 2%',
					],
					remove: true,
				},
				discardComments: {
					removeAll: true,
				},
				discardDuplicates: true,
				safe: true,
				sourcemap: true,
			}),
		],
	});


	config.plugin('definePlugin', Webpack.DefinePlugin, [{
		'process.env': JSON.stringify({
			NODE_ENV: process.env.NODE_ENV,
		}),
	}]);

	config.merge({
		plugins: [
			isomorphicPlugin,
		],
	});

	config.loader('json', {
		loader: 'json',
		test: /.json$/,
	});

	config.loader('images', {
		loader: 'url',
		query: {
			limit: 10240,
		},
		test: isomorphicPlugin.regular_expression('images'),
	});

	config.loader('js', {
		exclude: /node_modules/,
		loader: 'babel',
		test: /\.jsx?$/,
	});

	config.loader('ts', {
		exclude: /node_modules/,
		loaders: [
			'babel',
			'ts-loader',
		],
		test: /\.tsx?$/,
	});

	return config;
};
