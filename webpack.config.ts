import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import * as webpack from 'webpack';
import * as webpackMerge from 'webpack-merge';
import {
	universalWebpack,
} from './config';

import baseConfig from './webpack/base';
import devConfig from './webpack/dev';
import prodConfig from './webpack/prod';

export default (env: string) => {
	const mode: string[] = env.split(':');
	const configs: webpack.Configuration[] = [
		baseConfig,
	];

	/* =======================
		 SET MODE
	======================= */
	switch (mode[0]) {
		case 'dev': {
			configs.push(devConfig);
			break;
		}
		case 'prod': {
			configs.push(prodConfig(mode));
			break;
		}
		default: {
			configs.push(devConfig);
		}
	}
	const webpackConfig = webpackMerge(configs);

	/* =======================
		 SET SERVER/CLIENT SIDE
	======================= */
	switch (mode[1]) {
		case 'client': {
			const returnConfig = clientConfiguration(webpackConfig, universalWebpack);;
			return returnConfig;
		}
		case 'server': {
			return serverConfiguration(webpackConfig, universalWebpack);
		}
		default: {
			return webpackConfig;
		}
	}
};
