document.getElementById('weatherForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const city = document.getElementById('cityInput').value;
  
    try {
      const response = await axios.post('/weather', { city });
      const weatherResults = document.getElementById('weatherResults');
      weatherResults.innerHTML = `
        <h2>Weather in ${response.data.city}</h2>
        <p><strong>Temperature:</strong> ${response.data.temperature}°C</p>
        <p><strong>Description:</strong> ${response.data.description}</p>
      `;
    } catch (error) {
      console.error('Error fetching weather data', error);
      alert('Error fetching weather data. Please try again.');
    }
  });
  
  