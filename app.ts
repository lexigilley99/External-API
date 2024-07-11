import express, { Request, Response } from 'express';
import axios, { AxiosResponse } from 'axios';

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('docs'));
app.use(cors());

// Interface for Weather Data
interface WeatherData {
  temperature: number;
  description: string;
  city: string;
}

app.post('/weather', async (req: Request<{ city: string }>, res: Response<WeatherData | string>) => {
  const { city } = req.query;
  const apiKey: string = process.env.API_KEY || '';

  try {
    const response: AxiosResponse<any> = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

    if (response.status !== 200) {
      throw new Error('Failed to fetch weather');
    }

    const weatherData: WeatherData = {
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      city: response.data.name
    };

    res.send(weatherData);
  } catch (error: any) {
    console.error('Error fetching weather data:', error.message);
    res.status(400).send('Error fetching weather data');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function cors(): any {
  throw new Error('Function not implemented.');
}

