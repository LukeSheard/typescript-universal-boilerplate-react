import * as React from 'react';
import {
	Link,
} from 'react-router';

export default class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div>
				<nav>
					<Link to="/">Home</Link>
					<Link to="/page">Page2</Link>
					<Link to="/lol">LOL</Link>
				</nav>
				<main>
					{this.props.children}
				</main>
			</div>
		);
	}
}
