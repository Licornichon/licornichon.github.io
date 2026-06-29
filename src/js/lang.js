const dicts = {
  fr: require('./translations.fr'),
  en: require('./translations.en'),
}

const STORAGE_KEY = 'fc-lang'
let currentLang = 'fr'

function detectLang () {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'fr' || stored === 'en') return stored
  return navigator.language.toLowerCase().startsWith('fr') ? 'fr' : 'en'
}

function t (key) {
  return (dicts[currentLang] && dicts[currentLang][key]) || key
}

function applyTranslations (lang) {
  currentLang = lang
  const dict = dicts[lang]

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n')]
    if (val !== undefined) el.textContent = val
  })

  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-html')]
    if (val !== undefined) el.innerHTML = val
  })

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-placeholder')]
    if (val !== undefined) el.placeholder = val
  })

  document.querySelectorAll('[data-i18n-aria]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-aria')]
    if (val !== undefined) el.setAttribute('aria-label', val)
  })

  document.querySelectorAll('[data-i18n-alt]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-alt')]
    if (val !== undefined) el.setAttribute('alt', val)
  })

  document.querySelectorAll('[data-i18n-label]').forEach(el => {
    const val = dict[el.getAttribute('data-i18n-label')]
    if (val !== undefined) el.setAttribute('data-label', val)
  })

  const metaDesc = document.querySelector('meta[name="description"]')
  if (metaDesc) metaDesc.content = dict['document.description']
  document.title = dict['document.title']
  document.documentElement.lang = lang

  document.querySelectorAll('.nav__lang-btn').forEach(btn => {
    const isActive = btn.dataset.lang === lang
    btn.classList.toggle('is-active', isActive)
    btn.setAttribute('aria-pressed', isActive ? 'true' : 'false')
  })
}

;(function () {
  currentLang = detectLang()
  applyTranslations(currentLang)

  document.querySelectorAll('.nav__lang-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      localStorage.setItem(STORAGE_KEY, this.dataset.lang)
      applyTranslations(this.dataset.lang)
    })
  })
})()

module.exports = { t }
