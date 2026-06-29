const fs = require('fs')
const path = require('path')

module.exports = function (source) {
  // Relire le JSON de galerie à chaque compilation
  const galleryDataPath = path.join(__dirname, '../src/data/gallery.json')
  let galleryItems = []
  if (fs.existsSync(galleryDataPath)) {
    galleryItems = JSON.parse(fs.readFileSync(galleryDataPath, 'utf8'))
  }

  // Marquer le fichier comme dépendance pour déclencher une recompilation si le JSON change
  this.addDependency(galleryDataPath)

  // Passer les données au contenu pug (via des variables globales)
  const dataScript = `- var galleryItems = ${JSON.stringify(galleryItems)}\n`
  return dataScript + source
}
