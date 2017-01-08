import * as React from 'react';

export default class App extends React.Component<any, any> {
	render () {
		const s = require('./style.scss');
		return (
			<div className={s.app}>
				Hello World
			</div>
		)
	}
}
