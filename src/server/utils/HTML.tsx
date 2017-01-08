import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	RouterContext,
} from 'react-router';

export function HTML(renderProps) {
	const body = (
		<RouterContext {...renderProps} />
	);

	return (
		<html>
			<head>
				<title>Test Page</title>
			</head>
			<body>
				<div
					id="root"
					dangerouslySetInnerHTML={{
						__html: ReactDOMServer.renderToString(body),
					}}
				/>
				<script src="/static/bundle.js" />
			</body>
		</html>
	);
}


export default function(renderProps): string {
	return ReactDOMServer.renderToStaticMarkup(HTML(renderProps));
}
