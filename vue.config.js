const webpack = require("webpack")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin
const PrerenderSPAPlugin = require("prerender-spa-plugin")
const path = require("path")
// const stories = require("../src/components/stories.json")
// const routes = stories.map(story => `/${story.id}`)

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "./dist"),
        routes: [
          "/",
          "/watch-out-for-your-picnic-baskets-yellowstone-2019-07-16"
          //...routes
        ]
      })
    ]
  }
}
