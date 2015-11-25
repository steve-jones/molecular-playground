var pgp = require('pg-promise')();

var cn = {
    host: 'localhost',
    port: 5432,
    database: 'test',
    user: 'jim',
    password: 'test123'
};

var db = pgp(cn);


db.func('make_user', ['James Calabro', 21])
    .then(function (data) {
        console.log(data); // printing the data returned
    })
    .catch(function (error) {
        console.log(error); // printing the error
    });

console.log('\nDone');
