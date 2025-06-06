import validateRequest from '../../src/middlewares/validateRequest';
import Joi from 'joi';

describe('validateRequest middleware', () => {
  const schema = Joi.object({ name: Joi.string().required() });

  const getMockReqRes = (body: any = {}, query: any = {}) => {
    const req = { body, query } as any;
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    } as any;
    const next = jest.fn();
    return { req, res, next };
  };

  it('calls next when validation passes', () => {
    const { req, res, next } = getMockReqRes({ name: 'test' });
    validateRequest(schema)(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  it('returns 400 when validation fails', () => {
    const { req, res, next } = getMockReqRes({});
    validateRequest(schema)(req, res, next);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).not.toHaveBeenCalled();
  });
});
