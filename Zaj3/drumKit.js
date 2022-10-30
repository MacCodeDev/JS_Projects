document.addEventListener('keypress', onKeyPress)

const KeyToSound = {
    'a':document.querySelector('#s1')
}

function onKeyPress(event){
    const sound = KeyToSound[event.key]
    playSound(sound)
}

function playSound(sound){
    sound.currentTime = 0
    sound.play()
}