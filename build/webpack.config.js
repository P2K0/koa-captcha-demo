const { join } = require("node:path");

const CopyPlugin = require("copy-webpack-plugin");
const NodeExternals = require("webpack-node-externals");

function resolvePath(_path) {
  return join(__dirname, "../", _path);
}

module.exports = {
  entry: "./src/main.ts",
  output: {
    clean: true,
    path: resolvePath("dist/server")
  },
  mode: "production",
  target: "node",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  externals: [NodeExternals()],
  cache: false,
  plugins: [new CopyPlugin({
    patterns: [
      { from: resolvePath("src/views"), to: "../views" }
    ]
  })]
};
