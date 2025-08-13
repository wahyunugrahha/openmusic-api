const Joi = require('joi');

const createPlaylistValidation = Joi.object({
  name: Joi.string().required(),
});

module.exports = {createPlaylistValidation};
