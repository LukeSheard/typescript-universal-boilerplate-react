import * as React from 'react';
import {
	Link,
} from 'react-router';

export default class NotFound extends React.Component<{}, {}> {
	public render(): React.ReactElement<React.Props<{}>> {
		return (
			<div>
				<h1>
					Page Not Found
				</h1>
				<p>
					The page you requested could not be found. <Link to="/">Go to Homepage</Link>
				</p>
			</div>
		);
	}
}
