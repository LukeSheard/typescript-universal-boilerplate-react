import * as webpack from "webpack";

const config: webpack.Configuration = {
  devtool: "inline-source-map",
  entry: {
    main: ["webpack-hot-middleware/client", "./src/client"]
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: [
          "react-hot-loader",
          {
            loader: "ts-loader",
            options: {
              silent: true
            }
          }
        ],
        test: /.tsx?$/
      },
      {
        exclude: /node_modules/,
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              localIdentName: "[name]__[local]___[hash:base64:5]",
              module: true,
              sourceMap: true
            }
          }
        ]
      },
      {
        include: /node_modules/,
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: "[name].js",
    pathinfo: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

export default config;
