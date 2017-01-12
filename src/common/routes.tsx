import App from 'common/components/App';
import Counter from 'common/components/Counter';
import Home from 'common/components/Home';
import * as React from 'react';
import {
	IndexRoute,
	Route,
} from 'react-router';

const Wrap = ({ children }) => children;

export default function routes(store) {
	return (
		<Route path="/" component={App}>
			<IndexRoute component={Home} />
			<Route path="/counter" component={Wrap}>
				<IndexRoute component={Counter} />
				<Route path=":start" component={Counter} />
			</Route>
		</Route>
	);
}
