const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const os = require('os')

const src = path.join(__dirname, 'src')

// ⚠️ COMING-SOON BRANCH — deliberately stripped down.
// src/index.pug is the only page, and it is self-contained: inline CSS, no JS,
// no stylesheet. Everything the full site needs (src/scss, src/js modules,
// scripts/, loaders/, the other pages and the rest of assets/media) has been
// removed from this branch and comes back when the complete branch is merged.
// Only the SCSS/CSS/asset loader rules and copy patterns still needed by this
// single page remain below.

module.exports = {
  entry: {
    bundle: path.join(src, 'js/coming-soon.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  devServer: {
    static: path.resolve(__dirname, './src/'),
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: true,
    onListening: (devServer) => {
      const port = devServer.server.address().port
      console.log('\n  ➜  Local:   http://localhost:' + port + '/')

      const interfaces = os.networkInterfaces()
      Object.keys(interfaces).forEach(name => {
        interfaces[name].forEach(iface => {
          if (iface.family === 'IPv4' && !iface.internal) {
            console.log(`  ➜  Network: http://${iface.address}:${port}/`)
          }
        })
      })
      console.log('')
    },
  },
  stats: {
    colors: true,
    hash: true,
    timings: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: '@webdiscus/pug-loader',
            options: { pretty: true },
          },
        ],
      },
    ],
  },
  plugins: [
    // Only what src/index.pug references — copying all of assets/media would
    // ship ~8 MB of gallery photos that this page never displays.
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'assets/media/favicon/favicon.ico'), to: 'assets/media/favicon/favicon.ico' },
        { from: path.join(__dirname, 'assets/media/favicon/apple-touch-icon.png'), to: 'assets/media/favicon/apple-touch-icon.png' },
        { from: path.join(src, 'fonts/Crusades.woff2'), to: 'assets/fonts/Crusades.woff2' },
      ],
    }),
    // inject: false — the page needs no stylesheet or script tag.
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.pug'),
      filename: 'index.html',
      inject: false,
    }),
  ],
}
