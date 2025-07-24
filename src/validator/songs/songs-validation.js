const InvariantError = require('../../error/invariant-error');
const { createSongValidation } = require('./songs-schema');

const SongsValidator = {
  validateCreatePayload: (payload) => {
    const validationResult = createSongValidation.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = SongsValidator;
