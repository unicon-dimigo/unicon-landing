let current = 10000

function update () {
    if (current > 12062) current = 12062
    $('#main-img').attr('src', `./src/Main_${current}.png`)
}

$('.container').on('mousewheel', e => {
    const wheel = e.originalEvent.wheelDelta

    if (wheel < 0) { // scroll up
        for (let i=0; i<3; ++i) {
            current++
            update()
        }
    } else { // scroll down
        for (let i=0; i<3; ++i) {
            current--
            update()
        }
    }
    
})