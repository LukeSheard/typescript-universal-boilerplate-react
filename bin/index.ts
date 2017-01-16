import { server } from 'universal-webpack';
import * as config from '../config';
import webpackConfig from '../webpack.config';

server(webpackConfig(`develop`), config.universalWebpack);
