import * as React from 'react';
import {
	Link,
} from 'react-router';
require('normalize.css');

export default function({ children }) {
	return (
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
}
