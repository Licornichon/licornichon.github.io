const Masonry = require('masonry-layout')
const imagesLoaded = require('imagesloaded')

const grid = document.querySelector('.gallery__grid')

if (grid) {
  const msnry = new Masonry(grid, {
    itemSelector: '.gallery__item',
    columnWidth: '.gallery__sizer',
    percentPosition: true,
    gutter: 0,
    horizontalOrder: true,
  })

  // Recalculer le layout après que les images sont chargées
  imagesLoaded(grid, () => {
    msnry.layout()
  })

  const filters = document.querySelectorAll('.gallery__filter')
  const items = document.querySelectorAll('.gallery__item')

  filters.forEach(filter => {
    filter.addEventListener('click', () => {
      filters.forEach(f => { f.classList.remove('is-active'); f.setAttribute('aria-pressed', 'false') })
      filter.classList.add('is-active')
      filter.setAttribute('aria-pressed', 'true')

      const level = filter.dataset.filter

      items.forEach(item => {
        if (level === 'all' || item.dataset.level === level) {
          item.classList.remove('is-hidden')
        } else {
          item.classList.add('is-hidden')
        }
      })

      // Recalculer après le filtrage et attendre les images visibles
      imagesLoaded(grid, () => {
        msnry.layout()
      })
    })
  })
}
