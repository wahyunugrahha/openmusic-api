exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.addColumns('albums', {
    cover_url: {
      type: 'TEXT',
      notNull: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('albums', ['cover_url']);
};
