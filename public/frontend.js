document.addEventListener('DOMContentLoaded', async () => {
  const introInfo = document.getElementById('intro-info');
  const factElement = document.getElementById('weather-fact');

  // Fetch the weather fact and display it in the intro section

  try{
    const factResponse = await fetch('/fact');
    if(!factResponse.ok){
      throw new Error('Failed to fetch weather fact');
    }

    const factData = await factResponse.json();
    console.log(factData);

    factElement.textContent = `🌎 Fact: ${factData.fact}`;
  } catch (error){
    factElement.textContent = "Could not load a weather fact. Try again later!";
  }
});

document.getElementById('get-weather-btn').addEventListener("click", async () => {
  const city = document.getElementById('city').value;
  const weatherDisplay = document.getElementById('weather-display');
  const cityNameElement = document.getElementById('cityName');
  const factElement = document.getElementById('weather-fact');
  const introInfo = document.getElementById('intro-info');
  const weatherForm = document.querySelector('.weather-form');

  if(!city){
    alert('Please enter a city name');
    weatherDisplay.style.display = 'none'
    return;
  }

  introInfo.style.display = 'none'
  cityNameElement.textContent = '';
  weatherDisplay.style.display = 'none';



  //GET request to the backend's weather endpoint
  try {

    const response = await fetch(`/weather?city=${city}`);

    if(!response.ok){
      throw new Error('Please enter an existing city');
    }

    const weatherData = await response.json();

    



    console.log(weatherData);

    document.getElementById('cityName').textContent = city;
    document.getElementById('temperature').textContent = weatherData.temperature + "°C";
    document.getElementById('description').textContent = weatherData.weather_descriptions[0];
    document.getElementById('feelsLike').textContent = weatherData.feelslike + "°C";
    document.getElementById('humidity').textContent = weatherData.humidity + "%";
    document.getElementById('windSpeed').textContent = weatherData.wind_speed + " Km/h";
    document.getElementById('windDirection').textContent = weatherData.wind_dir;
    document.getElementById('pressure').textContent = weatherData.pressure + " mb";
    document.getElementById('visibility').textContent = weatherData.visibility + " Km";
    document.getElementById('uvIndex').textContent = weatherData.uv_index;
    document.getElementById('sunrise').textContent = weatherData.sunrise;
    document.getElementById('sunset').textContent = weatherData.sunset;

    document.getElementById('weather-display').style.display = 'block';
  } catch (error) {
    alert('Error fetching weather data: ' + error);
  }
});