import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';
// import { Store } from 'redux';

interface ImportedRoute {
	default: Route;
}

export default function routes() {
// export default function routes(store: Store<IAppState>) {
	// const connect = (fn) => (...args) => fn(store, ...args);

	return (
		<Route
			path="/"
			getComponent={(_, cb) => {
				require.ensure([], (require) => {
					cb(null, require<ImportedRoute>('components/App').default);
				});
			}}
		>
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
