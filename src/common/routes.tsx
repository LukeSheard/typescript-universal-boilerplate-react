import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';
import App from './components/App/index';

function Wrap({ children }) {
	return children;
}

function NotFound() {
	return (
		<div>
			Not Found
		</div>
	);
}

export default function() {
	return (
		<Route component={Wrap} path="/">
			<IndexRoute component={App} />

			<Route path="not-found" component={NotFound} />
		</Route>
	);
}
