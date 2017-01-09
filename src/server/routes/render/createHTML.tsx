import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server';
import HTML from './HTML';

export default function (renderProps) {
	return ReactDOMServer.renderToStaticMarkup((
		<HTML
			renderProps={renderProps}
		/>
	));
}
