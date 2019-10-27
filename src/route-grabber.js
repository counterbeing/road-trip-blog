const fetch = require('node-fetch')
const fs = require('fs-extra')

async function run() {
  const url = 'https://road-trip-blog.s3.amazonaws.com/storiesIndex.json'
  const response = await fetch(url)
  const json = await response.json()
  const routes = json.map(story => `/${story.id}`)
  fs.writeJsonSync('./routes.json', routes)
}

run()
