import * as path from 'path';
export default {
	server: {
		input: path.resolve(__dirname, '../src/server/index.ts'),
		output: path.resolve(__dirname, '../dist/server.js'),
	},
};
