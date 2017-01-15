import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	Provider,
} from 'react-redux';
import {
	RouterContext,
} from 'react-router';
import { Store } from 'redux';
import HTML from 'server/render/HTML';

export default function(
	chunks: IChunks,
	store: Store<IAppState>,
	renderProps,
): string {
	return ReactDOMServer.renderToStaticMarkup((
		<HTML
			chunks={chunks}
			root={
				ReactDOMServer.renderToString((
					<Provider store={store}>
						<RouterContext
							{...renderProps}
						/>
					</Provider>
				))
			}
			store={store}
		/>
	));
}
