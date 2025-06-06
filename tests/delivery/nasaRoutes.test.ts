import express from 'express';
import request from 'supertest';
import nunjucks from 'nunjucks';
import nasaRoutes from '../../src/delivery/nasaRoutes';
import getMeteorsData from '../../src/usecases/getMeteorsData';
import getApod from '../../src/usecases/getApod';

jest.mock('../../src/usecases/getMeteorsData');
jest.mock('../../src/usecases/getApod');

const mockedMeteors = getMeteorsData as jest.Mock;
const mockedApod = getApod as jest.Mock;

const createApp = () => {
  const app = express();
  nunjucks.configure('src/views', { express: app });
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(nasaRoutes);
  return app;
};

describe('nasaRoutes', () => {
  beforeEach(() => {
    mockedMeteors.mockReset();
    mockedApod.mockReset();
  });

  it('GET /meteors returns json from usecase', async () => {
    const app = createApp();
    mockedMeteors.mockResolvedValue({ count: 1 });

    const res = await request(app).get('/meteors?date=2024-01-01&count=true');

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ count: 1 });
    expect(mockedMeteors).toHaveBeenCalledWith({
      date: '2024-01-01',
      count: true,
      'were-dangerous-meteors': false
    });
  });

  it('GET /apod renders page', async () => {
    const app = createApp();
    mockedApod.mockResolvedValue({ title: 'APOD', url: 'img.jpg' });

    const res = await request(app).get('/apod');

    expect(res.status).toBe(200);
    expect(mockedApod).toHaveBeenCalled();
    expect(res.text).toContain('APOD');
  });
});
