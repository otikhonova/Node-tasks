require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 4000;

app.get('/meteors', async (req, res) => {
  try {
    const nasaToken = process.env.NASA_API_KEY;
    const apiUrl = process.env.NASA_API_URL;
    const startDate = process.env.START_DATE;
    const endDate = process.env.END_DATE;

    const url = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${nasaToken}`;

    const response = await axios.get(url);

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from NASA API:', error);
    res.status(500).json({ error: 'Error fetching data from NASA API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
