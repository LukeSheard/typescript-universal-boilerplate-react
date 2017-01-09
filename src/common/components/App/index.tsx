import * as React from 'react';

export default class App extends React.Component<any, any> {
	public render () {
		const s = require('./style');
		return (
			<div className={s.app}>
				Hello World
			</div>
		);
	}
}
