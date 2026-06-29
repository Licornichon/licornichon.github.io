const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const os = require('os')

const src = path.join(__dirname, 'src')
const galleryDataPath = path.join(__dirname, 'src/data/gallery.json')

// Fonction pour charger les données (appelée à chaque compilation)
function loadGalleryItems () {
  if (fs.existsSync(galleryDataPath)) {
    return JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'))
  }
  return []
}

module.exports = {
  entry: {
    bundle: path.join(src, 'js/main.js'),
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
          {
            loader: path.resolve(__dirname, 'loaders/pug-with-gallery.js'),
          },
        ],
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
        test: /\.(jpg|jpeg|png|gif|svg|webp)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/media/[name][ext]',
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: path.join(__dirname, 'assets/media'), to: 'assets/media', noErrorOnMissing: true },
        { from: path.join(src, 'CNAME'), to: 'CNAME', toType: 'file' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, 'index.pug'),
      filename: 'index.html',
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, 'privacy.pug'),
      filename: 'privacy.html',
    }),
  ],
}
