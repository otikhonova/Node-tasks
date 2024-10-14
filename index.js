require('dotenv').config();
const axios = require('axios');

const nasaToken = process.env.NASA_API_KEY;
const apiUrl = process.env.NASA_API_URL;
const startDate = process.env.START_DATE;
const endDate = process.env.END_DATE;

const url = `${apiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${nasaToken}`;

axios.get(url)
  .then(response => {
    const data = response.data;
    console.log(`Number of asteroids:`, Object.keys(data.near_earth_objects).length);
  })
  .catch(error => {
    console.error('Error while receiving data:', error);
  });
