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
        newWeather.append(dataDiv)
        const dataTemp  = document.createElement('p')
        dataTemp.classList.add('temperature')
        dataTemp.textContent = tempe
        dataDiv.append(dataTemp)
        const dataHum  = document.createElement('p')
        dataHum.classList.add('humidity')
        dataHum.textContent = humid
        dataDiv.append(dataHum)
        deleteBtn = document.createElement('button')
        deleteBtn.classList.add('delete')
        deleteBtn.textContent = 'test'
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