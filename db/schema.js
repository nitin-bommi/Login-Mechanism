var mongoose = require('mongoose');
var bcrypt=require('bcrypt');
var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
};

// Schema stores username, password, email, phone, profile picture path, and messages sent to admin
var userSchema = new mongoose.Schema({
    studentid: {
        type: String,
        match: [/\d{2}[a-zA-Z]{4}\d{2}/,'ID must be valid'],
        unique: true,
        required: true
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    // username: { 
    //     type: String, 
    //     unique: true, 
    //     required: [true, 'Username required'], 
    //     maxlength: 50, minlength: 4 
    // },
    password: {
        type: String, 
        required: [true, 'Password required'], 
        minlength: 8, 
    },
    phone: {
        type: String,
        validate: {
            validator: function(v) {
            return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    }, 
    email: { 
        type: String, 
        validate: {
            validator: function(v) {
                return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
            },
            message: props => `${props.value} is not a valid email address!`
            },
        required: [true, 'User email required'], 
        unique: true
    },
    profilePicturePath: String, //store the path to profilepic
    gender:{
        type: String,
        enum: [
            'Female',
            'Male',
            'Other' 
        ]
    },
    school: {
        type: String,
        enum: ['School of Computer and Information Sciences']
    },
    department: {
        type: String,
        
    }, 
    yearOfJoin: {
        type: Number,
        min: 2001,
        max: 2020
    },
    semester:{
        type: Number,
        min: 1,
        max: 10
    },
    dateOfBirth:{
        type: Date
    }

    },schemaOptions);


    // Hashes the password before saving it in database
    userSchema.pre("save", function(next) {
        if(!this.isModified("password")) {
            return next();
        }
        this.password = bcrypt.hashSync(this.password, 10);
        next();
    });

    // returns unhashed version of password to compare
    userSchema.methods.comparePassword = function(plaintext, callback) {
        return callback(null, bcrypt.compareSync(plaintext, this.password));
    };
var User = mongoose.model('User', userSchema);
module.exports = User;