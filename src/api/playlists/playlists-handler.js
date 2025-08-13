class PlaylistsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postPlaylistHandler = this.postPlaylistHandler.bind(this);
  }

  async postPlaylistHandler(request, h) {
    this._validator.validateCreatePayload(request.payload);
    const { name } = request.payload;
    const { id: owner } = request.auth.credentials;
    const playlistId = await this._service.addPlaylist({
      name,
      owner,
    });

    const response = h.response({
      status: 'success',
      data: { playlistId },
    });
    response.code(201);
    return response;
  }
}

module.exports = PlaylistsHandler;
