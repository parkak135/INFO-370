
const express = require('express');
const fetch = require('node-fetch');
require('dotenv').config();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/api/weather', async (req, res) => {
  const city = req.query.city;
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      res.json({
        city: data.name,
        temperature: `${data.main.temp}°F`,
        description: data.weather[0].description,
        humidity: `${data.main.humidity}%`,
        icon: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
      });
    } else {
      res.status(400).json({ message: data.message });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
