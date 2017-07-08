import * as webpack from "webpack";
import * as merge from "webpack-merge";
import base from "./config/webpack/webpack:base";
import dev from "./config/webpack/webpack:dev";
import prod from "./config/webpack/webpack:prod";

function createConfig(env: string): webpack.Configuration {
  const config = merge(base(env), env === "production" ? prod : dev);

  return config;
}

export default createConfig;
