const { merge } = require('webpack-merge');

/**
 * 一些公共的代理设置
 * @type {{headers: {Connection: string}, changeOrigin: boolean, secure: boolean}}
 */
const commonProxyOptions = {
  changeOrigin: true,
  secure: false,
  headers: {
    Connection: 'keep-alive',
  },
};

function proxy(options) {
  return merge(commonProxyOptions, options);
}

function serviceProxy(proxyURL) {
  return proxy({
    target: proxyURL,
    // pathRewrite(path) {
    //   return '';
    // },
    // onProxyReq: (proxyReq) => {
    //   proxyReq.setHeader('', '');
    // },
  });
}

module.exports = {
  '/api': serviceProxy('https://1.1.1.1'),
};
