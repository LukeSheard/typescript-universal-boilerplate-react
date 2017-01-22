require('babel-polyfill');
const initialiseServer = require('../dist/server').default;
const webpackChunks = require('../dist/static/webpack-chunks.json');

const params = {
	chunks() {
		return webpackChunks;
	},
};

initialiseServer(params);
