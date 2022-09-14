const { merge } = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');

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
  output: {
    filename: 'resources/js/[name].[chunkhash:8].js',
  },
  plugins,
  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015', // 指定为 es6
      }),

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
      maxSize: 4000 * 1024,
      name: 'vendors',
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/]react?.*/,
          name: 'react',
          chunks: 'all',
        },
      },
    },
  },
});
