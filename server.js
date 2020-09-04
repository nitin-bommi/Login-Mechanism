const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const app = express();

var con = mysql.createConnection({
	host: "database-personalcards.csijlxmxisod.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "personal",
	port: "3306",
	database: "personalcards"
});



app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
	res.sendfile("index.html");
});

const printTable = () => {
	con.query('SELECT * FROM People', (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	})
}
app.post('/register', (req, res) => {
	const { email, password } = req.body;
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	var sql = `INSERT INTO People (email, password) VALUES (?, ?)`;
	con.query(sql, [email, hash], function (err, result) {
		if (err) {
			console.log(err);
		} else {
			console.log("1 record inserted");
			printTable();
		}

	});
	res.send("Register Route");
});
app.post('/login', (req, res) => {
	const { email, password } = req.body;

	var validate = `SELECT * FROM People WHERE email = ?`
	con.query(validate, [email], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			const hash = result[0].password;
			const isTrue = bcrypt.compareSync(password, hash);
			console.log(isTrue);
		}
	});

	res.send("Login Route");
});

app.listen(5000, () => {
	console.log("Server started onn port 5000");
});

