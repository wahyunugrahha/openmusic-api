const { Pool } = require('pg');
const { mapSongDBToModel } = require('../../utils/utils-songs');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class SongService {
  constructor() {
    this._pool = new Pool();
  }
  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, genre, performer, duration, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan lagu');
    }

    return result.rows[0].id;
  }

  async getSongs() {
    const result = await this._pool.query(
      'SELECT id, title, performer FROM songs'
    );
    return result.rows.map(mapSongDBToModel);
  }
  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapSongDBToModel)[0];
  }
}

module.exports = SongService;
