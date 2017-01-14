import * as Express from 'express';
import * as path from 'path';
import render from 'server/render';

export default function(params) {
	console.log(process.env.RANDOMVAR);

	const app = Express();

	app.use('/static', Express.static(path.join(__dirname, 'static')));

	app.get('*', render(params.chunks()));

	app.listen(8080);
}
