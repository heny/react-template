const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dayjs = require('dayjs');
const Dotenv = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();
gitRevisionPlugin.versionCommand = 'describe --always --tags';
const gitVersion = JSON.stringify(gitRevisionPlugin.version().split('-')[0]); // 获取版本号

const publicPath = process.env.PUBLIC_PATH || '/';
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    main: ['./src/index', './src/styles/index.less'],
  },
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[contenthash].js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|svg)$/,
        loader: 'url-loader',
        // include: [
        //   localIconsPath,
        //   hypersIconsPath
        // ],
        options: {
          limit: 1,
          publicPath,
          name: 'resources/images/[name].[ext]',
        },
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: `./.env.${process.env.NODE_ENV}`,
      allowEmptyValues: true, // 未赋值的为空变量
    }),

    /**
     * 生成入口 HTML 文件
     * @see https://github.com/jantimon/html-webpack-plugin#usage
     */
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      // version: packageJson.version,
      publishDate: `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
      gitVersion,
      gitCommit: JSON.stringify(gitRevisionPlugin.commithash()),
      gitBranch: JSON.stringify(gitRevisionPlugin.branch()),
      publicPath,
    }),

    /**
     * 抽取 CSS 文件
     * @see https://webpack.js.org/plugins/mini-css-extract-plugin/
     */
    new MiniCssExtractPlugin({
      filename: devMode ? 'resources/css/[name].css' : 'resources/css/[name].[contenthash].css',
    }),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src'),
      public: path.resolve(__dirname, './public'),
    },
  },
  optimization: {
    minimizer: [
      /**
       * 压缩 js
       * @see https://webpack.js.org/plugins/terser-webpack-plugin/
       */
      new TerserPlugin(),

      /**
       * 使用 cssnano 优化
       * @see https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
       */
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'advanced',
            {
              // zindex 不优化
              zindex: false,
            },
          ],
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
        },
      },
    },
  },
};
