const Joi = require('joi');

const createAlbumValidation = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().positive().required(),
});

module.exports = { createAlbumValidation };
