const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const autoprefixer = require('autoprefixer');
const postcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const postcssModulesValues = require('postcss-modules-values');

const NODE_ENV = process.env.NODE_ENV || 'development';
const devMode = NODE_ENV === 'development';

const htmlPlugin = new HtmlWebpackPlugin({
  template: './templates/index.html',
  fileName: './index.html',
});

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: devMode ? 'development' : 'production',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: './js/main.js',
    publicPath: '/',
    chunkFilename: './js/[name].js',
  },
  devtool: devMode ? 'inline-source-map' : false,
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: { compact: false },
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
      {
        test: /\.(sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 2,
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
              },
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssFlexbugsFixes,
                autoprefixer({
                  flexbox: 'no-2009',
                }),
                postcssModulesValues,
              ],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              query: {
                mozjpeg: {
                  progressive: true,
                },
                gifsicle: {
                  interlaced: true,
                },
                optipng: {
                  optimizationLevel: 7,
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'assets/fonts/[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    htmlPlugin,
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: './css/[name].css',
    }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
  },
  devServer: {
    contentBase: './public',
    port: 8888,
    historyApiFallback: true,
    publicPath: '/',
  },
};
