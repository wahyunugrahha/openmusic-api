const Joi = require('joi');

const createAlbumValidation = Joi.object({
  id: Joi.number().min(1).positive().required(),
  title: Joi.string().required(),
  year: Joi.number().positive().required(),
});
