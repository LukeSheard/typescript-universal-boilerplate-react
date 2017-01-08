import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Request, Response } from 'express';
import App from '../../common/components/App';

export default function (req: Request, res: Response) {
	const response: string = ReactDOMServer.renderToString((
		<html>
			<head>
				<title>Test</title>
			</head>
			<body>
				<div id='root'>
					<App />
				</div>
				<script src="/static/bundle.js"></script>
			</body>
		</html>
	));

	res.send(response);
}
