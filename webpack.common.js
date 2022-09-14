const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dayjs = require('dayjs');
const Dotenv = require('dotenv-webpack');

const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const gitRevisionPlugin = new GitRevisionPlugin();
gitRevisionPlugin.versionCommand = 'describe --always --tags';
const gitVersion = JSON.stringify(gitRevisionPlugin.version().split('-')[0]); // 获取版本号

const publicPath = process.env.PUBLIC_PATH || '/';
const devMode = process.env.NODE_ENV !== 'production';

const localIconsPath = path.resolve(__dirname, './src/assets/icons');

module.exports = {
  entry: {
    main: ['./src/index', './src/styles/index.less'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: '[name].[contenthash].js',
    publicPath,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'swc-loader',
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
        test: /\.(woff|ttf|eot)$/i,
        type: 'asset',
        generator: {
          // 文件生成目录
          filename: `${publicPath}resources/font/[name].[ext]`,
        },
        parser: {
          dataUrlCondition: {
            // 最大限制，小于限制转换Base64
            maxSize: 200 * 1024,
          },
        },
      },
      {
        test: /\.(png|gif|jpg|jpeg)$/i,
        type: 'asset',
        generator: {
          // 文件生成目录
          filename: `${publicPath}resources/images/[name].[ext]`,
        },
        parser: {
          dataUrlCondition: {
            // 最大限制，小于限制转换Base64
            maxSize: 200 * 1024,
          },
        },
      },
      {
        test: /\.svg$/i,
        type: 'asset',
        resourceQuery: /url/, // *.svg?url
      },
      {
        test: /\.svg$/i,
        include: [localIconsPath],
        resourceQuery: { not: [/url/] }, // exclude react component if *.svg?url
        use: [
          {
            loader: '@svgr/webpack',
            options: {
              icon: true,
            },
          },
        ],
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
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
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
};
