import axios from 'axios';
import config from '../config';

const getApod = async (): Promise<any> => {
  const response = await axios.get(config.nasaApiUrlApod as string, {
    params: { api_key: config.nasaApiKey },
  });
  return response.data;
};

export default getApod;
