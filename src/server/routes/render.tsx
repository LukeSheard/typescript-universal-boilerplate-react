import createRoutes from 'common/routes';
import {
	Request,
	Response,
} from 'express';
import {
	createMemoryHistory,
	match,
} from 'react-router';
import HTML from 'server/utils/HTML';

export default function(params) {
	return (req: Request, res: Response) => {
		const history = createMemoryHistory(req.url);
		const routes = createRoutes();

		return match({
			history,
			routes,
		}, (error, redirectLocation, renderProps) => {
			if (error) {
				return res.status(500).send(String(error));
			} else if (redirectLocation) {
				return res.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				return res.send(HTML(renderProps, params));
			}

			return res.status(400).send('not-found');
		});
	};
}
