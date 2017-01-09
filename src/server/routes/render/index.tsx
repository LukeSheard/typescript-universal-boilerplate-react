import { Request, Response } from 'express';
import {
	createMemoryHistory,
	match,
} from 'react-router';
import routes from '../../../common/router';
import createHTML from './createHTML';

export default function(req: Request, res: Response) {
	const history = createMemoryHistory(req.url);

	return match({
		history,
		routes,
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			return res.send(500, 'Error');
		} else if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			res.write('<!doctype HTML>');
			res.write(createHTML(renderProps));
			return res.status(200).end();
		}

		return res.redirect('/not-found');
	});
}
