import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import {
	universalWebpack,
} from '../config';
import webpackConfig from './base';

export const settings = universalWebpack;

let config;
switch (process.env.WEBPACK_MODE) {
	case 'server': {
		config = serverConfiguration(webpackConfig, settings);
		break;
	}
	default: {
		config = clientConfiguration(webpackConfig, settings);
	}
}

export default config;
