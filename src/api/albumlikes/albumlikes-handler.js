class AlbumLikesHandler {
  constructor(service, albumService) {
    this._service = service;
    this._albumService = albumService;

    this.postAlbumLikeHandler = this.postAlbumLikeHandler.bind(this);
    this.deleteAlbumLikeHandler = this.deleteAlbumLikeHandler.bind(this);
    this.getAlbumLikesHandler = this.getAlbumLikesHandler.bind(this);
  }

  async postAlbumLikeHandler(request, h) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumService.getAlbumById(albumId);
    await this._service.addAlbumLike(credentialId, albumId);

    const response = h.response({
      status: 'success',
      message: 'Berhasil menyukai album',
    });

    response.code(201);
    return response;
  }

  async deleteAlbumLikeHandler(request) {
    const { id: credentialId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumService.getAlbumById(albumId);
    await this._service.deleteAlbumLike(credentialId, albumId);

    return {
      status: 'success',
      message: 'Berhasil batal menyukai album',
    };
  }

  async getAlbumLikesHandler(request, h) {
    const { id: albumId } = request.params;

    await this._albumService.getAlbumById(albumId);
    const { count, source } = await this._service.getAlbumLikes(albumId);

    const response = h.response({
      status: 'success',
      data: {
        likes: count,
      },
    });

    if (source === 'cache') {
      response.header('X-Data-Source', 'cache');
    }

    return response;
  }
}

module.exports = AlbumLikesHandler;
