const mapSongDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId: album_id, // mapping dari snake_case ke camelCase
});

module.exports = { mapSongDBToModel };
