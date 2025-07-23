const { Pool } = require('pg');
const NotFoundError = require('../../error/not-found-error');
const { mapDBToModelAlbum } = require('../../utils/utils');
const { nanoid } = require('nanoid');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }
  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map(mapDBToModelAlbum)[0];
  }
}

module.exports = AlbumService;
