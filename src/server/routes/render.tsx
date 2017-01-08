import { Request, Response } from 'express';
import {
	createMemoryHistory,
	match,
} from 'react-router';
import routes from '../../common/routes';
import render from '../utils/HTML';

export default function(req: Request, res: Response) {
	const history = createMemoryHistory(req.url);

	return match({
		history,
		routes,
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			return res.status(500).send(error.message);
		} else if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			return res.send(render(renderProps));
		}

		return res.status(404).redirect('/not-found');
	});
}
