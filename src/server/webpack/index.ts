import debug from "debug";
import { Express } from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import createConfig from "../../../webpack.config";

const config = createConfig(process.env.NODE_ENV || "development");
const compiler = webpack(config);
const log = debug("app:webpack");
const warn = debug("app:webpack:warn");
const error = debug("app:webpack:error");

export default function(app: Express) {
  app.use(
    webpackDevMiddleware(compiler, {
      error,
      log,
      publicPath: (config.output && config.output.publicPath) || "/",
      stats: {
        colors: true
      },
      warn
    })
  );
  app.use(webpackHotMiddleware(compiler));
}
