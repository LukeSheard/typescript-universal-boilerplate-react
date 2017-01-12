import { server } from 'universal-webpack';
import { universalWebpack } from './config';
import webpackConfig from './webpack.config';

server(webpackConfig, universalWebpack);
