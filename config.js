const path = require('path');

const config = {
	universalWebpack: {
		exclude_from_externals: [
			'normalize.css',
		],
		server: {
			input: path.resolve(__dirname, 'src/server/index.ts'),
			output: path.resolve(__dirname, 'dist/server.js'),
		},
	},
};

module.exports = config;
