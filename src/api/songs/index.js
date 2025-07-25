const AlbumsHandler = require('../albums/handler');
const routes = require('../albums/routes');

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const songHandler = new AlbumsHandler(service, validator);
    server.route(routes(songHandler));
  },
};
