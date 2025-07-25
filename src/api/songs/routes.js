const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.addSongHandler,
  },
  {
    method: 'GET',
    path: '/songs/',
    handler: handler.getSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getSongByIdHandler,
  },
  // {
  //   method: 'PUT',
  //   path: '/songs/{id}',
  //   handler: handler.putAlbumByIdHandler,
  // },
  //   {
  //     method: 'DELETE',
  //     path: '/songs/{id}',
  //     handler: handler.deleteAlbumByIdHandler,
  //   },
];

module.exports = routes;
