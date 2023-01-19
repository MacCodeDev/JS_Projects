const cityName = document.querySelector('#cityName')
const inputCity = document.querySelector('#inputCity')
const temperature = document.querySelector('.temperature')
const humidity = document.querySelector('.humidity')
const photo = document.querySelector('.photo')
const cityButton = document.querySelector('#cityButton')
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&appid=ccaf921bf5268d1c483f1d5a08148ea6&units=metric'

const weatherInfo = () =>{
    const fullUrl = apiLink + 'Krakow' + apiKey
}

const getInfo = () => {
    const city = inputCity.value || 'Warszawa'
    const fullUrl = apiLink + city + apiKey
    fetchRequest(fullUrl)
}
getInfo()
function fetchRequest( url ) {
    fetch(url)
        .then(function(resp) { return resp.json() })
        .then(function(data) {
            const temperatureData = data.main.temp
            const weatherStatus = data.weather[0]
            console.log(data.weather[0])
            temperature.textContent =  Math.floor(temperatureData) + '℃'
            humidity.textContent = data.main.humidity + '%'
            cityName.textContent = data.name
            photo.src = 'http://openweathermap.org/img/wn/' + weatherStatus.icon + '@2x.png'
            inputCity.value = ""
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
inputCity.addEventListener('keyup', checkKey)
cityButton.addEventListener('click', getInfo)