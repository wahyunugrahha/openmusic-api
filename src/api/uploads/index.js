const UploadsHandler = require('./uploads-handler');
const routes = require('./uploads-routes');

module.exports = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { service, validator, albumService }) => {
    const uploadsHandler = new UploadsHandler(service, validator, albumService);
    server.route(routes(uploadsHandler));
  },
};
