exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("students")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("students").insert([
        { name: "Jamie", user_id: 2 },
        { name: "Jake", user_id: 2 },
        { name: "Julian", user_id: 2 }
      ]);
    });
};
