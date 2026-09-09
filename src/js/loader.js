const imagesLoaded = require('imagesloaded')

;(function () {
  const loader = document.querySelector('.page-loader')
  if (!loader) return

  function hide () {
    loader.classList.add('is-hidden')
  }

  // Wait for: load event + fonts + every image
  function waitForEverything () {
    // 1. Wait for the load event (DOM + stylesheets)
    const loadPromise = new Promise(resolve => {
      if (document.readyState === 'complete') {
        resolve()
      } else {
        window.addEventListener('load', resolve, { once: true })
      }
    })

    // 2. Wait for fonts (where supported)
    const fontPromise = document.fonts
      ? document.fonts.ready
      : Promise.resolve()

    // 3. Wait for images (all of them, lazy-loaded included)
    const imagePromise = new Promise(resolve => {
      // Resolve straight away when there is nothing to wait for
      const allImages = document.querySelectorAll('img')
      if (allImages.length === 0) {
        resolve()
      } else {
        imagesLoaded(document.body, resolve)
      }
    })

    // Wait for all three
    Promise.all([loadPromise, fontPromise, imagePromise]).then(hide)
  }

  waitForEverything()
})()
