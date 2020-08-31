const express = require('express');
const path = require('path');
const app = express();


app.use(express.static(path.join(__dirname, "public")));
app.get('/', (req, res) => {
    res.sendfile('index.html');
})

app.listen(5080, (req, res) => {
    console.log("Server started onn port 5000");
});