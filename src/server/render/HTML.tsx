import * as React from 'react';
import { Store } from 'redux';

export interface IHTMLProps extends React.Props<HTML> {
	params: any;
	root: string;
	store: Store<any>;
}

export default class HTML extends React.Component<IHTMLProps, {}> {
	public render(): JSX.Element {
		const {
			params,
			root,
			store,
		} = this.props;

		return (
			<html>
				<head>
					<title>Default App</title>
					{this.createStyles(params.styles)}
				</head>
				<body>
					<div
						id="root"
						dangerouslySetInnerHTML={{
							__html: root,
						}}
					/>
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
						}}
					/>
					{this.createScripts(params.javascript)}
				</body>
			</html>
		);
	}

	private createScripts(javascript: Object): JSX.Element[] {
		return Object.keys(javascript).sort().map((scriptName, index) => {
			const scriptSrc: string = javascript[scriptName];
			return (
				<script
					key={index}
					src={scriptSrc}
					type="text/javascript"
				/>
			);
		});
	}

	private createStyles(styles: Object): JSX.Element[] {
		return Object.keys(styles).map((linkName, index) => {
			const linkHref: string = styles[linkName];
			return (
				<link
					key={index}
					href={linkHref}
					rel="stylesheet"
				/>
			);
		});
	}
}
