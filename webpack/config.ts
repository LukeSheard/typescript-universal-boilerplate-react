import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import webpackConfig from './base';
import universal from './universal';

export const settings = universal;

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
