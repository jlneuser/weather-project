document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.form-control');
  const button = document.querySelector('.btn');
  const container = document.querySelector('#weather-container');

  button.addEventListener('click', () => {

    const apiKey = 'ee02afd279ba852f5518dbe94195f595';
    const cityInput = input.value.toLowerCase().trim();

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`)
      .then(response => {
        if (!response) {
          throw new Error(`City not found: ${response.statusText}`);
        }
          return response.json()

      })
      .then(data => {

        const weatherDiv = document.createElement('div'); // Correctly use document.createElement
weatherDiv.innerHTML = `
  <h3>Weather in ${data.name}</h3>
  <p>${data.weather[0].description}</p>
  <p>Temperature: ${data.main.temp}°C</p>
  <p>Feels like: ${data.main.feels_like}°C</p>
`;
container.innerHTML = '';
container.appendChild(weatherDiv);

      
      })
      .catch(error => console.error('Uh oh...', error));
  });
});
