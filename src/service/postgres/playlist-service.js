const { Pool } = require('pg');
const nanoid = require('nanoid');
const InvariantError = require('../../error/invariant-error');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }
  async addPlaylist({ name, owner }) {
    const id = nanoid(16);
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Playlist gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async;
}

module.exports = PlaylistService;
