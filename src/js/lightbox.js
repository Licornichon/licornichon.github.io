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

// Shop — one lightbox group per piece (data-shop-gallery attribute = slug)
;(function () {
  const links = document.querySelectorAll('[data-shop-gallery]')
  if (!links.length) return

  const groups = {}
  links.forEach(link => {
    const key = link.getAttribute('data-shop-gallery')
    ;(groups[key] || (groups[key] = [])).push(link)
  })

  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    keyboardNavigation: true,
    closeOnOutsideClick: true,
    openEffect: 'fade',
    closeEffect: 'fade',
  })

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const groupLinks = groups[link.getAttribute('data-shop-gallery')]

      const hrefs = []
      groupLinks.forEach(l => {
        const href = l.getAttribute('href')
        if (href && href !== '#' && hrefs.indexOf(href) === -1) hrefs.push(href)
      })

      lightbox.setElements(hrefs.map(href => ({ href, type: 'image' })))
      lightbox.openAt(Math.max(0, hrefs.indexOf(link.getAttribute('href'))))
    })
  })
})()
