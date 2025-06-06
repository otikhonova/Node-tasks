import axios from 'axios';
import config from '../config';

const getEonetEvents = async (): Promise<any[]> => {
  const response = await axios.get(config.nasaApiUrlEonet as string);
  return response.data.events;
};

export default getEonetEvents;
