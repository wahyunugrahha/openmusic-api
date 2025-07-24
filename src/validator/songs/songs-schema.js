const Joi = require('joi');

const createSongValidation = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().positive().required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().optional(),
  albumId: Joi.string().optional(),
});

module.exports = { createSongValidation };
