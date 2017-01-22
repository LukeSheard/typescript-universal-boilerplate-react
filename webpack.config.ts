import * as path from 'path';
import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';

import baseConfig from './config/webpack/config:base';
import deveConfig from './config/webpack/config:development';
import prodConfig from './config/webpack/config:production';

export const universalWebpack = {
	exclude_from_externals: [
		'sanitize.css',
	],
	server: {
		input: path.resolve(__dirname, 'src/server/index.ts'),
		output: path.resolve(__dirname, 'dist/server.js'),
	},
};

export default (env: string = '') => {
	const mode: string[] = env.split(':');
	const configs: webpack.Configuration[] = [
		baseConfig,
	];

	if (mode[0] === 'production') {
		configs.push(prodConfig(mode[1] === 'client'));
	} else {
		configs.push(deveConfig);
	}
	const webpackConfig = webpackMerge(configs);

	/* =======================
		 SET SERVER/CLIENT SIDE
	======================= */
	switch (mode[1]) {
		case 'client': {
			return clientConfiguration(webpackConfig, universalWebpack);
		}
		case 'server': {
			return serverConfiguration(webpackConfig, universalWebpack);
		}
		default: {
			return webpackConfig;
		}
	}
};
