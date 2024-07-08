const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

app.post('/weather', async (req, res) => {
  const { city } = req.body;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather');
    }
    
    const weatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      city: response.data.name
    };

    res.send(weatherData);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    res.status(400).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


