const fs = require("fs")
const webpack = require("webpack")
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin
const PrerenderSPAPlugin = require("prerender-spa-plugin")
const path = require("path")
// const stories = require("../src/components/stories.json")
// const routes = stories.map(story => `/${story.id}`)

// async function routes() {
//   const url = "https://road-trip-blog.s3.amazonaws.com/storiesIndex.json"
//   const response = await fetch(url)
//   // .then(res => res.json())
//   // .then(json => console.log(json))
//   const json = response.json()
//   return await json.map(story => `/${story.id}`)
//   // console.log(json.map(story => `/${story.id}`))
// }

const routes = JSON.parse(fs.readFileSync("./routes.json"))
console.log(routes)

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      // new BundleAnalyzerPlugin(),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "./dist"),
        routes
      })
    ]
  }
}
