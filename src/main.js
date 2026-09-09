import './style.css'

const photoPath = name => `/${encodeURIComponent(name)}`
const uploadedPhotos = [
  'Screenshot 2026-09-06 120141.png', 'Screenshot 2026-09-06 120219.png', 'Screenshot 2026-09-06 120950.png', 'Screenshot 2026-09-06 121403.png',
  'Screenshot 2026-09-06 121419.png', 'Screenshot 2026-09-06 121432.png', 'Screenshot 2026-09-06 121446.png', 'Screenshot 2026-09-06 121516.png',
  'Screenshot 2026-09-06 121531.png', 'Screenshot 2026-09-06 121552.png', 'Screenshot 2026-09-06 121631.png', 'Screenshot 2026-09-06 121647.png',
  'Screenshot 2026-09-06 121709.png', 'Screenshot 2026-09-06 121731.png', 'Screenshot 2026-09-06 121750.png', 'Screenshot 2026-09-06 121806.png',
  'Screenshot 2026-09-06 121826.png', 'Screenshot 2026-09-06 121847.png', 'Screenshot 2026-09-06 121913.png', 'Screenshot 2026-09-06 121933.png',
  'Screenshot 2026-09-06 121946.png', 'Screenshot 2026-09-06 122001.png', 'Screenshot 2026-09-06 122012.png', 'Screenshot 2026-09-06 122120.png',
]
const memories = uploadedPhotos.slice(0, 4).map(photoPath)
const featuredPhotos = uploadedPhotos.slice(0, 6)
const gallery = featuredPhotos.map(photoPath)
const leftoverPhotos = uploadedPhotos.slice(6).map(photoPath)
const galleryCaptions = [
  'little things, big feelings', 'the girl behind the smile', 'our wonderfully chaotic close-up', 'same song, same hearts',
  'caught in a pink moment', 'the kind of silly I adore',
]
const renderMemoryBits = (photos, count = 2) => photos.slice(0, count).map(src => `<img src="${src}" alt="A little memory from us">`).join('')

document.querySelector('#app').innerHTML = `
  <main class="site-shell">
    <section class="lock-screen" id="lock-screen">
      <div class="grain"></div>
      <div class="scuba-cat" aria-hidden="true"><img src="/cat-scuba.gif" alt=""></div>
      <div class="lock-copy"><p class="eyebrow">A little place I made for you</p><h1>For my<br><em>favorite</em> person.</h1><p class="lock-note">There are four little numbers between you and a few things I have been wanting to say.</p><span class="signature">with all my love, always</span></div>
      <div class="pin-card"><div class="polaroid tilt-left"><img id="pin-photo" src="${memories[0]}" alt="A memory waiting to be unlocked"><span>for my love</span></div><div class="pin-panel"><p class="panel-kicker">the secret garden</p><h2>Enter our date</h2><p class="panel-hint">Four digits. One very special day.</p><div class="pin-slots" aria-live="polite"><span></span><span></span><span></span><span></span></div><div class="keypad" aria-label="PIN keypad">${['1','2','3','4','5','6','7','8','9','0'].map(key => `<button class="key" type="button" data-key="${key}">${key}</button>`).join('')}<button class="key backspace" type="button" data-key="backspace" aria-label="Backspace">⌫ Backspace</button></div><button class="enter-button" id="enter-pin" type="button">Open the door <span>↗</span></button><p class="pin-message" id="pin-message"></p></div></div>
      <div class="scroll-cue">a private little world <span>↓</span></div>
    </section>
    <section class="garden hidden" id="garden"><header class="garden-header"><a class="wordmark" href="#garden">ours <span>♡</span></a><div class="header-note">happy birthday, my love <span>2026</span></div><button class="music-button" id="music-button" type="button" aria-label="Toggle music">♪ <span>our song</span></button></header><div class="garden-intro"><p class="eyebrow">welcome home</p><h1>Everything I love<br>about <em>us.</em></h1><p>Take your time. I left little pieces of my heart in every corner.</p></div><nav class="envelope-grid" aria-label="Keepsakes"><button class="envelope" data-page="letter"><span class="seal">♡</span><strong>love letter</strong><small>something from my heart</small></button><button class="envelope" data-page="flowers"><span class="seal">✿</span><strong>flowers for you</strong><small>a bouquet that never fades</small></button><button class="envelope" data-page="life"><span class="seal">∞</span><strong>life with you</strong><small>the best kind of future</small></button><button class="envelope" data-page="gallery"><span class="seal">▧</span><strong>our gallery</strong><small>proof that time flies</small></button><button class="envelope" data-page="wrapped"><span class="seal">✦</span><strong>love wrapped</strong><small>the year in memories</small></button><button class="envelope" data-page="cards"><span class="seal">♡</span><strong>little cards</strong><small>things I adore about you</small></button></nav><footer class="garden-footer"><span>made with unreasonable amounts of love</span><span>scroll to explore ↓</span></footer></section>
    <div class="page-modal hidden" id="page-modal"><button class="close-modal" id="close-modal" type="button" aria-label="Close">×</button><div id="page-content"></div></div>
  </main>
`

let enteredPin = ''
const correctPin = '1028'
const slots = [...document.querySelectorAll('.pin-slots span')]
const photo = document.querySelector('#pin-photo')
const message = document.querySelector('#pin-message')
function refreshPin() { slots.forEach((slot, index) => { slot.textContent = enteredPin[index] ? '*' : ''; slot.classList.toggle('filled', Boolean(enteredPin[index])) }); photo.src = memories[Math.min(enteredPin.length, memories.length - 1)] }
function unlock() { if (enteredPin === correctPin) { document.querySelector('#lock-screen').classList.add('unlocking'); window.setTimeout(() => { document.querySelector('#lock-screen').classList.add('hidden'); document.querySelector('#garden').classList.remove('hidden') }, 650); return } message.textContent = enteredPin.length === 4 ? 'Not quite. Try our special date.' : 'Keep going, love.'; message.classList.add('show'); if (enteredPin.length === 4) { enteredPin = ''; window.setTimeout(() => { message.classList.remove('show'); refreshPin() }, 850) } }
document.querySelectorAll('.key').forEach(button => button.addEventListener('click', () => { if (button.dataset.key === 'backspace') { enteredPin = enteredPin.slice(0, -1); refreshPin(); return } if (enteredPin.length < 4 && /\d/.test(button.dataset.key)) { enteredPin += button.dataset.key; refreshPin() } }))
document.querySelector('#enter-pin').addEventListener('click', unlock)
document.addEventListener('keydown', event => { if (/\d/.test(event.key) && enteredPin.length < 4) { enteredPin += event.key; refreshPin() } if (event.key === 'Backspace') { enteredPin = enteredPin.slice(0, -1); refreshPin() } if (event.key === 'Enter') unlock() })

const pageMemoryBits = {
  letter: renderMemoryBits(leftoverPhotos.slice(0, 2), 2),
  flowers: renderMemoryBits(leftoverPhotos.slice(2, 4), 2),
  life: renderMemoryBits(leftoverPhotos.slice(4, 6), 2),
  wrapped: renderMemoryBits(leftoverPhotos.slice(6, 8), 2),
  cards: renderMemoryBits(leftoverPhotos.slice(8, 10), 2),
}
const flowerPolaroids = leftoverPhotos.slice(2, 4).map(src => `
  <div class="memory-pick">
    <div class="pick-stick"></div>
    <div class="polaroid-mini"><img src="${src}" alt="A little memory from us"></div>
  </div>
`).join('')

const pageContent = {
  letter: `<div class="modal-inner letter-page"><p class="eyebrow">a letter for you</p><h2>Happy birthday,<br><em>my favorite human.</em></h2><p class="big-letter">I love the way you make ordinary days feel like somewhere worth remembering. Thank you for being my soft place to land, my favorite laugh, and the person I want beside me for every small adventure.</p><p class="big-letter">I hope this year gives you back a little of the joy you give everyone around you. You deserve the whole universe, but for now, I made you my world — the one that revolves around you.</p><div class="memory-strip">${pageMemoryBits.letter}</div><span class="signature">yours, in every universe ♡</span></div>`,
  flowers: `<div class="modal-inner flowers-page"><p class="eyebrow">flowers for you</p><h2>For my favorite bloom,<br><em>lilies and all.</em></h2><p>Some love stories are full of little flowers, soft mornings, and the kind of joy that keeps showing up. For you, I picked a real lily bouquet — graceful, bright, and full of meaning.</p><div class="bouquet-scene" aria-label="Real lily bouquet"><img class="real-lily" src="/lily-transparent.png" alt="Real lily bouquet">${flowerPolaroids}</div><p class="lily-note">for the girl who makes every day feel beautiful.</p><span class="signature">a bouquet that never wilts</span></div>`,
  life: `<div class="modal-inner life-page"><p class="eyebrow">life with you</p><h2>My favorite place<br>is <em>next to you.</em></h2><p>More late-night talks. More tiny traditions. More getting lost and finding our way home together.</p><div class="memory-strip">${pageMemoryBits.life}</div></div>`,
  gallery: `<div class="modal-inner gallery-page"><p class="eyebrow">our memories</p><h2>A small archive<br>of <em>us.</em></h2><div class="photo-carousel"><button class="carousel-arrow" data-carousel="previous" type="button" aria-label="Previous memory">←</button><figure class="carousel-slide"><img id="carousel-image" src="${gallery[0]}" alt="A memory 1"><figcaption id="carousel-caption">${galleryCaptions[0]}</figcaption></figure><button class="carousel-arrow" data-carousel="next" type="button" aria-label="Next memory">→</button></div><div class="carousel-meta"><span id="carousel-count">01 / ${String(gallery.length).padStart(2, '0')}</span><span>every picture feels like home</span></div></div>`,
  wrapped: `<div class="modal-inner wrapped-page"><p class="eyebrow">our love wrapped</p><h2>Another year of<br><em>choosing you.</em></h2><div class="stats single-stat"><div class="highlight-stat"><strong>123</strong><span>DAYS OF YOU</span></div></div><p class="big-letter">You made this year softer, brighter, and so much more ours.</p><div class="memory-strip">${pageMemoryBits.wrapped}</div></div>`,
  cards: `<div class="modal-inner cards-page"><p class="eyebrow">ten things I adore</p><h2>In case you<br>ever <em>forget.</em></h2><ol>${['Your eyes that I could get lost in.','Your laugh that makes everything better.','The way you hold my hand.','Your kindness to everyone around you.','Your cute little habits.','How safe I feel with you.','The way you understand me without words.','Your love that makes every day special.','Every “I love you” from you.','You, my favorite person in the world.'].map(item => `<li>${item}</li>`).join('')}</ol><div class="memory-strip">${pageMemoryBits.cards}</div></div>`,
}
document.querySelectorAll('.envelope').forEach(button => button.addEventListener('click', () => {
  document.querySelector('#page-content').innerHTML = pageContent[button.dataset.page]
  document.querySelector('#page-modal').classList.remove('hidden')
  if (button.dataset.page === 'gallery') {
    let currentPhoto = 0
    const updateCarousel = () => {
      document.querySelector('#carousel-image').src = gallery[currentPhoto]
      document.querySelector('#carousel-image').alt = `A memory ${currentPhoto + 1}`
      document.querySelector('#carousel-caption').textContent = galleryCaptions[currentPhoto]
      document.querySelector('#carousel-count').textContent = `${String(currentPhoto + 1).padStart(2, '0')} / ${String(gallery.length).padStart(2, '0')}`
    }
    document.querySelectorAll('[data-carousel]').forEach(control => control.addEventListener('click', () => {
      currentPhoto = control.dataset.carousel === 'next' ? (currentPhoto + 1) % gallery.length : (currentPhoto - 1 + gallery.length) % gallery.length
      updateCarousel()
    }))
  }
}))
document.querySelector('#close-modal').addEventListener('click', () => document.querySelector('#page-modal').classList.add('hidden'))
const song = new Audio('/adhura%20(1).mp3')
song.loop = true
const musicButton = document.querySelector('#music-button')
musicButton.addEventListener('click', async event => {
  if (song.paused) {
    await song.play()
    event.currentTarget.classList.add('active')
    event.currentTarget.querySelector('span').textContent = 'music on'
  } else {
    song.pause()
    event.currentTarget.classList.remove('active')
    event.currentTarget.querySelector('span').textContent = 'our song'
  }
})
