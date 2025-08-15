const PlaylistActivitiesHandler = require('./playlist-activities-handler');
const routes = require('./playlist-activities-routes');

module.exports = {
  name: 'playlistActivities',
  version: '1.0.0',
  register: async (server, { playlistActivitiesService, playlistService }) => {
    const handler = new PlaylistActivitiesHandler(
      playlistActivitiesService,
      playlistService
    );
    server.route(routes(handler));
  },
};
