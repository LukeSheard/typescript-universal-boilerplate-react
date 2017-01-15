import { server } from 'universal-webpack';
import {
	NODE_ENV,
	universalWebpack,
} from '../config';
import webpackConfig from '../webpack.config';

server(webpackConfig(`${NODE_ENV}`), universalWebpack);
