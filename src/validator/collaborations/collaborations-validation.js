const InvariantError = require('../../error/invariant-error');
const {
  addCollaborationPayload,
  deleteCollaborationPayload,
} = require('./collaborations-schema');

const CollaborationsValidator = {
  validateAddPayload: (payload) => {
    const validationResult = addCollaborationPayload.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
  validateDeletePayload: (payload) => {
    const validationResult = deleteCollaborationPayload.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = CollaborationsValidator;
