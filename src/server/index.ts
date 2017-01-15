import * as Express from 'express';
import { Server } from 'http';
import * as path from 'path';
import render from 'server/render';

export default function(params: IParams): Server {
	const app: Express.Express = Express();

	/* ==============
		 HANDLERS 
  ============== */
	app.use('/static', Express.static(path.join(__dirname, 'static')));
	app.get('*', render(params.chunks()));

	return app.listen(8080);
}
