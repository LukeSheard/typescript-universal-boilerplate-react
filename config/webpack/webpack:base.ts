import { join } from "path";
import * as webpack from "webpack";

export default function(env: string) {
  const config: webpack.Configuration = {
    context: join(__dirname, "../../"),
    entry: {
      main: "./src/client"
    },
    module: {
      rules: [
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          use: "file-loader"
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: ["file-loader", "image-webpack-loader"]
        }
      ]
    },
    output: {
      chunkFilename: "[chunkhash].min.js",
      path: join(__dirname, "../../", "build"),
      publicPath: "/"
    },
    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(env)
      }),
      new webpack.optimize.CommonsChunkPlugin({
        minChunks(module) {
          return (
            module.context && module.context.indexOf("node_modules") !== -1
          );
        },
        name: "common"
      }),
      new webpack.NoEmitOnErrorsPlugin()
    ],
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    stats: {
      colors: true
    },
    target: "web"
  };

  return config;
}
