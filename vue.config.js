const PrerenderSPAPlugin = require("prerender-spa-plugin")
const path = require("path")
// const stories = require("../src/components/stories.json")
// const routes = stories.map(story => `/${story.id}`)

module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    plugins: [
      new PrerenderSPAPlugin({
        staticDir: path.join(__dirname, "../dist"),
        routes: ["/"]
        // routes: ["/", ...routes]
      })
    ]
  }
}
