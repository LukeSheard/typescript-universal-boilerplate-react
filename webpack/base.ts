import * as path from 'path';
import * as Webpack from 'webpack';
import isomorphicPlugin from './isomorphicPlugin';

export default (config) => {
  const directory = process.cwd();

  config.merge({
		context: path.join(__dirname, '..'),
    output: {
      path: path.join(__dirname, '..', 'dist/static'),
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
      ],
    },
    plugins: [
      isomorphicPlugin,
    ],
  });

  config.plugin('definePlugin', Webpack.DefinePlugin, [{
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
    }),
  }]);

  return config;
};
