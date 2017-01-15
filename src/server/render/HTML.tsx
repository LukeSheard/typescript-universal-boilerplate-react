import * as React from 'react';
import { Store } from 'redux';

export interface IHTMLProps extends React.Props<HTML> {
	chunks: IChunks;
	root: string;
	store: Store<any>;
}

export default class HTML extends React.Component<IHTMLProps, {}> {
	public render(): JSX.Element {
		const {
			chunks,
			root,
			store,
		} = this.props;

		return (
			<html>
				<head>
					<title>Default App</title>
					{this.createStyles(chunks.styles)}
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
					{this.createScript(chunks.javascript.common)}
					{this.createScript(chunks.javascript.application)}
				</body>
			</html>
		);
	}

	private createScript(src: string): JSX.Element {
		return (
			<script
				src={src}
				type="text/javascript"
			/>
		);
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
