import * as React from 'react';
import {
	IndexRoute,
	Redirect,
	Route,
} from 'react-router';
import getComponent from './getComponent';

export default function routes(): React.ReactElement<React.Props<Route>> {
	return (
		<Route path="/" getComponent={getComponent('App')}>
			<IndexRoute getComponent={getComponent('Home')} />
			<Route path="page" getComponent={getComponent('Page')} />
			<Route path="not-found" getComponent={getComponent('NotFound')} />
			<Redirect from="*" to="/not-found" />
		</Route>
	);
}
