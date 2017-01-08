import * as WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import webpackIsomorphicToolsConfig from './config';

const {
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);
isomorphicPlugin.development(_DEV_);

export default isomorphicPlugin;
