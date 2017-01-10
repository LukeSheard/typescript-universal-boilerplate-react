import * as React from 'react';
import {
	IndexRoute,
	Link,
	Route,
} from 'react-router';

const App = ({ children }) => (
	<div>
		<header>
			<h1>
				App
			</h1>
		</header>
		<ul>
			<Link to="/">Home</Link>
			<Link to="/counter">Counter</Link>
			<Link to="/counter/10">Counter (Start 10)</Link>
		</ul>
		<main>
			{children}
		</main>
	</div>
);

const Home = () => (
	<div>
		Home Page
	</div>
);

const Counter = (props) => {
	console.log(props);
	return (
		<div>
			Counter
		</div>
	);
};

const Wrap = ({ children }) => children;

const Routes = () => (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/counter" component={Wrap}>
			<IndexRoute component={Counter} />
			<Route path=":start" component={Counter} />
		</Route>
	</Route>
);

export default Routes;
