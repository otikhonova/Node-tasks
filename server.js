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

    const filteredData = response.data.near_earth_objects[startDate].map((meteor) => {
        return {
          id: meteor.id,
          name: meteor.name,
          diameter_meters: meteor.estimated_diameter.meters.estimated_diameter_max,
          is_potentially_hazardous_asteroid: meteor.is_potentially_hazardous_asteroid,
          close_approach_date_full: meteor.close_approach_data[0].close_approach_date_full,
          relative_velocity_kps: meteor.close_approach_data[0].relative_velocity.kilometers_per_second
        };
      });
  
      res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data from NASA API:', error);
    res.status(500).json({ error: 'Error fetching data from NASA API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
