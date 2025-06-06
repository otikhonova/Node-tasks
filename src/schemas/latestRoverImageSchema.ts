import Joi from 'joi';

const latestRoverImageSchema = Joi.object({
  userId: Joi.string().required(),
  userName: Joi.string().required(),
  userAPIKey: Joi.string().required(),
});

export default latestRoverImageSchema;

