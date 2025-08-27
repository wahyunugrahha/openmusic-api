const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbumLike(userId, albumId) {
    const checkQuery = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };
    const checkResult = await this._pool.query(checkQuery);

    if (checkResult.rows.length > 0) {
      throw new InvariantError('User sudah menyukai album ini');
    }

    const id = `like-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO user_album_likes VALUES($1, $2, $3) RETURNING id',
      values: [id, userId, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Gagal menambahkan like');
    }
  }

  async deleteAlbumLike(userId, albumId) {
    const query = {
      text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2 RETURNING id',
      values: [userId, albumId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('User belum menyukai album ini');
    }
  }

  async getAlbumLikes(albumId) {
    const query = {
      text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1',
      values: [albumId],
    };

    const result = await this._pool.query(query);
    const likesCount = parseInt(result.rows[0].count, 10);

    return {
      count: likesCount,
      source: 'database',
    };
  }
}

module.exports = AlbumLikesService;
