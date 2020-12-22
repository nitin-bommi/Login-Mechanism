const mysql = require('mysql');

const connection = mysql.createConnection({
	host: "database-personalcards.csijlxmxisod.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "personal",
	port: "3306",
	database: "personalcards"
});


module.exports= connection;