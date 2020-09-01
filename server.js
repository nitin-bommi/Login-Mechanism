const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const fs = require("fs");
const blazeface = require("@tensorflow-models/blazeface");
var atob = require("atob");

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

async function test(body) {
	const model = await blazeface.load();
	//console.log(body.dataURI);
	var img = func(body.dataURL);
	console.log(img);
	const predictions = await model.estimateFaces(
		{ data: img, width: body.width, height: body.height },
		true
	);
	console.log(predictions);
}

app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
	res.sendfile("index.html");
});
app.post("/authenticate", (req, res) => {
	res.send("Authenticating post  route");
	//console.log(req.body.dataURL)
	test(req.body);
});
app.get("/authenticate", (req, res) => {
	res.send("Authenticating route");
});
app.listen(5080, (req, res) => {
	console.log("Server started onn port 5000");
});
