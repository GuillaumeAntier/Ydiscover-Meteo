const fetch = require('node-fetch');

async function getWeather(cityName, apiKey) {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`);
    const data = await response.json();
    return data;
}

getWeather('city_name', 'your_api_key')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
