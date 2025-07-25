require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumsValidator = require('./validator/albums/albums-validation');
const AlbumService = require('./service/postgres/AlbumService');
const ClientError = require('./error/client-error');
const songs = require('./api/songs');
const SongService = require('./service/postgres/SongService');
const SongsValidator = require('./validator/songs/songs-validation');

const init = async () => {
  const songService = new SongService();
  const albumServices = new AlbumService(songService);
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });
  await server.register([
    {
      plugin: albums,
      options: {
        service: albumServices,
        validator: AlbumsValidator,
      },
    },
    {
      plugin: songs,
      options: {
        service: songService,
        validator: SongsValidator,
      },
    },
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    if (response instanceof Error) {
      if (response instanceof ClientError) {
        const newResponse = h.response({
          status: 'fail',
          message: response.message,
        });
        newResponse.code(response.statusCode);
        return newResponse;
      }

      if (!response.isServer) {
        return h.continue;
      }

      console.error(response); 
      const newResponse = h.response({
        status: 'error',
        message: 'terjadi kegagalan pada server kami', 
      });
      newResponse.code(500);
      return newResponse;
    }

    return h.continue;
  });
  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
