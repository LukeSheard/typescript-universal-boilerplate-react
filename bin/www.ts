import { server } from 'universal-webpack';
import webpackConfig, {
	universalWebpack,
} from '../webpack.config';

server(webpackConfig(process.env.NODE_ENV || 'development'), universalWebpack);
