const mapAlbumDBToModel = ({ id, name, year, cover_url }) => ({
  id,
  name,
  year,
  coverUrl: cover_url
    ? `http://${process.env.HOST}:${process.env.PORT}/albums/covers/${cover_url}`
    : null,
});

module.exports = { mapAlbumDBToModel };
