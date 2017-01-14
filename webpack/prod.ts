import * as ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as webpack from 'webpack';

export default function(serverSide: boolean = true) {
	const devConfig: webpack.Configuration = {
		/* ==============================
			ENTRY
			- Merge Babel Polyfill
		============================== */
		entry: [
			'babel-polyfill',
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
						fallbackLoader: 'style-loader',
						loader: 'css-loader',
					}),
					test: /\.css$/,
				},
				{
					exclude: /node_modules/,
					loader: ExtractTextPlugin.extract({
						fallbackLoader: 'style-loader',
						loader: {
							loader: 'css-loader',
							query: {
								localIdentName: '[hash:base64:5]',
								modules: true,
							},
						},
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
				allChunks: true,
				disable: serverSide,
				filename: 'style.min.css',
			}),
		],
	};

	return devConfig;
};
