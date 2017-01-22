import * as envalid from 'envalid';
import * as Express from 'express';
import { Server } from 'http';
import * as path from 'path';
import render from 'server/render';

export default function(params: IParams): Server {
	// Load Local Config File
	process.env = envalid.cleanEnv(process.env, {
		PORT: envalid.num({
			default: 8080,
			desc: 'Server local port',
		}),
	});

	// Declare App
	const app: Express.Express = Express();

	/* ==============
		 HANDLERS 
  ============== */
	app.set('port', process.env.PORT);
	app.use('/static', Express.static(path.join(__dirname, 'static')));
	app.get('*', render(params.chunks()));

	return app.listen(app.get('port'), () => {
		console.info('Server started on', app.get('port'));
	});
}
