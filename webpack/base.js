import * as path from 'path';
import * as Webpack from 'webpack';
import * as WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin';

import webpackIsomorphicToolsConfig from './config';

const {
  NODE_ENV,
} = process.env;

const _ENV_ = NODE_ENV || 'development';
const _DEV_ = _ENV_ !== 'production';

const isomorphicPlugin = new WebpackIsomorphicToolsPlugin(webpackIsomorphicToolsConfig);
isomorphicPlugin.development(_DEV_);

export default (config) => {
  const directory = process.cwd();

  config.merge({
    output: {
      path: path.resolve(directory, 'dist'),
      filename: 'bundle.js',
      publicPath: '/static/',
    },
    resolve: {
      modulesDirectories: [
        `${directory}/src`,
        `${directory}/src/common`,
        'node_modules',
      ],
      extensions: [
        '',
        '.js',
        '.jsx',
				'.ts',
				'.tsx',
				'.scss',
      ],
    },
    plugins: [
      isomorphicPlugin,
    ],
  });

  config.plugin('definePlugin', Webpack.DefinePlugin, [{
    'process.env': JSON.stringify({
      NODE_ENV: _ENV_,
    }),
  }]);

  return config;
};
