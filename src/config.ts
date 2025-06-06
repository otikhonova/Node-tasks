import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nasaApiKey: string | undefined;
  nasaApiUrl: string | undefined;
  nasaApiUrlPhotos: string | undefined;
  port: string | number;
}

const config: Config = {
  nasaApiKey: process.env.NASA_API_KEY,
  nasaApiUrl: process.env.NASA_API_URL,
  nasaApiUrlPhotos: process.env.NASA_API_URL_PHOTOS,
  port: process.env.PORT || 4000,
};

export default config;