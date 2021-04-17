const path = require("path");
const isDev = process.env.NODE_ENV === "development";
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: isDev ? "development" : "production",
  devtool: isDev ? "eval-source-map" : "nosources-source-map",
  entry: "./server/src/index.js",
  target: "node",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "./dist"),
  },
  node: false, //关闭针对node的默认行为
  plugins: [
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: 'static'
        }
      ]
    }),
  ],
};
