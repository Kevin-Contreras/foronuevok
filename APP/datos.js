var mysql = require("mysql2");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'kevin',
    password : '123NARUTO',
    database : 'PROYECTO'
  });
  connection.connect();
  module.exports = connection;
  