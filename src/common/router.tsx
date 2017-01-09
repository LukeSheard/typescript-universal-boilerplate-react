import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';
import App from './components/App';
import NotFound from './components/NotFound';
import Wrap from './components/Wrap';


const Routes = (
	<Route component={Wrap} path="/">
		<IndexRoute component={App} />

		<Route path="not-found" component={NotFound} />
	</Route>
);

export default Routes;
