import * as React from 'react'
import * as ReactDOMServer from 'react-dom/server';
import {
	RouterContext,
} from 'react-router';

export interface IHTMLProps {
	renderProps: any;
}

export default class HTML extends React.Component<IHTMLProps, any> {
	public render() {
		const styleLink = process.env.NODE_ENV === 'production' ? (
			<link rel="stylesheet" href="/static/style.min.css"/>
		) : null;
		return (
			<html>
				<head>
					<title>Yo!</title>
					{styleLink}
				</head>
				<body>
					<div
						id="root"
						dangerouslySetInnerHTML={{
							__html: ReactDOMServer.renderToString((
								<RouterContext {...this.props.renderProps} />
							)),
						}}
					/>
					<script src="/static/bundle.min.js" />
				</body>
			</html>
		);
	}
}
