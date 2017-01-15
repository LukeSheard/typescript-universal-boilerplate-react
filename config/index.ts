import * as path from 'path';

const NODE_ENV: string = process.env.NODE_ENV || 'development';
const DEV_MODE: boolean = NODE_ENV === 'development';

const PORT: number = process.env.PORT || 8080;

const universalWebpack = {
	exclude_from_externals: [
		'normalize.css',
	],
	server: {
		input: path.resolve(__dirname, '../src/server/index.ts'),
		output: path.resolve(__dirname, '../dist/server.js'),
	},
};

export {
	DEV_MODE,
	NODE_ENV,
	PORT,
	universalWebpack,
};
