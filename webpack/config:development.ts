import * as webpack from 'webpack';

const deveConfig: webpack.Configuration = {
	/* ==============================
		 DEV TOOL
		 - Use inline dev tool
	============================== */
	devtool: 'inline-source-map',

	/* ==============================
		 MODULE
		 - Use inline style loader
	============================== */
	module: {
		rules: [
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
		],
	},

	/* ==============================
		 OUTPUT LOCATION
		 - Use dev server location
	============================== */
	output: {
		chunkFilename: '[name].js',
		filename: '[name].bundle.js',
		publicPath: 'http://localhost:8081/static/',
	},
};

export default deveConfig;
