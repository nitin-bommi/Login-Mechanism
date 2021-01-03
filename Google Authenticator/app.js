require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const User = require("./models/User");
const qrcode = require('qrcode'); 
const { gValidate, gAuthenticate } = require("./index");


const db = process.env.mongoURI;
//Connect to mongodb
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false}
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

//Set EJS Views
app.set('views',  path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, "public")));
// Express body parser
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res)=>{
    res.render("index", {title: "Home Page"});
})
app.get('/register', (req, res)=>{
    res.render("register");
})
//Register route

app.post("/register",  async (req, res)=>{
    const {username, passwd} = req.body;
  
    //Stored in the DB
    
    //Now call the function
    await gAuthenticate(username, passwd);
    User.find({username},  async (err, user)=>{
        if(err) throw err;
        if(!user){
            console.log("No user is registerd");
            return;
        }
       
        try {
            // console.log(user);
            const data = await qrcode.toDataURL(user[0].secret.imageURL);
            res.render("index", {src: data, ascii: user[0].secret.ascii});
        } catch (error) {
            console.log("DATA url error is "+ error);
        }
        
    })
    
})
//Validate the OTP
app.post("/validateQR", (req, res)=>{
    const {otp, ascii} = req.body;
    const result = gValidate(otp, ascii);
    console.log(result);
});
app.listen("3000", ()=>{
    console.log("Server started on port 3000");
})