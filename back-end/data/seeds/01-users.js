const bcrypt = require('bcryptjs')

const password = 'pass'

const hash = bcrypt.hashSync(password, 12)

exports.seed = function(knex) {
  return knex('users').insert([
    {
      username: 'user1',
      password: hash
    }
  ])
};
