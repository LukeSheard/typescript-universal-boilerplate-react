import * as React from 'react';
import {
	IndexRoute,
	Redirect,
	Route,
} from 'react-router';

export default function routes(): React.ReactElement<React.Props<Route>> {
	return (
		<Route
			path="/"
			getComponent={(_, cb) => {
				require.ensure([], (require) => {
					cb(null, require<INodeModule>('./App/index.tsx').default);
				});
			}}
		>
			<IndexRoute
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<INodeModule>('./Home/index.tsx').default);
					});
				}}
			/>
			<Route
				path="page"
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<INodeModule>('./Page').default);
					});
				}}
			/>
			<Route
				path="not-found"
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<INodeModule>('./NotFound').default);
					});
				}}
			/>
			<Redirect from="*" to="/not-found" />
		</Route>
	);
}
