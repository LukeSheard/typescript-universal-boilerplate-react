const path = require('path');

const NODE_ENV_DEV = 'development';

const config = {
	env: process.env.NODE_ENV || NODE_ENV_DEV,
	dev: ( process.env.NODE_ENV || NODE_ENV_DEV ) === NODE_ENV_DEV,
	server: {
		PORT: process.env.PORT || 8080,
	},
	universalWebpack: {
		exclude_from_externals: [
			'normalize.css',
		],
		server: {
			input: path.resolve(__dirname, '../src/server/index.ts'),
			output: path.resolve(__dirname, '../dist/server.js'),
		},
	},
};

module.exports = config;
