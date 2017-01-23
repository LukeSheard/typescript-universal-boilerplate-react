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
			chunks: {
				javascript,
				styles,
			},
			store,
		} = this.props;

		return (
			<html>
				<head>
					<title>Default App</title>
					<link href={styles.application} rel="stylesheet" />
				</head>
				<body>
					<div
						id="root"
						dangerouslySetInnerHTML={{
							__html: ReactDOMServer.renderToString((children as HTMLChildren)),
						}}
					/>
					<script
						dangerouslySetInnerHTML={{
							__html: `window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())}`,
						}}
						type="text/javascript"
					/>
					{this.createScript(javascript.common)}
					{this.createScript(javascript.application)}
				</body>
			</html>
		);
	}

	private createScript(src: string): JSX.Element | null {
		return <script src={src} type="text/javascript" />;
	}
}
