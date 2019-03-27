exports.up = function(knex, Promise) {
  return knex.schema.createTable("cohorts", function(tbl) {
    //   primary key called id make it auto-increment
    tbl.increments();
    tbl
      .string("name", 128)
      .notNullable()
      .unique();
  });
};

exports.down = function(knex, Promise) {
  return knex.scheme.dropTableIfExists("cohorts");
};
