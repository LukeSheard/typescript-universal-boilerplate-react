import * as Express from 'express';
import { Server } from 'http';
import * as path from 'path';
import render from 'server/render';

export default function(params: IParams): Server {
	const app: Express.Express = Express();

	/* ==============
		 HANDLERS 
  ============== */
	app.set('port', process.env.PORT || 8080);
	app.get('/status', (_, res: Express.Response) => {
		res.status(200).send('Server is up');
	});
	app.use('/static', Express.static(path.join(__dirname, 'static')));
	app.get('*', render(params.chunks()));

	return app.listen(app.get('port'), () => {
		console.info('Server started on', app.get('port'));
	});
}
