const AlbumLikesHandler = require('./albumlikes-handler');
const routes = require('./albumlikes-routes');

module.exports = {
  name: 'albumlikes',
  version: '1.0.0',
  register: async (server, { service, albumService }) => {
    const handler = new AlbumLikesHandler(service, albumService);
    server.route(routes(handler));
  },
};
