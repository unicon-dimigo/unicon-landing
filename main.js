const frameStart = 100000000,
    frameCount = 2062,
    scrollSpeed = 2

let currentFrame = frameStart

function update () {
    if (currentFrame > frameStart + frameCount) currentFrame = frameStart + frameCount
    if (currentFrame < frameStart) currentFrame = frameStart
    $('#main-img').attr('src', `./src/Main_${currentFrame}.jpg`)
}

function scrollBehavior (action) {
    for (let i=0; i<scrollSpeed; ++i) {
        action()
        update()
    }
}

function framePreload (images) {
    const length = images.length
    images.forEach((value, index) => {
        let image = new Image()
        image.src = value
    })
}

function enterFullscreen () {
    document.body.requestFullscreen()
    $('#button-fullscreen').hide()
}

let frames = new Array()
for (let i=frameStart; i<=frameStart + frameCount; ++i) {
    frames.push(`./src/Main_${i}.jpg`)
}
framePreload(frames)

let loadStatus = 1000000000, loadFinish = false
const loadHandler = setInterval(() => {
    if (loadStatus <= 1000000060) {
        $('#main-img').attr('src', `./src/Load_${loadStatus}.jpg`)
    } else {
        loadFinish = true
    }
    loadStatus++
}, 100);
setTimeout(() => {
    clearInterval(loadHandler)
}, 50000);

$('.container').on('mousewheel', e => {
    if (!loadFinish) return

    const wheel = e.originalEvent.wheelDelta

    if (wheel < 0) { // scroll up
        for (let i=0; i<scrollSpeed; ++i) {
            scrollBehavior(() => { currentFrame++ })
        }
    } else { // scroll down
        for (let i=0; i<scrollSpeed; ++i) {
            scrollBehavior(() => { currentFrame-- })
        }
    }
})

$('#main-img').bind('click', () => {
    if (100000660 <= currentFrame && currentFrame <= 100000730) {
        window.open('https://unicon-dimigo.github.io/aim-landing')
    }
})
