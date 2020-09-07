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


app.use(express.urlencoded({
	extended: true
}))
app.use(express.json({ limit: '1mb' }))
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.static("public"));
const printTable = () => {
	con.query('SELECT * FROM Student_Info', (err, result, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	})
}
// Basic Info form page and  Home Page

app.get("/", (req, res) => {
	res.sendFile("index.html");
});

// Extra student details info form page
app.get('/info', (req, res) => {
	console.log(req.query.id);
	res.sendFile(__dirname + '/public/info.html');
});

// Get student details after successful login

app.get('/getDetails', (req, res) => {
	res.send(req.query.email);
})
app.post('/basic_registration', (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const saltRounds = 10;
	const hash = bcrypt.hashSync(password, saltRounds);
	const decrypt = bcrypt.compareSync(password, hash);
	console.log(decrypt);
	var command = `INSERT INTO Users_login_Credentials (Firstname, Lastname, Email, Passwrd) VALUES (?, ?, ?, ?)`;
	con.query(command, [firstName, lastName, email, hash], (err, results, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log("1 record inserted");
		}
	});
	var id_query = `SELECT ID from Users_login_Credentials where Email = ?`;
	let id;
	con.query(id_query, [email], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			id = result[0].ID;
			res.redirect('/info?id=' + id);

		}
	})

});


app.post('/info_registration', (req, res) => {
	// const { gender, school, department, year, semester, dob, phonenumber } = req.body;
	const { id, gender } = req.body;
	var command = `INSERT INTO Student_Info (ID, gender) VALUES (?,?)`;
	con.query(command, [id, gender], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			printTable();
			res.redirect("/");
		}
	})


})

app.post('/login', (req, res) => {
	const { email, password } = req.body;
	console.log(email);
	console.log(password);
	var validate = `SELECT * FROM People WHERE email = ?`
	con.query(validate, [email], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
			const hash = result[0].password;
			const isTrue = bcrypt.compareSync(password, hash);
			if (isTrue) {
				res.redirect('/getDetails?email=' + email);
			} else {
				res.send("Invalid Credentials");
			}
		}
	});
});

app.listen(5000, () => {
	console.log("Server started onn port 5000");
});

