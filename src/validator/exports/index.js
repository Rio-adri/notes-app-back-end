const InvariantError = require('../../exceptions/InvariantError');
const ExportNotesPayloadSchema = require('./schema');

const ExportsValidator = {
  validateExportNotesPayload: (payload) => {
    const result = ExportNotesPayloadSchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = ExportsValidator;
