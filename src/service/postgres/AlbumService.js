const { Pool } = require('pg');
const { mapDBToModelAlbum } = require('../../utils/utils');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');

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
      throw new InvariantError('Gagal menambahkan album');
    }

    return result.rows.map(mapDBToModelAlbum)[0];
  }
}

module.exports = AlbumService;
