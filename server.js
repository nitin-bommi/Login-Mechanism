require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const bodyParser = require("body-parser");

const routes = require("./routes/routes");
const face_auth = require("./routes/face_auth");
const calendar = require("./routes/calendar");

const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
const logger = require("morgan");

const connection = require("./db/connection");
//Connect to Database
connection();

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ credentials: true, origin: true }));
app.use(cookieParser());
app.use(express.json({ limit: "1mb" }));
app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(logger("dev"));
app.use(express.static(__dirname + "/website-frontend/src/images/qr-codes"));
app.use("/api", routes);
app.use("/face_auth", face_auth);
app.use("/calendar", calendar);

app.listen(8080, () => {
  console.log(__dirname);
  console.log("Server started on port 8080");
});
