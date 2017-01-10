import * as Express from 'express';
import * as path from 'path';
import render from 'server/routes/render';

const __ENV__ = process.env.NODE_ENV || 'development';
const __DEV__ = __ENV__ === 'development';

export default function(params: IParams) {
	const app = Express();

	app.use('/static', Express.static(path.join(__dirname, '../../', 'dist')));

	app.get('*', render(params.chunks()));

	app.listen(8080, () => {
		console.log('Server Running!!', __DEV__);
	});
}
