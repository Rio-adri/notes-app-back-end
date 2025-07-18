const AuthenticationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'authentications',
    version: '1.0.0',
    register: (server, { service, validator, tokenManager }) => {
        const authenticationsHandler = new AuthenticationsHandler(service.authenticationsService, service.usersService, tokenManager, validator);

        server.route(routes(authenticationsHandler));
    }
}