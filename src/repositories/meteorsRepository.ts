import axios from 'axios';
import Exception from '../utils/Exception';
import config from '../config';

interface NearEarthObjects {
  [key: string]: any;
}

const getMeteorsInfo = async (startDate: string, endDate: string): Promise<NearEarthObjects> => {
  try {
    const url = `${config.nasaApiUrl}?start_date=${startDate}&end_date=${endDate}&api_key=${config.nasaApiKey}`;
    const response = await axios.get(url);
    return response.data.near_earth_objects;
  } catch (error) {
    throw new Exception("Error fetching data from NASA API", 502);
  }
};

export default getMeteorsInfo;
