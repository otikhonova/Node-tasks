const axios = require("axios");
const config = require('../config');

const getMeteorsInfo = async (startDate, endDate) => {
  const url = `${config.nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${config.nasaApiKey}`;
  const response = await axios.get(url);
  return response.data.near_earth_objects[startDate];
};

module.exports = getMeteorsInfo;
