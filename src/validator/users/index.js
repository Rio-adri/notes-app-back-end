const InvariantError = require('../../exceptions/InvariantError');
const { UsersSchema } = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const result = UsersSchema.validate(payload);

    if (result.error) {
      throw new InvariantError(result.error.message);
    }
  },
};

module.exports = UsersValidator;
