import * as Express from 'express';
import { Server } from 'http';
import * as path from 'path';
import render from 'server/render';
import { PORT } from '../../config';

export default function(params: IParams): Server {
	const app: Express.Express = Express();

	/* ==============
		 HANDLERS 
  ============== */
	app.get('/status', (_, res: Express.Response) => {
		res.status(200).send('Server is up');
	});
	app.use('/static', Express.static(path.join(__dirname, 'static')));
	app.get('*', render(params.chunks()));

	return app.listen(PORT, () => {
		console.log('Server started on', PORT);
	});
}
