
async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const response = await fetch(`/api/weather?city=${city}`);
  const data = await response.json();

  if (response.ok) {
    document.getElementById('weatherResult').innerHTML = `
      <h2>${data.city}</h2>
      <p>${data.description}</p>
      <p>Temperature: ${data.temperature}</p>
      <p>Humidity: ${data.humidity}</p>
      <img src="${data.icon}" alt="weather icon">
    `;
  } else {
    document.getElementById('weatherResult').innerHTML = '<p>Error: ' + data.message + '</p>';
  }
}
