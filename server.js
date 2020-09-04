const express = require("express");
const path = require("path");
// require('@tensorflow/tfjs-node');
const bodyParser = require("body-parser");
const app = express();
const mysql = require('mysql');

const fs = require("fs");
const blazeface = require("@tensorflow-models/blazeface");
var atob = require("atob");
var con = mysql.createConnection({
	host: "database-personalcards.csijlxmxisod.us-east-1.rds.amazonaws.com",
	user: "admin",
	password: "personal",
	port: "3306",
	database: "personalcards"
});

function func(dataURI) {
	//const model = await blazeface.load();
	//var Img = new ImageData(img);
	//console.log(Img);

	//console.log(typeof img);
	//const predictions = await model.estimateFaces(img, false);
	//console.log(predictions);
	var BASE64_MARKER = ";base64,";

	var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
	var base64 = dataURI.substring(base64Index);
	var raw = atob(base64);
	var rawLength = raw.length;
	var array = new Uint8Array(new ArrayBuffer(rawLength));

	for (i = 0; i < rawLength; i++) {
		array[i] = raw.charCodeAt(i);
	}

	return array;
}

async function test(array, width, height) {
	const model = await blazeface.load();
	//console.log(body.dataURI);
	// var img = func(body.dataURL);
	// console.log(img);
	// console.log(body.imageData.length);
	console.log("From Test" + array.subarray(0, 10));
	const predictions = await model.estimateFaces(
		{ data: array, width, height },
		true
	);
	console.log(predictions);
}

app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
	res.sendfile("index.html");
});
app.post('/hello', (req, res) => {
	res.send("Hello route");
})
app.post('/login', (req, res) => {
	const userName = req.body.username;
	const pass = req.body.password;
	console.log(userName);
	console.log(pass);
	var print = `SELECT * FROM Users WHERE username = ?`;
	console.log(print);
	con.connect((err) => {
		if (err) throw err;
		console.log("Connected!");
		// var sql = "INSERT INTO Users (username, password) VALUES ('Sunny', 'hai'),('Vinny', 'Enti')";
		con.query(print, [userName], (err, result, fields) => {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
			}
			// console.log("2 record inserted");
		});

	});
	res.send("Login Route");
})
app.post("/authenticate", async (req, res) => {
	res.send("Authenticating post  route");
	//console.log(req.body.dataURL)
	const body = await (req.body);
	const uintArray = Uint32Array.from(Object.values(body.imageData));
	// console.log(uintArray.subarray(0, 10));
	test(uintArray, body.width, body.height);
});
app.get("/authenticate", (req, res) => {
	res.send("Authenticating route");
});
app.listen(5000, (req, res) => {
	console.log("Server started onn port 5000");
});
