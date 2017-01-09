import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as Webpack from 'webpack';
import { plugin as isomorphicPlugin } from './isomorphic';

export default (config) => {
	config.merge({
		entry: [
			'babel-polyfill',
			path.join(__dirname, '../src/client/index.tsx'),
		],
	});

	config.plugin('uglify', Webpack.optimize.UglifyJsPlugin, [{
		comments: false,
		compress: true,
		mangle: true,
	}]);

	config.plugin('optimize', Webpack.optimize.OccurenceOrderPlugin, [
		true,
	]);

	config.plugin('ExtractTextPlugin', ExtractTextPlugin, [
		'style.min.css',
	]);

	config.loader('sass', {
		loader: ExtractTextPlugin.extract(
			'style',
			'css?modules&localIdentName=[path][name]__[local]--[hash:base64:3]!postcss!sass',
		),
		test: isomorphicPlugin.regular_expression('sass'),
	});

	config.loader('css', {
		loader: ExtractTextPlugin.extract(
			'style',
			'css-loader?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss',
		),
		test: isomorphicPlugin.regular_expression('css'),
	});

	return config;
};
