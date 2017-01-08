import chalk from 'chalk';
import * as WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import Server from './src/server';
import { config } from './webpack/isomorphic';

(global as any).webpack_isomorphic_tools = new WebpackIsomorphicTools(config)
	.server(__dirname, () => {
		const server = Server();

		try {
			server.start((err, msg) => {
				chalk.bold(err, msg);
			});
		} catch (e) {
			chalk.white.bgRed(e);
			process.exit(1);
		}
	});
