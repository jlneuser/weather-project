

const apiKey = "ee02afd279ba852f5518dbe94195f595";

// Variables to resuse
const searchButton = document.querySelector(".btn-primary");
const cityInput = document.querySelector(".form-control");
const weatherContainer = document.getElementById("weather-container");

// Search button

searchButton.addEventListener("click", async () => {
  const city = cityInput.value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }

  try {
    // current weather data
    const currentWeatherData = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
    ).then((response) => response.json());

    // 5-day forecast data
    const forecastData = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`
    ).then((response) => response.json());

    // Update weather container
    updateWeatherContainer(currentWeatherData, forecastData);
  } catch (error) {
    console.error("Error fetching weather data:", error);
    alert("Unable to fetch weather data. Please try again later.");
  }
});

function updateWeatherContainer(currentData, forecastData) {
  const currentIconUrl = `https://openweathermap.org/img/wn/${currentData.weather[0].icon}@2x.png`;

  const currentWeatherTemplate = `
    <div class="current-weather">
      <h2>Current Weather in ${currentData.name}</h2>
      <img src="${currentIconUrl}" alt="${currentData.weather[0].description}" />
      <p>Temperature: ${currentData.main.temp} °F</p>
      <p>Conditions: ${currentData.weather[0].description}</p>
    </div>
  `;

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const forecastByDay = {};

  // Group forecast data by day
  forecastData.list.forEach((entry) => {
    const date = new Date(entry.dt * 1000);
    const day = daysOfWeek[date.getDay()];

    if (!forecastByDay[day]) {
      forecastByDay[day] = [];
    }

    forecastByDay[day].push(entry);
  });

  let forecastTemplate = "<h2>5-Day Forecast</h2>";

  Object.keys(forecastByDay).slice(0, 5).forEach((day) => {
    const dayData = forecastByDay[day][0];
    const dayIconUrl = `https://openweathermap.org/img/wn/${dayData.weather[0].icon}@2x.png`;

    forecastTemplate += `
      <div class="forecast-day">
        <h3>${day}</h3>
        <img src="${dayIconUrl}" alt="${dayData.weather[0].description}" />
        <p>Temperature: ${dayData.main.temp} °F</p>
        <p>Conditions: ${dayData.weather[0].description}</p>
      </div>
    `;
  });

  weatherContainer.innerHTML = currentWeatherTemplate + forecastTemplate;
}


