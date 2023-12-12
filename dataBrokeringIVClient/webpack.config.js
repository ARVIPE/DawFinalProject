// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = "style-loader";

const config = {
  entry: "./src/code/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({ template : "./src/index.html", filename : "./index.html"} )

    // Add your plugins here
    // Learn more about plugins from https://webpack.js.org/configuration/plugins/
  ],
  module: {
    rules: [
      {
        test : /\.html$/,
        use : { loader : "html-loader" }
      },
      {
        test: /\.css$/,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        exclude: ["/node_modules/"],
      }

      // Add your rules for custom modules here
      // Learn more about loaders from https://webpack.js.org/loaders/
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", "..."],
    fallback: { "http": false, "browser": false, "https": false, "zlib": false,
      "stream": false, "url": false, "buffer": false, "timers": false, "assert": false, "axios": false 
    }
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
  } else {
    config.mode = "development";
  }
  return config;
};
