import axios from 'axios';
import Exception from '../utils/Exception';
import config from '../config';
import { GetLatestRoverImageParams } from '../interfaces/GetLatestRoverImageParams';
import { RoverImage } from '../interfaces/RoverImage';

const getLatestRoverImage = async ({
  userId,
  userName,
  userAPIKey
}: GetLatestRoverImageParams): Promise<{
  userId: string;
  userName: string;
  latestImage: string;
  rover: string;
  camera: string;
  earth_date: string;
}> => {
  if (!userId || !userName || !userAPIKey) {
    throw new Exception('userId, userName, and userAPIKey are required', 400);
  }

  const response = await axios.get<{ latest_photos: RoverImage[] }>(`${config.nasaApiUrlPhotos}`, {
    params: {
      api_key: userAPIKey,
    },
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
    earth_date: latestImage.earth_date,
  };
};

export default getLatestRoverImage;
