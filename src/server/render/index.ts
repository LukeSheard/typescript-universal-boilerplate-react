import createRoutes from 'common/routes';
import createStore from 'common/store';
import {
	Request,
	Response,
} from 'express';
import {
	createMemoryHistory,
	match,
} from 'react-router';
import {
	syncHistoryWithStore,
} from 'react-router-redux';

import loadPage from 'server/render/loadPage';

export default function(chunks: IChunks) {
	return (req: Request, res: Response) => {
		const memoryHistory = createMemoryHistory(req.url);
		const store = createStore(memoryHistory);
		const history = syncHistoryWithStore(memoryHistory, store);
		const routes = createRoutes(store);

		return match({
			history,
			routes,
		}, (error: string, redirectLocation, renderProps) => {
			if (error) {
				return res.status(500).send(error);
			} else if (redirectLocation) {
				return res.redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				return res.status(200).send(`
					<!doctype HTML>
					${loadPage(chunks, store, renderProps)}
				`);
			}

			return res.status(404).redirect('/not-found');
		});
	};
}
