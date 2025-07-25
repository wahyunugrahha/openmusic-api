const InvariantError = require('../../error/invariant-error');
const { createAlbumValidation } = require('./albums-schema');

const AlbumsValidator = {
  validateCreatePayload: (payload) => {
    const validationResult = createAlbumValidation.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
