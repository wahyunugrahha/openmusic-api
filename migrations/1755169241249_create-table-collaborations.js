exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('collaborations', {
    id: { type: 'VARCHAR(50)', primaryKey: true },
    playlist_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"playlists"',
      onDelete: 'CASCADE',
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint(
    'collaborations',
    'unique_playlist_collaborator',
    'UNIQUE(playlist_id, user_id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('collaborations', 'unique_playlist_collaborator');
  pgm.dropTable('collaborations');
};
