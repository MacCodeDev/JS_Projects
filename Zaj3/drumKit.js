document.addEventListener('keypress', onKeyPress)
document.addEventListener('keypress', recordKeyPress)
document.querySelector('#firstRecordingButton').addEventListener('click', fun => {
    line = 1
    eventChose(line)
})
document.querySelector('#secondRecordingButton').addEventListener('click', fun => {
    line = 2
    eventChose(line)
})
document.querySelector('#thirdRecordingButton').addEventListener('click', fun => {
    line = 3
    eventChose(line)
})
document.querySelector('#fourthRecordingButton').addEventListener('click', fun => {
    line = 4
    eventChose(line)
})
document.querySelector('#firstLinePlayButton').addEventListener('click',fun => {
    playRecords(firstLineInstruments,firstLineTiming)
})
document.querySelector('#secondLinePlayButton').addEventListener('click',fun => {
    playRecords(secondLineInstruments,secondLineTiming)
})
document.querySelector('#thirdLinePlayButton').addEventListener('click',fun => {
    playRecords(thirdLineInstruments,thirdLineTiming)
})
document.querySelector('#fourthLinePlayButton').addEventListener('click',fun => {
    playRecords(fourthLineInstruments,fourthLineTiming)
})

document.querySelector('#allPlayButton').addEventListener('click',fun => {
    checkedLine()
})

let isPlaying = false
let isRecording = false
let line = 0
let instruments = []
let timing = []
let firstLineInstruments = []
let secondLineInstruments = []
let thirdLineInstruments = []
let fourthLineInstruments = []
let firstLineTiming = []
let secondLineTiming = []
let thirdLineTiming = []
let fourthLineTiming = []

const KeyToSound = {
    'a':document.querySelector('#s1'),
    's':document.querySelector('#s2'),
    'd':document.querySelector('#s3'),
    'f':document.querySelector('#s4'),
    'g':document.querySelector('#s5'),
    'h':document.querySelector('#s6'),
    'i':document.querySelector('#s7'),
    'j':document.querySelector('#s8'),
    'k':document.querySelector('#s9')
}

function onKeyPress(event){
    const sound = KeyToSound[event.key]
    playSound(sound)
}

function checkedLine(){
    if(document.getElementById('firstLinePlayCheckbox').checked) {
        playRecords(firstLineInstruments,firstLineTiming)
    }
    if(document.getElementById('secondLinePlayCheckbox').checked) {
        playRecords(secondLineInstruments,secondLineTiming)
    }
    if(document.getElementById('thirdLinePlayCheckbox').checked) {
        playRecords(thirdLineInstruments,thirdLineTiming)
    }
    if(document.getElementById('fourthLinePlayCheckbox').checked) {
        playRecords(fourthLineInstruments,fourthLineTiming)
    }
}

function recordKeyPress(event){
    if(isRecording !== false){
        const sound = KeyToSound[event.key]
        instruments.push(sound)
        timing.push(Date.now())
    }
}

function playSound(sound){
    sound.currentTime = 0
    sound.play()
}

function recordingInitialisation() {
    isRecording = true
    instruments.splice(0, instruments.length)
    timing.splice(0, timing.length)
}

function stopRecording() {
    isRecording = false
}

function eventChose() {
    if(isRecording === false)
    {
        recordingInitialisation()
    }
    else
    {
        if(line === 1){
            firstLineInstruments = instruments.slice()
            firstLineTiming = timing.slice()
        }
        else if(line === 2){
            secondLineInstruments = instruments.slice()
            secondLineTiming = timing.slice()
        }
        else if(line === 3){
            thirdLineInstruments = instruments.slice()
            thirdLineTiming = timing.slice()
        }
        else{
            fourthLineInstruments = instruments.slice()
            fourthLineTiming = timing.slice()
        }
        stopRecording()
    }
}

function playRecords(lineInstruments, lineTimer) {
        let checkTime = []
        lineTimer.forEach( time => checkTime.push(time - (lineTimer[0] - 1)))

        for (let index = 0; index < lineInstruments.length; index++) {
            setTimeout(() => {
                playSound(lineInstruments[index])
            }, checkTime[index])
        }
}