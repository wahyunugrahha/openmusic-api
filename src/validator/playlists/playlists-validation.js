const InvariantError = require('../../error/invariant-error');
const { createPlaylistValidation, addSongToPlaylistValidation } = require('./playlists-schema');

const PlaylistsValidator = {
  validateCreatePayload: (payload) => {
    const validationResult = createPlaylistValidation.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateAddSongPayload: (payload) => {
    const validationResult = addSongToPlaylistValidation.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistsValidator;
