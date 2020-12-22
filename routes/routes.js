const express = require('express');
const router = express.Router();
const connection= require('../db/connection');
const bcrypt = require('bcrypt');
require('dotenv').config({path:'./config/config.env'});
const bodyParser = require("body-parser");

router.get('/', (req, res)=>{
    res.send("Hi, it works");
})

//Gets all user details to be displayed from database based on ID.
router.get('/userdetails', requireAuth, async (req, res)=>{
    try{
        const id = req.decoded.id;
        let query1=`SELECT * FROM Users_login_Credentials where id = ?`
        let query2=`SELECT * FROM Student_Info where id = ? `
        let userDetails= new Object();
        connection.query(query1, [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                userDetails.id=result[0].id;
                userDetails.firstName=result[0].Firstname;
                userDetails.lastName = result[0].Lastname;
                userDetails.email = result[0].Email;
            }
        })
        connection.query(query2, [id], (err, result) => {
            if (err) {
                console.log(err);
            } else {
                console.log(result);
                userDetails.gender=result[0].Gender;
                userDetails.school= result[0].School;
                userDetails.department=result[0].Department;
                userDetails.year=result[0].Year_of_joining;
                userDetails.semester=result[0].Semester;
                userDetails.dob=result[0].dob; 
                userDetails.phonenumber=result[0].phonenumber;
            }
        })
        res.status(200).json({ userDetails });
    }catch(error){
        console.log(error);
    }
})

//Checks if ID is present in database
router.post('/checkid',async (req, res)=>{
    try{
        //ID is input in the body.
        const id= await req.body.id;

        //Connects to database.
        connection.connect(function(err) {
            if (err) throw err;

                let query=`SELECT id FROM Users_login_Credentials where id = ?`
                // if connection is successful
                connection.query(query,[id], (err, result, fields) => {
                    // if any error while executing above query, throw error
                    if (err) {
                        res.status(400).json({
                            error: err,
                            message: "ID not found, please register."
                        })
                    };
                
                    // if there is no error, you have the result
                    const token = jwt.sign({ id }, process.env.JWT_SECRET);
                    res.status(200).json({ 
                        result: result,
                        message: "ID is found."
                    })                
                });
        });
    }catch(error){
        console.log(error);
    }

})

// If ID is present, login with password.
router.post('/passwordlogin',async (req, res)=>{
    try{
        const id= await req.body.id;
        //Gets password from body
        const password=await req.body.password;
        connection.connect(function(err) {
            if (err) throw err;

                let query=`SELECT * FROM Users_login_Credentials where id = ?`
                // if connection is successful
                connection.query(query,[id], (err, result, fields) => {
                    // if any error while executing above query, throw error
                    if (err) {
                        res.status(400).json({
                            error: err,
                            message: "ID not found, please register."
                        })
                    };
                
                    // if there is no error, you have the result
                    const hash = result[0].Passwrd;
                    //Comparing input and encrypted password from database. 
                    const isTrue = bcrypt.compareSync(password, hash);
                    if (isTrue) {
                        // console.log("ENV is " + process.env.JWT_SECRET);
                        //create token to store ID.
                        const token = jwt.sign({ id }, process.env.JWT_SECRET);
                        // console.log(jwt.decode(token));
                        res.status(200).json({ result })
                        //res.cookie('jwt', token, { httpOnly: true });
                        res.redirect('/userdetails');
                    } else {
                        res.send("Invalid Password");
                    }
                    
                });
        });
    }catch(error){
        console.log(error);
    }

})

//If ID is not present, then register basic details.
router.post('/basic_registration', async (req, res) => {
    try{
        const { id, firstName, lastName, email, password } = await req.body;

        //Encrypting the password.  
        const saltRounds = 10;
        const hash = bcrypt.hashSync(password, saltRounds);
        const decrypt = bcrypt.compareSync(password, hash);
        //console.log(decrypt);
        var command = `INSERT INTO Users_login_Credentials (ID, Firstname, Lastname, Email, Passwrd) VALUES (?, ?, ?, ?, ?)`;
        connection.query(command, [id, firstName, lastName, email, hash], (err, result, fields) => {
            if (err) {
                res.status(400).json({
                    error: err,
                    message: "Insertion failed"
                })
            } else {
                const token = jwt.sign({ id }, process.env.JWT_SECRET);
                res.status(200).json({
                    success: true,
                    results: result,
                    message: "Insertion success"
                })
                
            }
        });
    }catch(err){
        console.log(err);
    }
});

//Register more details.
router.post('/info_registration', async (req, res) => {
    try{
        const { id, gender, school, department, year, semester, dob, phonenumber } = await req.body;

        var command = `INSERT INTO Student_Info (ID, gender, school, department, year, semester, dob, phonenumber) VALUES (?,?,?,?,?,?,?,?)`;
        connection.query(command, [id, gender, school, department, year, semester, dob, phonenumber], (err, result) => {
            if (err) {
                res.status(400).json({
                    error: err
                })
            } else {
                res.status(200).json({ result })
                res.redirect("/checkid");
            }
        })
    }catch(error){
        console.log(error);
    }


})
module.exports = router;
