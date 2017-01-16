const path = require('path');

const config = {
	env: process.env.NODE_ENV || 'development',
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
module.exports.default = config;
