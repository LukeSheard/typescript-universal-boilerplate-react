import * as WebpackIsomorphicTools from 'webpack-isomorphic-tools';
import Server from './src/server';
import webpackIsomorphicToolsConfig from './webpack/config';

(<any>global).webpack_isomorphic_tools = new WebpackIsomorphicTools(webpackIsomorphicToolsConfig)
  .server(__dirname, () => {
    const server = Server();

		try {
			server.start((err, msg) => {
				console.log(err, msg);
			});
		} catch (e) {
			console.error(e);
			process.exit(1);
		}
  });
