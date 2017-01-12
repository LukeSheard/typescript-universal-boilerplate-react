import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	Provider,
} from 'react-redux';
import {
	RouterContext,
} from 'react-router';
import HTML from 'server/render/HTML';

export default function(params, store, renderProps): string {
	return ReactDOMServer.renderToStaticMarkup((
		<HTML
			params={params}
			root={
				ReactDOMServer.renderToString((
					<Provider store={store}>
						<RouterContext
							{...renderProps}
						/>
					</Provider>
				))
			}
		/>
	));
}
