import { Request, Response } from 'express';
import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	createMemoryHistory,
	match,
	RouterContext,
} from 'react-router';
import routes from '../../common/routes';

export default function(req: Request, res: Response) {
	const history = createMemoryHistory(req.url);

	return match({
		history,
		routes: routes(),
	}, (error, redirectLocation, renderProps) => {
		if (error) {
			return res.send(500, 'Error');
		} else if (redirectLocation) {
			return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
		} else if (renderProps) {
			const response: string = ReactDOMServer.renderToString((
				<html>
					<head>
						<title>Test</title>
					</head>
					<body>
						<div
							id="root"
							dangerouslySetInnerHTML={{
								__html: ReactDOMServer.renderToStaticMarkup((
									<RouterContext {...renderProps} />
								)),
							}}
						/>
						<script src="/static/bundle.min.js" />
					</body>
				</html>
			));

			return res.send(response);
		}

		return res.redirect('/not-found');
	});
}
