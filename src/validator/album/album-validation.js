const InvariantError = require('../../error/invariant-error');
const { createAlbumValidation } = require('./album-schema');

const AlbumValidator = {
  validateCreatePayload: (payload) => {
    const validationResult = createAlbumValidation.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumValidator;
