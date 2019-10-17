module.exports = {
  publicPath: './',
  assetsDir: 'assets',
  devServer: {
    open: true,
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:8989/',
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  }
}
