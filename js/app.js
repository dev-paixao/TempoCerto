const API_KEY = 'd451709b75a068a06948bce41fd8165c';
const locationForm = document.querySelector('form');
const weatherData = document.querySelector('#weather-data');
const weatherDescription = document.querySelector('#weather-description');

locationForm.addEventListener('submit', handleFormSubmit);

async function handleFormSubmit(e) {
  e.preventDefault();
  const city = document.querySelector('#city').value.trim();
  const country = document.querySelector('#country').value.trim();

  if (!city || !country) {
    return displayError('Please enter a city and a country');
  }

  try {
    const data = await getWeatherData(city, country);
    displayWeatherData(data.temperature);
    displayWeatherDescription(data.description, data.iconUrl);
  } catch (error) {
    displayError('Failed to retrieve weather data. Please try again.');
    console.error(error);
  }
}

async function getWeatherData(city, country) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric&lang=pt`;

  const response = await fetch(apiUrl);

  if (!response.ok) {
    throw new Error(`Failed to retrieve weather data: ${response.status}`);
  }

  const data = await response.json();
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/w/${iconCode}.png`;

  return { temperature, description, iconUrl };
}

function displayWeatherData(temperature) {
  weatherData.innerHTML = `<p>Temperatura: ${temperature}°C</p>`;
}

function displayWeatherDescription(description, iconUrl) {
  weatherDescription.innerHTML = `
    <img src="${iconUrl}" alt="${description}">
    <p>${description}</p>
  `;
}

function displayError(message) {
  weatherData.innerHTML = `<p>${message}</p>`;
  weatherDescription.innerHTML = '';
}
