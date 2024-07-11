"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
require('dotenv').config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('docs'));
app.use(cors());
app.post('/weather', async (req, res) => {
    const { city } = req.query;
    const apiKey = process.env.API_KEY || '';
    try {
        const response = await axios_1.default.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
        if (response.status !== 200) {
            throw new Error('Failed to fetch weather');
        }
        const weatherData = {
            temperature: response.data.main.temp,
            description: response.data.weather[0].description,
            city: response.data.name
        };
        res.send(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather data:', error.message);
        res.status(400).send('Error fetching weather data');
    }
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
function cors() {
    throw new Error('Function not implemented.');
}
