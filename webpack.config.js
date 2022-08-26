const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const plugins = [
  /**
   * 移除 build 目录
   * @see https://webpack.js.org/guides/output-management/#cleaning-up-the-dist-folder
   */
  new CleanWebpackPlugin(),

  /**
   * 将静态资源复制到 build 目录
   * @see https://webpack.js.org/plugins/copy-webpack-plugin/
   */
  new CopyPlugin({
    patterns: [
      {
        from: 'public',
        globOptions: {
          ignore: ['**/*index.html'],
        },
      },
    ],
  }),
];

if (process.env.ANALYZE === 'true') {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = merge(require('./webpack.common'), {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: 'resources/js/[name].[chunkhash:8].js',
  },
  plugins,
});
