import { Express } from "express";
import * as webpack from "webpack";
import * as webpackDevMiddleware from "webpack-dev-middleware";
import * as webpackHotMiddleware from "webpack-hot-middleware";
import createConfig from "../../../webpack.config";

const config = createConfig(process.env.NODE_ENV || "development");
const compiler = webpack(config);

export default function(app: Express) {
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: (config.output && config.output.publicPath) || "/",
      stats: {
        colors: true
      }
    })
  );
  app.use(webpackHotMiddleware(compiler));
}
