const cityName = document.querySelector('#cityName')
const inputCity = document.querySelector('#inputCity')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const photo = document.querySelector('.photo')
const cityButton = document.querySelector('#cityButton')
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=ccaf921bf5268d1c483f1d5a08148ea6&units=metric'
let ulList = document.querySelector('.list ul')
let newWeather, header, img, deleteBtn



const getInfo = () => {
    if (ulList.childElementCount < 10) {
        const city = inputCity.value || 'Warszawa'
        if(inputCity.value !== '')
        {
            localStorage.setItem('City' + ulList.childElementCount,inputCity.value)
        }
        const fullUrl = apiLink + city + apiKey
        fetchRequest(fullUrl)
    }
    else{
        alert('You can\'t have more than ten cities')
    }
}
function fetchRequest( url ) {
    fetch(url)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            const temperatureData = data.main.temp
            const weatherStatus = data.weather[0]
            const tempPhoto = 'http://openweathermap.org/img/wn/' + weatherStatus.icon + '@2x.png'
            addNewCity(data.name,Math.floor(temperatureData) + '℃',data.main.humidity + '%',tempPhoto)
            inputCity.value = ""
            console.log()
        })
        .catch(function() {
            alert('Not found')
        });
}
const checkKey = (x) =>{
    if(x.key === 'Enter'){
        getInfo()
    }
}

const addNewCity = (city,tempe,humid,imgSrc) => {
        newWeather = document.createElement('li')
        header = document.createElement('h2')
        newWeather.append(header)
        img = document.createElement('img')
        img.src = imgSrc
        newWeather.append(img)
        header.textContent = city

        const dataDiv  = document.createElement('div')
        dataDiv.classList.add('Weather-section')

        const dataDivTemp  = document.createElement('div')
        dataDivTemp.classList.add('Temp-section')

        const dataTempLabel  = document.createElement('h4')
        const dataTemp  = document.createElement('p')
        dataTempLabel.textContent = 'Temperature:'
        dataTemp.classList.add('temperature')
        dataTemp.textContent = tempe

        const dataDivHum  = document.createElement('div')
        dataDivHum.classList.add('Hum-section')

        const dataHumLabel  = document.createElement('h4')
        const dataHum  = document.createElement('p')
        dataHumLabel.textContent = 'Humidity:'
        dataHum.classList.add('humidity')
        dataHum.textContent = humid

        dataDivTemp.append(dataTempLabel)
        dataDivTemp.append(dataTemp)
        dataDivHum.append(dataHumLabel)
        dataDivHum.append(dataHum)
        dataDiv.append(dataDivHum)
        dataDiv.append(dataDivTemp)
        newWeather.append(dataDiv)
        deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.textContent = 'Delete City'
        newWeather.append(deleteBtn)
        ulList.append(newWeather)

}

const checkClick = e => {
    if(e.target.matches('.delete')){
        deleteCity(e)
    }
}

const deleteCity = (event) =>{
    const allCity = ulList.querySelectorAll('li')
    event.target.closest('li').remove()
    if(allCity.length === 0){
        alert('City list is empty!')
    }
}

ulList.addEventListener('click',checkClick)
inputCity.addEventListener('keyup', checkKey)
cityButton.addEventListener('click', getInfo)