exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('playlist_songs', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"playlists"',
      onDelete: 'CASCADE',
    },
    song_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"songs"',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint(
    'playlist_songs',
    'unique_playlist_song_pair',
    'UNIQUE(playlist_id, song_id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('playlist_songs', 'unique_playlist_song_pair');
  pgm.dropTable('playlist_songs');
};
