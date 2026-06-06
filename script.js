const photoLists = {
  tilt: [
    'photo/tilt/1.jpg',
    'photo/tilt/2.jpg',
    'photo/tilt/3.jpg',
    'photo/tilt/4.jpg',
    'photo/tilt/5.jpg',
    'photo/tilt/7.jpg',
    'photo/tilt/8.jpg',
    'photo/tilt/9.jpg',
    'photo/tilt/10.jpg',
    'photo/tilt/11.jpg',
    'photo/tilt/12.jpg',
    'photo/tilt/13.jpg',
    'photo/tilt/14.jpg',
    'photo/tilt/15.jpg',
    'photo/tilt/16.jpg',
    'photo/tilt/17.jpg',
    'photo/tilt/18.jpg',
    'photo/tilt/19.jpg',
    'photo/tilt/20.jpg',
    'photo/tilt/21.jpg',
    'photo/tilt/22.jpg',
    'photo/tilt/23.jpg',
    'photo/tilt/24.jpg',
    'photo/tilt/25.jpg',
    'photo/tilt/26.jpg',
    'photo/tilt/27.jpg',
    'photo/tilt/28.jpg',
    'photo/tilt/29.jpg',
    'photo/tilt/30.jpg',
  ],
  miss: [
    'photo/miss/1.jpg',
    'photo/miss/2.jpg',
    'photo/miss/3.jpg',
    'photo/miss/4.jpg',
    'photo/miss/5.jpg',
    'photo/miss/7.jpg',
    'photo/miss/8.jpg',
    'photo/miss/9.jpg',
    'photo/miss/10.jpg',
    'photo/miss/11.jpg',
    'photo/miss/12.jpg',
    'photo/miss/13.jpg',
    'photo/miss/14.jpg',
    'photo/miss/15.jpg',
    'photo/miss/16.jpg',
    'photo/miss/17.jpg',
    'photo/miss/18.jpg',
    'photo/miss/19.jpg',
    'photo/miss/20.jpg',
    'photo/miss/21.jpg',
    'photo/miss/22.jpg',
    'photo/miss/23.jpg',
    'photo/miss/24.jpg',
    'photo/miss/25.jpg',
    'photo/miss/26.jpg',
    'photo/miss/27.jpg',
    'photo/miss/28.jpg',
    'photo/miss/29.jpg',
    'photo/miss/30.jpg',
  ],
  plans: [
    'photo/plans/1.jpg',
    'photo/plans/2.jpg',
    'photo/plans/3.jpg',
    'photo/plans/4.jpg',
    'photo/plans/5.jpg',
    'photo/plans/7.jpg',
    'photo/plans/8.jpg',
    'photo/plans/9.jpg',
    'photo/plans/10.jpg',
    'photo/plans/11.jpg',
  ],
  secret: ['photo/secret/1.jpg'],
}

let currentTheme = null
let currentShuffled = []
let currentIndex = 0
let photoImg = document.getElementById('current-photo')
let themeTitle = document.getElementById('theme-title')
const mainMenu = document.getElementById('main-menu')
const galleryScreen = document.getElementById('gallery-screen')
const backBtn = document.getElementById('back-btn')

function shuffleArray(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function loadTheme(themeKey) {
  if (!photoLists[themeKey] || photoLists[themeKey].length === 0) {
    console.error(
      `Нет фотографий для темы ${themeKey}. Добавь пути в photoLists.`,
    )
    themeTitle.innerText = `Нет фото! Добавь их в script.js`
    photoImg.src = ''
    return
  }
  currentShuffled = shuffleArray(photoLists[themeKey])
  currentIndex = 0
  showCurrentPhoto()
  let themeNames = {
    tilt: 'Всё бесит / нет сил',
    miss: 'Скучаю',
    plans: 'Планы вместе',
    secret: 'Секретик)',
  }
  themeTitle.innerText = themeNames[themeKey] || 'Фотографии'
}

function showCurrentPhoto() {
  if (currentShuffled.length > 0 && currentIndex < currentShuffled.length) {
    photoImg.src = currentShuffled[currentIndex]
  } else {
    nextPhoto()
  }
}

function nextPhoto() {
  if (currentShuffled.length === 0) return

  if (currentIndex + 1 < currentShuffled.length) {
    currentIndex++
  } else {
    currentShuffled = shuffleArray(currentShuffled)
    currentIndex = 0
  }
  showCurrentPhoto()
}

function openGallery(themeKey) {
  currentTheme = themeKey
  loadTheme(themeKey)
  mainMenu.classList.add('hidden')
  galleryScreen.classList.remove('hidden')
}

function closeGallery() {
  mainMenu.classList.remove('hidden')
  galleryScreen.classList.add('hidden')
  currentTheme = null
  photoImg.src = ''
}

document.querySelectorAll('.theme-btn').forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const theme = btn.getAttribute('data-theme')
    openGallery(theme)
  })
})

backBtn.addEventListener('click', closeGallery)

photoImg.addEventListener('click', nextPhoto)

function createHeart() {
  const heart = document.createElement('div')
  heart.classList.add('heart')
  heart.innerHTML = '❤️'

  const size = 18 + Math.random() * 27
  heart.style.fontSize = `${size}px`
  heart.style.left = `${Math.random() * 100}%`
  heart.style.animationDuration = `${3 + Math.random() * 5}s`
  heart.style.opacity = 0.5 + Math.random() * 0.4

  const container = document.getElementById('hearts-container')
  container.appendChild(heart)

  heart.addEventListener('animationend', () => {
    heart.remove()
  })
}

setInterval(() => {
  createHeart()
}, 300)

for (let i = 0; i < 10; i++) {
  setTimeout(createHeart, i * 100)
}
