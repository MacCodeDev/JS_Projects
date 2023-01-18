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
let recordingClassButton = document.querySelectorAll('.recordsButtons')
console.log(recordingClassButton)
const recordStop = (buttonNumber) => {
    let tmp = recordingClassButton.item(buttonNumber).value.split(" ")
    if(tmp[0] !== "Stop")
    {
        recordingClassButton.item(buttonNumber).value = "Stop record line " + (buttonNumber + 1)
    }
    else
    {
        recordingClassButton.item(buttonNumber).value = "Record line " + (buttonNumber + 1)
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

document.addEventListener("keydown", function(event) {
    let keys = document.querySelectorAll('.key')
    let tmp = 0
    let newTmp = 0
    let check = false
    console.log(event.code.split("y")[1])
    keys.forEach(function(element) {
        if(element.lastElementChild.innerText === event.code.split("y")[1])
        {
            check = true
            newTmp = tmp
        }
        tmp++
    });
    if (check === true) {
        keys[newTmp].style.backgroundColor = "rgba(102, 217, 251, 0.4)";
        setTimeout(function() {
            keys[newTmp].style.backgroundColor = "rgba(234, 62, 114, 0.4)";
        }, 50);
    }
});