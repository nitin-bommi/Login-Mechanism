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
app.get("/", (req, res) => {
	res.sendFile("index.html");
});

const printTable = () => {
	con.query('SELECT * FROM Student_Info', (err, result, fields) => {
		if (err) {
			console.log(err);
		} else {
			console.log(result);
		}
	})
}

// printTable();
// let email_val = "";
app.post('/basic_registration', (req, res) => {
	const { firstName, lastName, email, password } = req.body;
	const saltRounds = 10;
	// console.log("Got password is " + email);
	const hash = bcrypt.hashSync(password, saltRounds);
	const decrypt = bcrypt.compareSync(password, hash);
	console.log(decrypt);
	var command = `INSERT INTO Users_login_Credentials (Firstname, Lastname, Email, Passwrd) VALUES (?, ?, ?, ?)`;
	con.query(command, [firstName, lastName, email, hash], (err, results, fields) => {
		if (err) {
			console.log(err);
		} else {
			// console.log(results);
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
			// var id = encodeURIComponent(id);
			// res.redirect('/info/?id=' + id);
			// res.send("hai");
			// res.send("Byee");
			// res.json({ id });
		}
	})

});
app.get('/info', (req, res) => {
	console.log(req.query.id);
	res.sendFile(__dirname + '/public/info.html');
});
app.get('/sample', (req, res) => {
	// res.send("Sample world");
	res.redirect('/hello');
})
app.get('/hello', (req, res) => {
	res.send('hello world');
})

app.post('/info_registration', (req, res) => {
	// const { gender, school, department, year, semester, dob, phonenumber } = req.body;
	const { id, gender } = req.body;
	var command = `INSERT INTO Student_Info (ID, gender) VALUES (?,?)`;
	con.query(command, [id, gender], (err, result) => {
		if (err) {
			console.log(err);
		} else {
			printTable();
			res.send("HUraayy!!");
		}
	})
	// var id_query = `SELECT ID from Users_login_Credentials where Email = ?`;
	// let id = 0;
	// try {
	// 	const result = await con.query(id_query, [email_val]);
	// 	console.log(result);
	// } catch (error) {
	// 	console.log(error);
	// }

	// id = await result[0].ID;
	// console.log("ID is " + id);
	// console.log("Outer id is " + id);
	// var sql = `INSERT INTO Student_Info (ID, Gender, School, Department, Year_of_joining, Semester, DOB, PhoneNumber) VALUES (?,?, ?, ?, ?, ?, ?, ?)`;
	// con.query(sql, [12, gender, school, department, year, semester, dob, phonenumber], function (err, results) {
	// 	if (err) {
	// 		console.log(err);
	// 	} else {
	// 		console.log("1 record inserted");
	// 		console.log(results);
	// 	}
	// });

	// res.send("Info route");

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
			console.log(isTrue);
		}
	});

	res.send("login route");
});

app.listen(5000, () => {
	console.log("Server started onn port 5000");
});

