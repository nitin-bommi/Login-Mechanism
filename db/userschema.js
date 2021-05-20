var mongoose = require("mongoose");
var bcrypt = require("bcrypt");

var schemaOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
};

// Schema stores username, password, email, phone, profile picture path, and messages sent to admin
var userSchema = new mongoose.Schema(
  {
    userid: {
      type: String,
      match: [/(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)/g, "ID must be valid"],
      unique: [true, "ID already exists"],
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Professor"],
      required: true,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    password: {
      type: String,
      required: [true, "Password required"],
      minlength: 8,
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
      required: [true, "Phone number required"],
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
      required: [true, "User email required"],
      unique: [true, "Email already exists"],
    },
    profilePicturePath: String, //store the path to profilepic
    gender: {
      type: String,
      enum: ["Female", "Male", "Other"],
    },
    school: {
      type: String,
      enum: [
        "School of Mathematics and Statistics",
        "School of Physics",
        "School of Chemistry",
        "School of Life Sciences",
        "School of Computer and Information Sciences",
        "School of Social Sciences",
        "School of Humanities",
        "School of Engg. Sciences and Technology",
        "School of Management Studies",
        "Sarojini Naidu School of Arts and Communication",
        "School of Economics",
        "School of Medical Sciences",
      ],
    },
    department: {
      type: String,
      enum: [
        "School of Mathematics and Statistics",
        "School of Physics",
        "School of Chemistry",
        "Department of Biochemistry",
        "Department of Plant Sciences",
        "Department of Animal Biology",
        "Department of Biotechnology and Bioinformatics",
        "Department of Systems and Computational Biology",
        "School of Computer and Information Sciences",
        "Department of History",
        "Department of Sociology",
        "Department of Political Science",
        "Department of Anthrolpology",
        "Department of Education and Education Technology",
        "Department of English",
        "Department of Philosophy",
        "Department of Hindi",
        "Department of Telugu",
        "Department of Urdu",
        "Department of Sanskrit Studies",
        "School of Engg. Sciences and Technology",
        "School of Management Studies",
        "Department of Communication",
        "Department of Dance",
        "Department of Fine Arts",
        "Department of Theatre Arts",
        "Department of Music",
        "School of Economics",
        "School of Medical Sciences",
      ],
    },
    course: {
      type: String,
      enum: ["IMTech", "MTech", "MCA", "MSc", "IMSc", "PhD", "MA", "IMA"],
    },
    yearOfJoin: {
      type: Number,
      min: 1980,
      max: new Date().getFullYear(),
    },
    semester: {
      type: Number,
      min: 1,
      max: 10,
    },
    dateOfBirth: {
      type: Date,
    },
    designation: {
      type: String,
      enum: [
        "Professor",
        "Senior Professor",
        "Assistant Professor",
        "Associate Professor",
        "Professor and Dean",
        "Dean",
        "Emeritus Professor",
        "Adhoc/Guest Faculty",
        "Adjunct Faculty/Visiting Faculty",
        "Honorary Professor",
        "Re-employed",
        "Head of Department",
      ],
    },
    secondLevel: {
      enabled: Boolean,
      ascii: String,
    },
  },
  schemaOptions
);

// Hashes the password before saving it in database
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// returns unhashed version of password to compare
userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

var User = mongoose.model("User", userSchema);

module.exports = User;
