import * as webpack from "webpack";
import base from "./config/webpack/webpack:base";
import dev from "./config/webpack/webpack:dev";
import prod from "./config/webpack/webpack:prod";
import * as merge from "webpack-merge";

function createConfig(env: string): webpack.Configuration {
  const config = merge(base, env === "production" ? prod : dev);

  return config;
}

export default createConfig;
