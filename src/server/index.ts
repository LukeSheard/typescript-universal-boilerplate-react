import * as Express from 'express';

export default function(params) {
	console.log(params.chunks());

	const app = Express();

	app.get('*', (req, res) => {
		res.send('Hello World');
	});

	app.listen(8080, () => {
		console.log('Server Running!!');
	});
}
