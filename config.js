require('dotenv').config();

const config = {
  nasaApiKey: process.env.NASA_API_KEY,
  nasaApiUrl: process.env.NASA_API_URL,
  nasaApiUrlPhotos: process.env.NASA_API_URL_PHOTOS,
  port: process.env.PORT || 4000
};

module.exports = config;