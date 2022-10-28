let counter = 1;
let switchN = 1;
const allRadio = document.querySelectorAll('.radioClass')
console.log(allRadio)
const startStop = () => {
    const item = document.querySelector("#pauseBtn")
    if(switchN === 0)
    {
        item.firstChild.data = "pause_circle"
        switchN = 1
    }
    else
    {
        item.firstChild.data = "play_circle"
        switchN = 0
    }
}
const Next = () => {
    counter++
    if(counter > 3)
    {
        counter = 0
    }
    allRadio[counter].checked = true
}

const Back = () => {
    if(counter > 3)
    {
        counter = 3
    }
    counter--
    if(counter < 0)
    {
        counter = 3
    }
    allRadio[counter].checked = true
}

const autoSwitch = () =>{
    if(switchN !== 0)
    {
        allRadio[counter].checked = true
        counter++;
        if(counter > 3){
            counter = 0
        }
    }
}

setInterval(autoSwitch, 3000);

