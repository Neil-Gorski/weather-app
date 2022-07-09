let weatherForm = document.querySelector(".weather__form")
let weatherCity = document.querySelector(".weather__city")
let weatherApi = document.querySelector(".weather__api")
let APIURL = "https://api.weatherapi.com/v1/forecast.json?key=885c4a75899c40fbbc474057220907&aqi=yes&days=4&q="

weatherForm.addEventListener("submit", (event) => {
    event.preventDefault()

    let city = weatherCity.value

    if (city === ""){
        weatherCity.style.border= "2px solid red"
        weatherApi.innerHTML = ""
        return false
    }

    weatherCity.style.border= "none"
    let fullAPIURL = APIURL + city
    
    fetch(fullAPIURL)
        .then(response => response.json())
        .then(data => {
            hideLoader()
            let view = ''
            view += `<div class="weather__mainInfo">`
            view += `<div class="weather__temp">
                <span class="degree">${data.current.temp_c}</span>
                <span class="unit">&deg;C</span>
            </div>`
            view += `<div class="weather__icon">
            <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
            </div>`
            view += `<div class="weather__data">
            <p>The amount of rainfall: <b>${data.current.precip_mm}mm</b></p>
            <p>Humidity: <b>${data.current.humidity} %</b></p>
            <p>Wind: <b>${data.current.wind_kph} km/h</b></p>
            </div>`
            view += `</div>`



            // next days

            view += `<h2 class="weather__next">Next days weather: </h2>`
            view += `<div class="weather__days">`
            // single day
            data.forecast.forecastday.forEach((day)=> {
                view += `<div class="weather__day">`
                view += `<div class="weather__date">${day.date}</div>`
                view += `<div class="weather__icon">
                <img src="${day.day.condition.icon}" alt="${day.day.condition.text}"</div>`
                view += `</div>`
                view += `<div class="weather__avg">${day.day.avgtemp_c} &deg;C</div>`
                view += `</div>`
            })

            view += `</div>`
            weatherApi.innerHTML = view
            
    })
})