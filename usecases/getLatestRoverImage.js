const axios = require('axios');
const Exception = require('../utils/Exception');
const config = require('../config');

const getLatestRoverImage = async ({ userId, userName, userAPIKey }) => {
  if (!userId || !userName || !userAPIKey) {
    throw new Exception('userId, userName, and userAPIKey are required', 400);
  }

  const response = await axios.get(`${config.nasaApiUrlPhotos}`, {
    params: {
      api_key: userAPIKey
    }
  });
  
  const photos = response.data.latest_photos;
  
  if (!photos || photos.length === 0) {
    throw new Exception('No images found.', 404);
  }

  const latestImage = photos[0];

  return {
    userId,
    userName,
    latestImage: latestImage.img_src,
    rover: latestImage.rover.name,
    camera: latestImage.camera.full_name,
    earth_date: latestImage.earth_date
  };
};

module.exports = getLatestRoverImage;
