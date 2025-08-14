require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');

// Albums
const albums = require('./api/albums');
const AlbumsValidator = require('./validator/albums/albums-validation');
const AlbumService = require('./service/postgres/album-service');

// Songs
const songs = require('./api/songs');
const SongService = require('./service/postgres/song-service');
const SongsValidator = require('./validator/songs/songs-validation');

// ErrorHandling
const ClientError = require('./error/client-error');
// User
const users = require('./api/users');
const UsersService = require('./service/postgres/user-service');
const UsersValidator = require('./validator/users/users-validation');

// Authentications
const authentications = require('./api/authentications');
const AuthenticationsService = require('./service/postgres/authentications-service');
const AuthenticationsValidator = require('./validator/authentications/authentications-validation');
const TokenManager = require('./tokenize/token-manager');

// Playlist
const playlists = require('./api/playlists');
const PlaylistService = require('./service/postgres/playlist-service');
const PlaylistsValidator = require('./validator/playlists/playlists-validation');

// Collaborations
const CollaborationsValidator = require('./validator/collaborations/collaborations-validation');
const CollaborationService = require('./service/postgres/collaborations-service');
const collaborations = require('./api/collaborations');

const init = async () => {
  const songService = new SongService();
  const albumServices = new AlbumService(songService);
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const collaborationsService = new CollaborationService();
  const playlistsService = new PlaylistService(collaborationsService);

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
      plugin: Jwt,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
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
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        service: playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: CollaborationsValidator,
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
