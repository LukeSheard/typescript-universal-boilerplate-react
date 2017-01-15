import App from 'components/App';
import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';

interface ImportedRoute {
	default: Route;
}

export default function routes() {
	return (
		<Route path="/" component={App}>
			<IndexRoute
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<ImportedRoute>('components/Home').default);
					});
				}}
			/>
			<Route
				path="page"
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<ImportedRoute>('components/Page').default);
					});
				}}
			/>
		</Route>
	);
}
