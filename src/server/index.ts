import * as Express from 'express';
import * as http from 'http';
import * as webpack from 'webpack';
import webpackConfig from '../../webpack.config.babel';

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

app.get('*', (req: Express.Request, res: Express.Response) => {
	res.send('Hello World');
});

export default function () {
	const server: http.Server = http.createServer(app);

	return {
		start: (cb: Function) => server.listen(process.env.PORT || 8080, cb),
		getConnections: server.getConnections,
		close: server.close,
	};
}
