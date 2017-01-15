import createRoutes from 'common/routes';
import createStore from 'common/store';
import {
	Request,
	Response,
} from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	Provider,
} from 'react-redux';
import {
	createMemoryHistory,
	match,
	RouterContext,
} from 'react-router';
import {
	syncHistoryWithStore,
} from 'react-router-redux';
import HTML from './HTML';

export default function(chunks: IChunks) {
	return (req: Request, res: Response) => {
		const memoryHistory = createMemoryHistory(req.url);
		const store = createStore(memoryHistory);
		const history = syncHistoryWithStore(memoryHistory, store);
		const routes = createRoutes();

		match({
			history,
			routes,
		}, (error: string, redirectLocation, renderProps) => {
			if (error) {
				return res.status(500).send(error);
			} else if (redirectLocation) {
				return res.status(302).redirect(redirectLocation.pathname + redirectLocation.search);
			} else if (renderProps) {
				res.status(200);
				res.write('<!doctype HTML>');
				res.write(ReactDOMServer.renderToStaticMarkup((
					<HTML chunks={chunks} store={store}>
						<Provider store={store}>
							<RouterContext
								{...renderProps}
							/>
						</Provider>
					</HTML>
				)));
				return res.end();
			}

			return res.status(404).redirect('/not-found');
		});
	};
}
