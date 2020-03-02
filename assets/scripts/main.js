const frameStart = 100000000,
  frameCount = 2062,
  scrollSpeed = 3,
  loadCount = 59
let scrollEnabled = true
let main_img = $('.main-img')
let cursor_html = $('html')
let body = $('body')
let currentFrame = frameStart
let forced = false

function update() {
  if (currentFrame > frameStart + frameCount) currentFrame = frameStart + frameCount
  if (currentFrame < frameStart) currentFrame = frameStart
  main_img.attr('src', `./src/Main_${currentFrame}.jpg`)
}

function scrollBehavior(action) {
  for (let i = 0; i < scrollSpeed; ++i) {
    action()
    update()
  }
}

function framePreload(images) {
  const length = images.length
  images.forEach(value => {
    let image = new Image()
    image.src = value
  })
}

function changeFrame(frame) {
  if (!loadFinish) return
  currentFrame = frameStart + frame
  update()
}

function checkFrame(currentFrame){
  if((100000660 <= currentFrame && currentFrame <= 100000725)||(100000750 <= currentFrame && currentFrame <= 100000840)||(100000860 <= currentFrame && currentFrame <= 100000962)){
      cursor_html.css({'cursor': 'pointer'});
  }
  else{
      cursor_html.css({'cursor': 'default'});
  }
}


let frames = new Array()
for (let i = frameStart; i <= frameStart + frameCount; ++i) {
  frames.push(`./src/Main_${i}.jpg`)
}
framePreload(frames)

frames = new Array()
for (let i = frameStart * 10; i <= frameStart * 10 + loadCount; ++i) {
  frames.push(`./src/Load_${i}.jpg`)
}
framePreload(frames)


let loadStatus = frameStart * 10, loadFinish = false
const loadHandler = setInterval(() => {
  if (loadStatus <= frameStart * 10 + loadCount) {
    main_img.attr('src', `./src/Load_${loadStatus}.jpg`)
  } else {
    loadFinish = true
  }
  loadStatus++
}, 100);
setTimeout(() => {
  clearInterval(loadHandler)
}, 50000);

const uniFullpage = new fullpage('#fullpage', {
  anchors: ['0', '1', '2', '3'],
  onLeave(origin, destination, direction) {
    if (!loadFinish) return false
    if (forced) {
      forced = false
      return true
    }

    if (origin.anchor === '0' && 100000960 <= currentFrame) {
      scrollEnabled = false
      return true
    }
    if (origin.anchor === '1') {
      scrollEnabled = true
      currentFrame = 100000980
      return true
    }

    if (origin.anchor === '2' && currentFrame <= 100000970) {
      currentFrame = frameStart + frameCount
      return true
    }

    if (origin.anchor === '2' && currentFrame === 100002062) {
      return true
    }

    if (origin.anchor === '3') {
      currentFrame = 100002062
      return true
    }
    return false
  }
})

body.on('mousewheel', e => {
  if (!loadFinish || !scrollEnabled) return

  const wheel = e.originalEvent.wheelDelta
  checkFrame(currentFrame)
  if (wheel < 0) { // scroll up
    for (let i = 0; i < scrollSpeed; ++i) {
      scrollBehavior(() => { currentFrame++ })
    }
  } else { // scroll down
    for (let i = 0; i < scrollSpeed; ++i) {
      scrollBehavior(() => { currentFrame-- })
    }
  }
})

main_img.bind('click', () => {
  if (100000660 <= currentFrame && currentFrame <= 100000725) {
    window.open('https://unicon-dimigo.github.io/aim-landing')
  }
  if (100000750 <= currentFrame && currentFrame <= 100000840) {
    window.open('https://unicon-dimigo.github.io/anythingbe-landing')
  }
  if (100000860 <= currentFrame && currentFrame <= 100000962) {
    window.open('https://unicon-dimigo.github.io/unihack-landing')
  }
})

window.onload = function() {
    var filter = "win16|win32|win64|mac";

    if (navigator.platform && filter.indexOf(navigator.platform.toLowerCase()) = 0) {
        alert("모바일 기기에서 접속하셨습니다.\n기기를 가로로 회전시켜주세요.");
    }
}
