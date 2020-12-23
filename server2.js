require('dotenv').config({path:'./config/config.env'});
const express = require("express");
const bodyParser = require("body-parser");
const routes= require('./routes/routes');
const cookieParser = require('cookie-parser');
const app = express();



app.use(express.urlencoded({
	extended: true
}))
app.use(cookieParser());
app.use(express.json({ limit: '1mb' }))
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
//app.use(express.static("public"));
app.use('/api',routes);

app.listen(5000, () => {
	console.log("Server started on port 5000");
});