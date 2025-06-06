import getMeteorsData from '../../src/usecases/getMeteorsData';
import Exception from '../../src/utils/Exception';

jest.mock('../../src/repositories/meteorsRepository', () => jest.fn());
import getMeteorsInfo from '../../src/repositories/meteorsRepository';

const mockedRepo = getMeteorsInfo as jest.Mock;

describe('getMeteorsData', () => {
  beforeEach(() => {
    mockedRepo.mockReset();
  });

  it('throws if date is missing', async () => {
    await expect(getMeteorsData({} as any)).rejects.toBeInstanceOf(Exception);
  });

  it('returns count when count=true', async () => {
    const sampleMeteor = {
      id: '1',
      name: 'Meteor',
      estimated_diameter: { meters: { estimated_diameter_max: 1 } },
      is_potentially_hazardous_asteroid: false,
      close_approach_data: [
        {
          close_approach_date_full: '2024-01-01',
          relative_velocity: { kilometers_per_second: '10' }
        }
      ]
    };
    mockedRepo.mockResolvedValue({ '2024-01-01': [sampleMeteor] });
    const result = await getMeteorsData({ date: '2024-01-01', count: true });
    expect(result).toEqual({ count: 1 });
  });
});
