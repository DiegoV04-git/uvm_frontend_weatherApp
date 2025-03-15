const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Serve static files (HTML, CSS, JS) from the 'public' folder

app.use(express.static('public'));

// Weather route to fetch weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.WEATHERSTACK_API_KEY;

    if(!city){
        return res.status(400).send({ error: 'City is required' });
    }

    try{
        const response = await axios.get('https://api.weatherstack.com/current', {
            params: {
                access_key: apiKey,
                query: city,
            },
        });

        const weatherData = response.data;

        if(weatherData.error){
            return res.status(400).send({ error: weatherData.error.info });
        }

         // Send weather data back to the frontend

        res.json(weatherData.current);
    } catch (error) {
        res.status(500).send({ error: 'Failed to fetch weather data'});
    }
});


// weather fact route to fetch a random weather fact


app.get('/fact', (req, res) => {

    const weatherFacts = [
        "The hottest temperature ever recorded on Earth was 56.7°C (134°F) in Furnace Creek Ranch, California, USA in 1913.",
        "The coldest temperature ever recorded on Earth was -89.2°C (-128.6°F) in Vostok Station, Antarctica in 1983.",
        "The highest rainfall recorded in a year was 26,471 mm (1,042.7 in) in Mawsynram, India.",
        "The largest hailstone ever recorded in the US weighed 1.93 kg (4.25 pounds) and fell in Vivian, South Dakota in 2010.",
        "A single bolt of lightning can reach temperatures hotter than the surface of the sun, up to 30,000 Kelvin (53,540°F)."
    ];

    const randomIndex = Math.floor(Math.random() * weatherFacts.length);
    const randomFact = weatherFacts[randomIndex]
    console.log("Selected fact:", randomFact);

    res.json({
        success: true,
        fact: randomFact
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });