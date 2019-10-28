const fs = require('fs')
const webpack = require('webpack')
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const path = require('path')

const routes = JSON.parse(fs.readFileSync('./routes.json'))
// console.log(routes)

module.exports = {
  runtimeCompiler: true,
  configureWebpack: config => {
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    // config.plugins.push(new BundleAnalyzerPlugin())
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, './dist'),
          routes,
          // maxConcurrentRoutes: 1,
        })
      )
    }
  },
}
