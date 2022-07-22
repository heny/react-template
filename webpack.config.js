const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(require('./webpack.common'), {
  mode: 'production',
  devtool: 'source-map',

  output: {
    filename: 'resources/js/[name].[chunkhash:8].js',
  },
  plugins: [
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
  ],
});
