import axios from 'axios';
import config from '../config';

const searchNasaImages = async (query: string): Promise<any[]> => {
  const response = await axios.get(config.nasaApiUrlImages as string, {
    params: { q: query, media_type: 'image' },
  });
  return response.data.collection.items;
};

export default searchNasaImages;
