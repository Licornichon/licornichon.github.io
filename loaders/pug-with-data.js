const fs = require('fs')
const path = require('path')

// Injects build-time generated data (gallery + shop) into the Pug templates as
// local variables, re-read on every compilation.

const DATA_DIR = path.join(__dirname, '../src/data')
const SOURCES = {
  galleryItems: path.join(DATA_DIR, 'gallery.json'),
  shopItems: path.join(DATA_DIR, 'shop.json'),
}

// Canonical site URL (no trailing slash), used by the canonical and Open Graph
// tags. ⚠️ Keep in sync with src/static/robots.txt and src/static/sitemap.xml
// if the domain ever changes.
const SITE_URL = 'https://www.atelierguillotine.com'

module.exports = function (source) {
  let prelude = `- var siteUrl = ${JSON.stringify(SITE_URL)}\n`

  Object.entries(SOURCES).forEach(([varName, file]) => {
    let data = []
    if (fs.existsSync(file)) {
      data = JSON.parse(fs.readFileSync(file, 'utf8'))
    }
    // Register as a dependency so a JSON change triggers a rebuild
    this.addDependency(file)
    prelude += `- var ${varName} = ${JSON.stringify(data)}\n`
  })

  return prelude + source
}
