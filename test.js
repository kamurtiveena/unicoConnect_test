
var mysql = require('mysql2');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'demo'
});

migration.init(connection, __dirname + '/migrations', function() {
  console.log("finished running migrations");
});