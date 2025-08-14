exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.sql(`
    INSERT INTO users (id, username, password, fullname)
    VALUES ('user_placeholder', 'user_placeholder', 'user_placeholder', 'User Placeholder')
  `);

  // mengubah nilai owner pada playlist yang owner-nya bernilai NULL
  pgm.sql(`
    UPDATE playlists
    SET owner = 'user_placeholder'
    WHERE owner IS NULL
  `);

  // memberikan constraint foreign key pada owner terhadap kolom id dari tabel users
  pgm.addConstraint(
    'playlists',
    'fk_playlists.owner_users.id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE'
  );
};

exports.down = (pgm) => {
  // menghapus constraint fk_playlists.owner_users.id pada tabel playlists
  pgm.dropConstraint('playlists', 'fk_playlists.owner_users.id');

  // mengubah nilai owner old_notes pada note menjadi NULL
  pgm.sql(`
    UPDATE playlists
    SET owner = NULL
    WHERE owner = 'user_placeholder'
  `);

  // menghapus user baru.
  pgm.sql(`DELETE FROM users WHERE id = 'user_placeholder'`);
};
