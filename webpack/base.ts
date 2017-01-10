import * as path from 'path';
import * as webpack from 'webpack';

const outputPath = path.join(__dirname, '..', 'dist');

const config = {
	context: path.resolve(__dirname, '..'),
	entry: path.resolve(__dirname, '..', 'src/client'),
	module: {
		rules: [
			{
				exclude: /node_modules/,
				test: /\.jsx?$/,
				use: [
					'babel-loader',
				],
			},
			{
				exclude: /node_modules/,
				test: /\.tsx?$/,
				use: [
					'ts-loader',
				],
			},
			{
				test: /\.scss$/,
				use : [
					'style-loader',
					'css-loader?importLoaders=2&sourceMap',
					'postcss-loader',
					'sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true',
				],
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader?importLoaders=2&sourceMap',
					'postcss-loader',
				],
			},
			{
				test: /\.(jpg|png)$/,
				use: [
					'url-loader?limit=10000',
				],
			},
		],
	},
	output: {
		chunkFilename: '[name].[hash].js',
		filename: '[name].[hash].js',
		path: outputPath,
		publicPath: '/static/',
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true,
			options: {
					// A temporary workaround for `scss-loader`
					// https://github.com/jtangelder/sass-loader/issues/298
					output: {
							path: outputPath,
					},
			},
			test: /\.scss$/,
		}),
	],
	resolve: {
		alias: {
			common: path.resolve(__dirname, '../src/common'),
		},
		extensions: [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
		],
	},
};

export default config;
