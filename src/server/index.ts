import * as Express from 'express';
import * as path from 'path';
import render from 'server/routes/render';

export default function(params: IParams) {
	const app = Express();

	app.use('/static', Express.static(path.join(__dirname, 'static')));

	app.get('*', render(params.chunks()));

	app.listen(8080);
}
