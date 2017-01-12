import * as React from 'react';

export default class HTML extends React.Component<any, {}> {
	public render(): JSX.Element {
		const {
			params,
			root,
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
