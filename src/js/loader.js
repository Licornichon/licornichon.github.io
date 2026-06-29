const imagesLoaded = require('imagesloaded')

;(function () {
  const loader = document.querySelector('.page-loader')
  if (!loader) return

  function hide () {
    loader.classList.add('is-hidden')
  }

  // Attendre : load event + fonts + toutes les images
  function waitForEverything () {
    // 1. Attendre le load event (DOM + stylesheets)
    const loadPromise = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', resolve, { once: true })
      }
    })

    // 2. Attendre les fonts (si supporté)
    const fontPromise = document.fonts
      ? document.fonts.ready
      : Promise.resolve()

    // 3. Attendre les images (toutes, y compris lazy-loaded)
    const imagePromise = new Promise(resolve => {
      // Charger d'abord les images non-lazy pour être sûr
      const allImages = document.querySelectorAll('img')
      if (allImages.length === 0) {
        resolve()
      } else {
        imagesLoaded(document.body, resolve)
      }
    })

    // Attendre tout ça
    Promise.all([loadPromise, fontPromise, imagePromise]).then(hide)
  }

  waitForEverything()
})()
