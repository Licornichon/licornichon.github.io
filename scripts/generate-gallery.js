const fs = require('fs')
const path = require('path')

const MEDIA_DIR = path.join(__dirname, '../assets/media')
const OUTPUT_FILE = path.join(__dirname, '../src/data/gallery.json')

// Créer le dossier data s'il n'existe pas
const dataDir = path.dirname(OUTPUT_FILE)
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true })
}

const items = []

// Catégories et ordre d'affichage
const categories = {
  'battle-ready': 'battle-ready',
  'tabletop-plus': 'tabletop-plus',
  'display': 'display',
}

// Lire les fichiers depuis chaque sous-dossier
Object.entries(categories).forEach(([folder, level]) => {
  const categoryPath = path.join(MEDIA_DIR, folder)

  if (!fs.existsSync(categoryPath)) {
    console.warn(`⚠️  Dossier ${folder} introuvable`)
    return
  }

  // Lire les fichiers du dossier (non-récursif pour la simplicité)
  // ou récursif pour supporter des sous-dossiers
  const files = walkDir(categoryPath)

  files.forEach(file => {
    if (!/\.(jpg|jpeg|png|webp|gif)$/i.test(file)) return

    const filePath = path.join(categoryPath, file)
    const stat = fs.statSync(filePath)
    const relativePath = path.relative(path.join(__dirname, '..'), filePath)

    items.push({
      src: './' + relativePath.replace(/\\/g, '/'),
      level: level,
      mtime: stat.mtime.getTime(), // timestamp pour tri chronologique
      name: path.basename(file, path.extname(file)),
    })
  })
})

// Trier par date de modification (plus récent d'abord)
items.sort((a, b) => b.mtime - a.mtime)

// Écrire le JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(items, null, 2))
console.log(`✓ Galerie générée : ${items.length} image(s) trouvée(s)`)

// Fonction utilitaire pour marcher récursivement (chemins relatifs à root)
function walkDir (dir, root) {
  if (!root) root = dir
  let files = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  entries.forEach(entry => {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files = files.concat(walkDir(fullPath, root))
    } else {
      files.push(path.relative(root, fullPath))
    }
  })

  return files
}
