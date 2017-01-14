import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as path from 'path';
import * as webpack from 'webpack';

export default function(mode: string[]): webpack.Configuration {
	const prodConfig: webpack.Configuration = {
		/* ==============================
			ENTRY
			- Merge Babel Polyfill
		============================== */
		entry: [
			'babel-polyfill',
			path.resolve(__dirname, '..', 'src', 'client'),
		],


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
			chunkFilename: '[chunkhash].min.js',
			filename: '[hash].min.js',
			publicPath: '/static/',
		},

		/* ==============================
			PLUGINS
			- Extract CSS into file
		============================== */
		plugins: [
			new ExtractTextPlugin({
				disable: mode[1] === 'server',
				filename: 'style.min.css',
			}),
		],
	};

	return prodConfig;
}
