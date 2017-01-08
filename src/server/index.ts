import * as Express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import router from './routes';

const app = Express();

if (process.env.NODE_ENV !== 'production') {
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');

  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/static', Express.static(path.join(__dirname, 'static')));

app.use(router);

export default function () {
	const server: http.Server = http.createServer(app);

	return {
		start: (cb: Function) => server.listen(process.env.PORT || 8080, cb),
		getConnections: server.getConnections,
		close: server.close,
	};
}
