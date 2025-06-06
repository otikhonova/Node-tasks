import getApod from '../../src/usecases/getApod';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../src/config', () => ({
  __esModule: true,
  default: { nasaApiUrlApod: 'http://example.com/apod', nasaApiKey: 'key' }
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getApod', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('calls NASA APOD endpoint and returns data', async () => {
    mockedAxios.get.mockResolvedValue({ data: { title: 'APOD' } });

    const result = await getApod();

    expect(mockedAxios.get).toHaveBeenCalledWith('http://example.com/apod', {
      params: { api_key: 'key' }
    });
    expect(result).toEqual({ title: 'APOD' });
  });
});
