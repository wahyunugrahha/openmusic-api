const InvariantError = require('../../error/invariant-error');
const { CollaborationPayloadSchema } = require('./collaborations-schema');

const CollaborationsValidator = {
  validateCollaborationPayload: (payload) => {
    const validationResult = CollaborationPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};
module.exports = CollaborationsValidator;
