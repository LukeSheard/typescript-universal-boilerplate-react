import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

export default function(mode: string[]): webpack.Configuration {
	const prodConfig: webpack.Configuration = {
		/* ==============================
				ENTRY
			============================== */
		entry: {
			application: [
				'babel-polyfill',
				path.resolve(__dirname, '../..', 'src', 'client'),
			],
		},

		/* ==============================
			MODULE
			- Use inline style loader
		============================== */
		module: {
			rules: [
				{
					include: /node_modules/,
					loader: ExtractTextPlugin.extract({
						loader: 'css-loader',
					}),
					test: /\.css$/,
				},
				{
					exclude: /node_modules/,
					loader: ExtractTextPlugin.extract({
						loader: 'css-loader?modules&localIndentName=[hash:base64:5]',
					}),
					test: /\.css$/,
				},
			],
		},

		/* ==============================
			OUTPUT LOCATION
			- Use local server location
		============================== */
		output: {
			chunkFilename: '[hash].[id].min.js',
			filename: '[hash].min.js',
			publicPath: '/static/',
		},

		/* ==============================
			PLUGINS
			- Extract CSS into file
		============================== */
		plugins: [
			new webpack.optimize.CommonsChunkPlugin({
				filename: '[hash].common.min.js',
				minChunks: 3,
				name: 'common',
			}),
			new webpack.optimize.OccurrenceOrderPlugin(false),
			new ExtractTextPlugin({
				disable: mode[1] === 'server',
				filename: '[hash].min.css',
			}),
		],
	};

	return prodConfig;
}
