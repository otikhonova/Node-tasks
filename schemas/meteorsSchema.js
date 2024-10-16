const Joi = require("joi");

const meteorsSchema = Joi.object({
  date: Joi.string().isoDate().optional(),
  count: Joi.boolean().optional(),
  "were-dangerous-meteors": Joi.boolean().optional(),
});

module.exports = meteorsSchema;
