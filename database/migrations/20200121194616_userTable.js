exports.up = function(knex) {
    return(
      knex.schema
        .createTable('users', tbl => {
            tbl.increments();

            tbl.string('username', 20)
                .notNullable()
                .unique();
  
            tbl.string('password', 125)
                .notNullable();
            
            tbl.string('role', 20)
                .notNullable();

        })
    )
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
  };