import * as envalid from 'envalid';
import { server } from 'universal-webpack';
import webpackConfig, {
	universalWebpack,
} from '../webpack.config';

// Load Local Config File
process.env = envalid.cleanEnv(process.env, {
	PORT: envalid.num({
		default: 8080,
		desc: 'Server local port',
	}),
});

// Start Server
server(webpackConfig(process.env.NODE_ENV), universalWebpack);
