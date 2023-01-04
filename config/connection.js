/**
 * Link para ligação à MySQL
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "projetopwuser",
    password: "",
    database: "db_portfly"
});

connection.connect(function (err) {
    if (err) throw err
    console.log('Está conectado à BD ...')
})

module.exports = connection;