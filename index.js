const appConfig = require('./config');

const params = {
	chunks() { return  require('./dist/static/webpack-chunks.json') },
};

const server = require('./dist/server');

server(params);
