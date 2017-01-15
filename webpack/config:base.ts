import * as path from 'path';
import * as webpack from 'webpack';

const baseConfig: webpack.Configuration = {
	// Base Path of the Project
	context: path.resolve(__dirname, '..'),

	/* ==============================
			ENTRY
		============================== */
	entry: {
		application: path.resolve(__dirname, '..', 'src', 'client'),
	},

	/* ===================
		MODULE LOADERS 
	=================== */
	module: {
		rules: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader',
				test: /\.jsx?$/,
			},
			{
				exclude: /node_modules/,
				loader: 'ts-loader',
				test: /\.tsx?$/,
			},
			{
				loader: 'url-loader',
				query: {
					limit: 10000,
				},
				test: /\.(jpg|png)$/,
			},
		],
	},

	/* ===================
		OUPUT LOCATION
	=================== */
	output: {
		path: path.join(__dirname, '..', 'dist/static'),
	},

	plugins: [
		new webpack.optimize.CommonsChunkPlugin({
			filename: '[name].js',
			minChunks: 3,
			name: 'common',
		}),
	],

	resolve: {
		alias: {
			common: path.resolve(__dirname, '../src/common'),
			components: path.resolve(__dirname, '../src/common/components'),
			config: path.resolve(__dirname, '../config'),
			server: path.resolve(__dirname, '../src/server'),
		},
		extensions: [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
			'.css',
		],
	},
};

export default baseConfig;
