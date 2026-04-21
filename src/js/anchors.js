(function () {
  // Smooth scroll
  const links = document.querySelectorAll('.nav__link[href^="#"]')

  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault()
      const id = link.getAttribute('href').slice(1)
      const target = document.getElementById(id)
      if (!target) return

      const navLinks = document.querySelector('.nav__links')
      if (navLinks) navLinks.classList.remove('is-open')

      window.scrollTo(0, target.getBoundingClientRect().top + window.scrollY - 70)
    })
  })

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle')
  const navLinks = document.querySelector('.nav__links')

  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('is-open')
    })
  }
})()
