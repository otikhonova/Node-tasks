import dotenv from 'dotenv';

dotenv.config();

interface Config {
  nasaApiKey: string | undefined;
  nasaApiUrl: string | undefined;
  nasaApiUrlPhotos: string | undefined;
  nasaApiUrlApod: string | undefined;
  nasaApiUrlEpic: string | undefined;
  nasaApiUrlEonet: string | undefined;
  nasaApiUrlDonki: string | undefined;
  nasaApiUrlImages: string | undefined;
  port: string | number;
}

const config: Config = {
  nasaApiKey: process.env.NASA_API_KEY,
  nasaApiUrl: process.env.NASA_API_URL,
  nasaApiUrlPhotos: process.env.NASA_API_URL_PHOTOS,
  nasaApiUrlApod: process.env.NASA_API_URL_APOD,
  nasaApiUrlEpic: process.env.NASA_API_URL_EPIC,
  nasaApiUrlEonet: process.env.NASA_API_URL_EONET,
  nasaApiUrlDonki: process.env.NASA_API_URL_DONKI,
  nasaApiUrlImages: process.env.NASA_API_URL_IMAGES,
  port: process.env.PORT || 4000,
};

export default config;
