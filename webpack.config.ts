import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';

import * as config from './config';
import baseConfig from './config/webpack/config:base';
import deveConfig from './config/webpack/config:development';
import prodConfig from './config/webpack/config:production';

export default (env: string) => {
	const mode: string[] = env.split(':');
	const configs: webpack.Configuration[] = [
		baseConfig,
	];

	/* =======================
		 SET MODE
	======================= */
	switch (mode[0]) {
		case 'development': {
			configs.push(deveConfig);
			break;
		}
		case 'production': {
			configs.push(prodConfig(mode));
			break;
		}
		default: {
			configs.push(deveConfig);
		}
	}
	const webpackConfig = webpackMerge(configs);

	/* =======================
		 SET SERVER/CLIENT SIDE
	======================= */
	switch (mode[1]) {
		case 'client': {
			const returnConfig = clientConfiguration(webpackConfig, config.universalWebpack);;
			return returnConfig;
		}
		case 'server': {
			return serverConfiguration(webpackConfig, config.universalWebpack);
		}
		default: {
			return webpackConfig;
		}
	}
};
