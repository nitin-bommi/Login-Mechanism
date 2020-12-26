// const mysql = require('mysql');

// const connection = mysql.createConnection({
// 	host: "database-personalcards.csijlxmxisod.us-east-1.rds.amazonaws.com",
// 	user: "admin",
// 	password: "personal",
// 	port: "3306",
// 	database: "personalcards"
// });

const mongoose = require('mongoose');

const connection = async()=>{
    const conn=await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
}

module.exports=connectDB;


module.exports=connection;