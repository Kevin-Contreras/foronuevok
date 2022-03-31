var mysql = require("mysql2");
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'id18705713_kevin',
    password : 'sa!o9>4zbgoB^u|h',
    database : 'id18705713_proyecto'
  });
  connection.connect();
  module.exports = connection;
  