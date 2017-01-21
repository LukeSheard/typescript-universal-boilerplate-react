import * as React from 'react';
import {
	IndexRoute,
	Redirect,
	Route,
} from 'react-router';

interface ImportedRoute {
	default: Route;
}

export const getRouteComponent = (routeName: string) => (_, cb: Function) => {
	require.ensure([], (require) => {
		let route: ImportedRoute;
		try {
			route = require<ImportedRoute>('./' + routeName + '/index.tsx');
			cb(null, route.default);
		} catch (e) {
			getRouteComponent('NotFound')(_, cb);
		}
	});
};

export default function routes(): React.ReactElement<React.Props<Route>> {
	return (
		<Route path="/" getComponent={getRouteComponent('App')}>
			<IndexRoute getComponent={getRouteComponent('Home')} />
			<Route path="page" getComponent={getRouteComponent('Page')} />
			<Route path="not-found" getComponent={getRouteComponent('NotFound')} />
			<Redirect from="*" to="/not-found" />
		</Route>
	);
}
