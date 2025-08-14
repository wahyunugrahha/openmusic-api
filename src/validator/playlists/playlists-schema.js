const Joi = require('joi');

const createPlaylistValidation = Joi.object({
  name: Joi.string().required(),
});
const addSongToPlaylistValidation = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { createPlaylistValidation, addSongToPlaylistValidation };
