const axios = require("axios");
const Exception = require("../utils/Exception");
const config = require("../config");

const getMeteorsInfo = async (startDate, endDate) => {
  try {
    const url = `${config.nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${config.nasaApiKey}`;
    const response = await axios.get(url);
    return response.data.near_earth_objects;
  } catch (error) {
    throw new Exception("Error fetching data from NASA API", 502);
  }
};

module.exports = getMeteorsInfo;
