import * as path from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV_MODE = NODE_ENV === 'development';

export const universalWebpack = {
	exclude_from_externals: [
		'normalize.css',
	],
	server: {
		input: path.resolve(__dirname, '../src/server/index.ts'),
		output: path.resolve(__dirname, '../dist/server.js'),
	},
};

export default {
	DEV_MODE,
	NODE_ENV,
	universalWebpack,
};
