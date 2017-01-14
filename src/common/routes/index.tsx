import Home from 'components/Home';
import Wrap from 'components/util/Wrap';
import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';

export default function routes(store) {
	console.log(store);
	return (
		<Route path="/" component={Wrap}>
			<IndexRoute component={Home} />
		</Route>
	);
}
