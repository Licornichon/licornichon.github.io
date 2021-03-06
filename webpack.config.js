const webpack = require('webpack'),
path = require('path'),
CleanWebpackPlugin = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const src = path.join(__dirname, 'src');

const config = {
  devServer: {
    hot: true,
    inline: true,
    // static files served from here
    contentBase: path.resolve(__dirname, './src/'),
    // open app in localhost:8080
    port: 8080,
    stats: 'errors-only',
    open: true
  },
  stats: {
    assets: false,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: false
  },
  entry: {
    index: path.join(src, 'index.pug'),
    bundle: path.join(src, 'js/main.js'),
  },
  output: {
    path: path.resolve(__dirname),
    filename: '[name].js'
  },
  module: {
    rules: [
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    },
    {
      test: /\.pug$/,
      use:  ['html-loader', 'pug-html-loader?pretty&exports=false']
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.(jpg|jpeg|png|gif|svg)$/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/media/'
        }
      }
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/,
      use: ['file-loader']
    }
    ]
  },
  plugins: [
  new CleanWebpackPlugin(['dist']),
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    title: 'index.html',
    template: path.join(src, 'index.pug'),
  }),
  ],
};

module.exports = config;
