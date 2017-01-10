import * as React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import {
	RouterContext,
} from 'react-router';

export interface IHTMLProps extends React.Props<HTML> {
	renderProps: Object;
	params: IChunks;
}

class HTML extends React.Component<IHTMLProps, {}> {
	public createComponent(renderProps): string {
		return ReactDOMServer.renderToString((
			<RouterContext
				{...renderProps}
			/>
		));
	}

	public render(): JSX.Element {
		const {
			params,
			renderProps,
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
							__html: this.createComponent(renderProps),
						}}
					/>
					{this.createScripts(params.javascript)}
				</body>
			</html>
		);
	}

	private createScripts(javascript: Object): JSX.Element[] {
		return Object.keys(javascript).map((scriptName, index) => {
			const scriptSrc: string = javascript[scriptName];
			return (
				<script
					key={index}
					src={`http://localhost:8081${scriptSrc}`}
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

export default function(renderProps, params: IChunks) {
	return ReactDOMServer.renderToStaticMarkup((
		<HTML
			renderProps={renderProps}
			params={params}
		/>
	));
}
