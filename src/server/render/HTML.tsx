import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { Provider } from 'react-redux';
import { Store } from 'redux';

export type HTMLChildren = React.ReactElement<React.Props<Provider>>;

export interface IHTMLProps extends React.Props<HTML> {
	chunks: IChunks;
	store: Store<IAppState>;
}

export default class HTML extends React.Component<IHTMLProps, {}> {
	public render(): JSX.Element {
		const {
			children,
			chunks,
			store,
		} = this.props;

		return (
			<html>
				<head>
					<title>Default App</title>
					<link href={chunks.styles.application} rel="stylesheet" />
				</head>
				<body>
					<div
						id="root"
						dangerouslySetInnerHTML={{
							__html: ReactDOMServer.renderToString((children as HTMLChildren)),
						}}
					/>
					<script
						type="text/javascript"
						dangerouslySetInnerHTML={{
							__html: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
						}}
					/>
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
}
