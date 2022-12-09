const path = require('path');
const { merge } = require('webpack-merge');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const publicPath = process.env.PUBLIC_PATH || '/';

module.exports = merge(require('./webpack.common'), {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    static: path.resolve(__dirname, './public'),
    historyApiFallback:
      publicPath === '/'
        ? true
        : {
            rewrites: [{ from: /./, to: `${publicPath}/index.html` }],
          },
    compress: true,
    // 这里不能是localhost，如果localhost手机端将无法连接
    host: '0.0.0.0',
    // proxy: require('./proxy'),
    hot: true,
  },
  plugins: [new ReactRefreshPlugin()],
});
