import { server } from 'universal-webpack';
import {
	NODE_ENV,
	PORT,
	universalWebpack,
} from '../config';
import webpackConfig from '../webpack.config';

server(webpackConfig(`${NODE_ENV}:default`), universalWebpack).listen(PORT);
