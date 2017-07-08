import debug from "debug";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import createConfig from "../../../webpack.config";

const config = createConfig(process.env.NODE_ENV || "development");
const compiler = webpack(config);
const log = debug("app:webpack:dev");
const warn = debug("app:webpack:dev:warn");
const error = debug("app:webpack:dev:error");

export default webpackDevMiddleware(compiler, {
  error,
  log,
  publicPath: (config.output && config.output.publicPath) || "/",
  serverSideRender: true,
  stats: {
    colors: true
  },
  warn
});
