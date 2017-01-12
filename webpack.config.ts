import {
	clientConfiguration,
	serverConfiguration,
} from 'universal-webpack';
import {
	DEV_MODE,
	universalWebpack as settings,
} from './config';

import webpackConfig from './webpack';

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

if (!DEV_MODE) {
	config = webpackConfig;
}

export default config;
