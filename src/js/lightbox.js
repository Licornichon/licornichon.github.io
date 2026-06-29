const GLightbox = require('glightbox')
require('glightbox/dist/css/glightbox.min.css')

;(function () {
  const items = document.querySelectorAll('.gallery__item')
  if (!items.length) return

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
    openEffect: 'fade',
    closeEffect: 'fade',
  })

  items.forEach(item => {
    item.addEventListener('click', e => {
      e.preventDefault()
      const href = item.getAttribute('href')
      if (!href || href === '#') return

      const visible = Array.from(document.querySelectorAll('.gallery__item:not(.is-hidden)'))
        .filter(el => el.getAttribute('href') && el.getAttribute('href') !== '#')
      const elements = visible.map(el => ({ href: el.getAttribute('href'), type: 'image' }))
      const startAt = visible.indexOf(item)

      lightbox.setElements(elements)
      lightbox.openAt(startAt)
    })
  })
})()
