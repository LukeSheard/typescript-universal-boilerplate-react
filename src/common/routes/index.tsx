import Wrap from 'components/util/Wrap';
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
		<Route path="/" component={Wrap}>
			<IndexRoute
				getComponent={(_, cb) => {
					require.ensure([], (require) => {
						cb(null, require<ImportedRoute>('components/Home').default);
					});
				}}
			/>
		</Route>
	);
}
