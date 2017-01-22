import 'babel-polyfill';
import { server } from 'universal-webpack';
import webpackConfig, {
	universalWebpack,
} from '../webpack.config';

// Start Server
server(webpackConfig('development'), universalWebpack);
