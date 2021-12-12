
var mysql = require('mysql');
var migration = require('mysql-migrations');

var connection = mysql.createPool({
  connectionLimit : 10,
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'demo'
});

migration.init(connection, __dirname + '/migrations',async function() {
  console.log("finished running migrations");
});