import axios from 'axios';
import config from '../config';

const getDonkiNotifications = async (): Promise<any[]> => {
  const response = await axios.get(`${config.nasaApiUrlDonki}/notifications`, {
    params: { api_key: config.nasaApiKey },
  });
  return response.data;
};

export default getDonkiNotifications;
