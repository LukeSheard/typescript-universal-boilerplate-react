import * as React from 'react';
import {
	Link,
} from 'react-router';
const s = require('./style.css');

export default class App extends React.Component<{}, {}> {
	public render() {
		return (
			<div className={s.app}>
				<nav className={s.appNav}>
					<Link to="/">Home</Link>
					<Link to="/page">Page2</Link>
					<Link to="/lol">LOL</Link>
				</nav>
				<main className={s.appMain}>
					{this.props.children}
				</main>
			</div>
		);
	}
}
