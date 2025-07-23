const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../error/not-found-error');

class AlbumService {
  constructor() {
    this._pool = new Pool();
  }
  async addAlbum({ name, year }) {
    const id = nanoid(16);

    const query = {
      text: 'SELECT * FROM albums WHERE id = $1',
      values: id,
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Album tidak ditemukan');
    }

    return result.rows.map(mapDBToModel)[0];
  }
}

module.exports = AlbumService;
