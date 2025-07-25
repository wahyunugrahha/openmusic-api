const { Pool } = require('pg');
const { mapDBToModel } = require('../../utils/utils');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class SongService {
  constructor() {
    this._pool = new Pool();
  }
  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO songs 
        (id, title, year, genre, performer, duration, album_id)
        VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan songs');
    }

    return result.rows[0].id;
  }
}

module.exports = SongService;
