const axios = require('axios');

const getMeteorsInfo = async (startDate, endDate) => {
  const nasaToken = process.env.NASA_API_KEY;
  const nasaApiUrl = process.env.NASA_API_URL;

  const url = `${nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${nasaToken}`;

  const response = await axios.get(url);
  return response.data.near_earth_objects[startDate];
};

module.exports = getMeteorsInfo;
