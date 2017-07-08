import { join } from "path";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";

const config: webpack.Configuration = {
  context: join(__dirname, "../../"),
  entry: {
    main: "./src/client"
  },
  module: {
    rules: [
      {
        loader: "file-loader",
        test: /\.(eot|svg|ttf|woff|woff2)$/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: "file-loader"
          },
          {
            loader: "image-webpack-loader",
            options: {
              bypassOnDebug: true
            }
          }
        ]
      }
    ]
  },
  output: {
    chunkFilename: "[chunkhash].min.js",
    path: join(__dirname, "../../", "build"),
    publicPath: "/"
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      logLevel: "silent"
    })
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },
  stats: {
    colors: true
  },
  target: "web"
};

export default config;
