import axios from 'axios';
import config from '../config';

const getEpicImages = async (): Promise<any[]> => {
  const response = await axios.get(config.nasaApiUrlEpic as string, {
    params: { api_key: config.nasaApiKey },
  });
  return response.data;
};

export default getEpicImages;
