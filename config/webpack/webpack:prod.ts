import * as ExtractTextPlugin from "extract-text-webpack-plugin";
import * as webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import * as ManifestPlugin from "webpack-manifest-plugin";

const commonCSS = new ExtractTextPlugin("[chunkhash].min.css");
const vendorCSS = new ExtractTextPlugin("[chunkhash].min.css");

const config: webpack.Configuration = {
  devtool: "source-map",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /.tsx?$/,
        use: {
          loader: "ts-loader",
          options: {
            compilerOptions: {
              module: "ESNext"
            },
            silent: true
          }
        }
      },
      {
        exclude: /node_modules/,
        test: /.css$/,
        use: commonCSS.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[hash:base64:5]",
              module: true,
              sourceMap: true
            }
          }
        })
      },
      {
        include: /node_modules/,
        test: /.css$/,
        use: vendorCSS.extract({
          fallback: "style-loader",
          use: {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        })
      }
    ]
  },
  output: {
    filename: "[chunkhash].min.js"
  },
  plugins: [
    vendorCSS,
    commonCSS,
    new ManifestPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: "static",
      logLevel: "silent",
      openAnalyzer: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      comments: false,
      compress: {
        warnings: false
      },
      mangle: true,
      sourceMap: true
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
};

export default config;
