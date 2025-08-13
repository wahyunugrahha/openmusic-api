const PlaylistHandler = require('./playlists-handler');
const routes = require('./playlists-routes');

module.exports = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const playlistHandler = new PlaylistHandler(service, validator);
    server.route(routes(playlistHandler));
  },
};
