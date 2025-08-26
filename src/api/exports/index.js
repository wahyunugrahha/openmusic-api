const ExportsHandler = require('./exports-handler');
const routes = require('./exports-routes');

module.exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (
    server,
    { playlistsService, ProducerService, validator }
  ) => {
    const handler = new ExportsHandler(
      playlistsService,
      ProducerService,
      validator
    );
    server.route(routes(handler));
  },
};
