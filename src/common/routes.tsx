import * as React from 'react';
import {
	IndexRoute,
	Link,
	Redirect,
	Route,
} from 'react-router';
import App from './components/App';
import Page from './components/Page';

function Wrap({ children }) {
	return (
		<div>
			<ul>
				<Link to="/">Home</Link>
				<Link to="/page">Page</Link>
			</ul>
			{children}
		</div>
	)
}

function NotFound() {
	return (
		<div>
			Not Found. <Link to="/">Home</Link>
		</div>
	);
}

export default (
	<Route path="/" component={Wrap}>
		<IndexRoute component={App} />
		<Route path="page" component={Page} />

		<Route path="not-found" component={NotFound} />
		<Redirect from="*" to="/not-found" />
	</Route>
);
