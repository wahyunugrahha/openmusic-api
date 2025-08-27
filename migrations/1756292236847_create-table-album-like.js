exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"users"',
      onDelete: 'CASCADE',
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      references: '"albums"',
      onDelete: 'CASCADE',
    },
  });

  pgm.addConstraint(
    'user_album_likes',
    'unique_user_album_pair',
    'UNIQUE(user_id, album_id)'
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('user_album_likes', 'unique_user_album_pair');
  pgm.dropTable('user_album_likes');
};
