const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils/utils');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class SongService {
  constructor() {
    this._pool = new Pool();
  }
  async addSong({ name, year }) {
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
}

module.exports = SongService;
