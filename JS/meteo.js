function getWeather() {
    const apiKey = '328bac352de1ceeba6f9f88c0d9ec6dd';
    const city = document.getElementById('city').value;

    if (!city) {
        alert('Please enter a city name');
        return;
    } 

    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const dailyForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error with current weather data:', error);
            alert('Error. Please try again.');
        });

    fetch(dailyForecastUrl)
        .then(response => response.json())
        .then(data => {
            displaydailyForecast(data.list);
        })
        .catch(error => {
            console.error('Error with daily forecast data:', error);
            alert('Error. Please try again.');
        });

}

function displayWeather(data) {
    const temperatureInfo = document.getElementById('temprature-info');
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDetails = document.getElementById('weather-details');
    const dailyForecastDiv = document.getElementById('daily-forecast');

    weatherInfo.innerHTML = '';
    weatherDetails.innerHTML = '';
    dailyForecastDiv.innerHTML = '';
    temperatureInfo.innerHTML = '';

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>${data.message}</p>`;
    } else {
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
        const windSpeed = data.wind.speed;
        const humidity = data.main.humidity;
        const tempMax = Math.round(data.main.temp_max - 273.15);
        const tempMin = Math.round(data.main.temp_min - 273.15);

        const temperatureHTML = `
            <p>${temperature}°C</p>
        `;

        const weatherHtml = `
            <p>${description}</p>
        `;

        const weatherDetailsHtml = `
            <p>Max Temp:<br> ${tempMax}°C</p>
            <p>Wind Speed:<br> ${windSpeed} m/s</p>
            <p>Mini Temp:<br> ${tempMin}°C</p>
            <p>Humidity:<br> ${humidity}%</p>
        `;

        temperatureInfo.innerHTML = temperatureHTML;
        weatherInfo.innerHTML = weatherHtml;
        weatherDetails.innerHTML += weatherDetailsHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }
}

function displaydailyForecast(dailyData) {
    const dailyForecastDiv = document.getElementById('daily-forecast');
    const nextFiveDays = dailyData.filter((item, index) => index % 8 === 0);

    nextFiveDays.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const day = dateTime.toDateString().split(' ')[0];
        const temperature = Math.round(item.main.temp - 273.15);
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;

        const dailyItemHtml = `
            <div class="daily-item">
                <span>${day}</span>
                <img src="${iconUrl}" alt="daily Weather Icon">
                <span>${temperature}°C</span>
            </div>
        `;

        dailyForecastDiv.innerHTML += dailyItemHtml;
    });
}


function showImage() {
    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.style.display = 'block';
}