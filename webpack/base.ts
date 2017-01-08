import * as cssnano from 'cssnano';
import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin } from './isomorphic';

export default (config) => {
	const directory = process.cwd();

	config.merge({
		context: path.join(__dirname, '..'),
		output: {
			filename: 'bundle.js',
			path: path.join(__dirname, '..', 'dist/static'),
			publicPath: '/static/',
		},
		plugins: [
			plugin,
		],
		resolve: {
			extensions: [
				'',
				'.js',
				'.jsx',
				'.ts',
				'.tsx',
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

	return config;
};
