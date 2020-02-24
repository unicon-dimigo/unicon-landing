const frameStart = 100000000,
    frameCount = 2062,
    scrollSpeed = 2

let currentFrame = frameStart

function update () {
    if (currentFrame > frameStart + frameCount) currentFrame = frameStart + frameCount
    if (currentFrame < frameStart) currentFrame = frameStart
    $('#main-img').attr('src', `./src/Main_${currentFrame}.jpg`)
}

function framePreload (images) {
    images.forEach(value => {
        let image = new Image()
        image.src = value
    })
}

function scrollBehavior (action) {
    for (let i=0; i<scrollSpeed; ++i) {
        action()
        update()
    }
}

update()

let frames = new Array()
for (let i=frameStart; i<=frameStart + frameCount; ++i) {
    frames.push(`./src/Main_${i}.jpg`)
}
framePreload(frames)

$('.container').on('mousewheel', e => {
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
