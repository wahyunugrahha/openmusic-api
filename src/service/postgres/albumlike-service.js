const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../error/invariant-error');
const NotFoundError = require('../../error/not-found-error');

class AlbumLikesService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
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
    await this._cacheService.delete(`album_likes:${albumId}`);
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
    await this._cacheService.delete(`album_likes:${albumId}`);
  }

  async getAlbumLikes(albumId) {
    try {
      const result = await this._cacheService.get(`album_likes:${albumId}`);
      const likesCount = JSON.parse(result);
      return {
        count: likesCount,
        source: 'cache',
      };
    } catch {
      const query = {
        text: 'SELECT COUNT(id) FROM user_album_likes WHERE album_id = $1',
        values: [albumId],
      };
      const result = await this._pool.query(query);
      const likesCount = parseInt(result.rows[0].count, 10);
      await this._cacheService.set(
        `album_likes:${albumId}`,
        JSON.stringify(likesCount)
      );

      return {
        count: likesCount,
        source: 'database',
      };
    }
  }
}

module.exports = AlbumLikesService;
