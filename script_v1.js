document.getElementById('getWeatherBtn').addEventListener('click', getWeather);
document.getElementById('showInfoBtn').addEventListener('click', showInfo);

async function getWeather() {
  let cityInput = document.getElementById('cityInput').value;
  if (!cityInput) {
    showError('Please fill the city name.');
    return;
  }

  cityInput = capitalizeFirstLetter(cityInput); // Capitalize first letter of the city name
  
  try {
    const apiKey = '7a1fc6814a4b33c25515f6f3248a7e48'; // Replace with your OpenWeatherMap API key
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
    const data = await response.json();

    const weatherInfo = document.getElementById('weatherInfo');
    if (data.cod === '404') {
      showError('City not found');
    } else {
      const weatherDescription = data.weather[0].description;
      const temperature = data.main.temp;

      weatherInfo.innerHTML = `<p>Weather: ${weatherDescription}</p><p>Temperature: ${temperature}°C</p>`;
    }
  } catch (error) {
    showError('Failed to get weather data. Please try again later.');
  }
}

function showInfo() {
  const cityInput = document.getElementById('cityInput').value;
  if (!cityInput) {
    showError('Please fill the city name.');
    return;
  }
  
  const infoDisplay = document.getElementById('infoDisplay');
  const weatherInfo = document.getElementById('weatherInfo').innerHTML;
  
  if (weatherInfo.includes('hot')) {
    infoDisplay.innerHTML = 'It\'s hot now. Take care!';
  } else if (weatherInfo.includes('cold')) {
    infoDisplay.innerHTML = 'It\'s cold now. Bundle up!';
  } else if (weatherInfo.includes('haze')) {
    infoDisplay.innerHTML = 'Haze alert. Be cautious!';
  } else {
    showError('Weather information not available. Please try again later.');
    infoDisplay.innerHTML = '';
  }
  infoDisplay.style.display = 'block';
}

function showError(message) {
  const weatherInfo = document.getElementById('weatherInfo');
  weatherInfo.innerHTML = message;
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
