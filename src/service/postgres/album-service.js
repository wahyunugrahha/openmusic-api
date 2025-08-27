const { Pool } = require('pg');
const { mapAlbumDBToModel } = require('../../utils/utils-albums');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class AlbumService {
  constructor(songService, storageService, albumLikesService) {
    this._pool = new Pool();
    this._songService = songService;
    this._storageService = storageService;
    this._albumLikesService = albumLikesService;
  }
  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan album');
    }

    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }
    const album = result.rows.map(mapAlbumDBToModel)[0];
    album.songs = await this._songService.getSongsByAlbumId(id);

    const { count } = await this._albumLikesService.getAlbumLikes(id);
    album.likes = count;

    return album;
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
    }
  }

  async getAlbumCoverByAlbumId(id) {
    const query = {
      text: 'SELECT cover_url FROM albums WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows[0];
  }

  async updateAlbumCover(id, filename) {
    const { cover_url: oldCoverFilename } = await this.getAlbumCoverByAlbumId(
      id
    );

    if (oldCoverFilename) {
      this._storageService.deleteFile(oldCoverFilename);
    }

    const query = {
      text: 'UPDATE albums SET cover_url = $1 WHERE id = $2 RETURNING id',
      values: [filename, id],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError(
        'Gagal memperbarui sampul album. Id tidak ditemukan'
      );
    }
  }
}

module.exports = AlbumService;
