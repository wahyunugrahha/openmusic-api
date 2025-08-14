const CollaborationsHandler = require('./collaborations-handler');
const routes = require('./collaborations-routes');

module.exports = {
  name: 'collaborations',
  version: '1.0.0',
  register: async (
    server,
    { collaborationService, playlistService, usersService, validator }
  ) => {
    const handler = new CollaborationsHandler(
      collaborationService,
      playlistService,
      usersService,
      validator
    );
    server.route(routes(handler));
  },
};
