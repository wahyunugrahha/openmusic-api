const mapAlbumDBToModel = ({ id, name, year, cover_url }) => ({
  id,
  name,
  year,
  coverUrl: cover_url,
});

module.exports = { mapAlbumDBToModel };
