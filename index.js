// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from "public" folder
app.use(express.static('public'));

app.use(cors());
app.use(express.json());

// Proxy endpoint for weather API
app.post('/weather', async (req, res) => {
  const city = req.body.city;

  if (!city) {
    return res.status(400).json({ error: 'City name is required' });
  }

  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city,
        units: 'metric',
        appid: process.env.API_KEY
      }
    });

    res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    res.status(status).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
