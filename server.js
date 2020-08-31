const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({ extended: true, limit: "50mb" }));
app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
    res.sendfile('index.html');
})
app.post('/authenticate', (req, res) => {
    res.send("Authenticating post  route");
})
app.get('/authenticate', (req, res) => {

    res.send("Authenticating route");
})
app.listen(5080, (req, res) => {
    console.log("Server started onn port 5000");
});