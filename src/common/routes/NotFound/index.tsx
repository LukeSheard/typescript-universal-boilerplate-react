import * as React from 'react';
import {
	Link,
} from 'react-router';
const s = require('./style');

export default class NotFound extends React.Component<{}, {}> {
	public render(): React.ReactElement<React.Props<{}>> {
		return (
			<div className={s.notFound}>
				<p>Page Not Found</p>
				<p>The page you requested could not be found. <Link to="/">Go to Homepage</Link></p>
			</div>
		);
	}
}
