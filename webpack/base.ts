import * as path from 'path';

const outputPath = path.join(__dirname, '..', 'dist/static');

const config = {
	context: path.resolve(__dirname, '..'),
	devtool: 'source-map',
	entry: path.resolve(__dirname, '..', 'src/client'),
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
				include: /node_modules/,
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						query: {
							sourceMap: true,
						},
					},
				],
			},
			{
				exclude: /node_modules/,
				test: /\.css$/,
				use: [
					{ loader: 'style-loader' },
					{
						loader: 'css-loader',
						query: {
							localIdentName: '[path][name]---[local]---[hash:base64:5]',
							modules: true,
							sourceMap: true,
						},
					},
				],
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
	output: {
		chunkFilename: '[name].js',
		filename: '[name].[hash].js',
		path: outputPath,
		publicPath: 'http://localhost:8081/static/',
	},
	performance: {
		hints: false,
	},
	resolve: {
		alias: {
			common: path.resolve(__dirname, '../src/common'),
			server: path.resolve(__dirname, '../src/server'),
		},
		extensions: [
			'.js',
			'.jsx',
			'.ts',
			'.tsx',
		],
	},
	stats: 'errors-only',
};

export default config;
