require('source-map-support/register');

const server = require('universal-webpack').server;
const webpackConfig = require('./webpack/config');
const config = require('./config');

server(webpackConfig, config.universalWebpack);
