import getLatestRoverImage from '../../src/usecases/getLatestRoverImage';
import Exception from '../../src/utils/Exception';
import axios from 'axios';

jest.mock('axios');
jest.mock('../../src/config', () => ({
  default: { nasaApiUrlPhotos: 'http://example.com/photos' }
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('getLatestRoverImage', () => {
  beforeEach(() => {
    mockedAxios.get.mockReset();
  });

  it('throws if required params are missing', async () => {
    await expect(getLatestRoverImage({} as any)).rejects.toBeInstanceOf(Exception);
  });

  it('throws when no images are found', async () => {
    mockedAxios.get.mockResolvedValue({ data: { latest_photos: [] } });
    await expect(
      getLatestRoverImage({ userId: '1', userName: 'test', userAPIKey: 'key' })
    ).rejects.toBeInstanceOf(Exception);
  });

  it('returns latest image data', async () => {
    const photo = {
      img_src: 'img.jpg',
      rover: { name: 'Curiosity' },
      camera: { full_name: 'Front Hazard Avoidance Camera' },
      earth_date: '2024-01-01'
    };
    mockedAxios.get.mockResolvedValue({ data: { latest_photos: [photo] } });

    const result = await getLatestRoverImage({
      userId: '1',
      userName: 'Alice',
      userAPIKey: 'key'
    });

    expect(result).toEqual({
      userId: '1',
      userName: 'Alice',
      latestImage: 'img.jpg',
      rover: 'Curiosity',
      camera: 'Front Hazard Avoidance Camera',
      earth_date: '2024-01-01'
    });
  });
});
