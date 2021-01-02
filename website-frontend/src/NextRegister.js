import { Component} from 'react';
<<<<<<< HEAD
import axios from "axios";
=======

>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
class NextRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
      phonenumber: "",
      gender: "",
      school:"",
      department: "",
      semester: null,
      yearOfJoin: null,
      dob: null,
<<<<<<< HEAD
      years: [],
      alert: false
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e){
    e.preventDefault();
    const token = localStorage.getItem("studentid");
    // console.log(this.state);
    const {phonenumber, gender, school, department, semester, yearOfJoin, dob} = this.state;
    let data={
      gender, school, department, semester, dob, phonenumber, yearOfJoin
    }
    console.log(token);
    const config = {
      headers:{
        "x-access-token":  token
      }
    }
    try {
     const res = await axios.post("http://localhost:5000/api/info_registration/", data,config);
    console.log(res.data);
    if(res.data.success){
      this.setState({alert: true});
      setTimeout(() => {
        this.setState({alert: false});
      }, 3000);
    }
    
    }catch(error){
      console.log(error);
    }
  }

  render() {
    return (
        <div>
          {this.state.alert && <p>User data saved successfully</p>}
          <form onSubmit={this.handleSubmit}>
          <input type="tel" id="phone" name="phonenumber" placeholder="Phone number"  onChange={this.handleChange}></input><br/>
          <select id="gender" name="gender" onChange={this.handleChange}>
          <option>Select Gender</option>
=======
      years: []
    }
  }
  render() {
    return (
        <div>
          <input type="tel" id="phone" name="phonenumber" placeholder="Phone number"></input><br/>
          <select id="gender" name="gender">
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
          </select><br/>
<<<<<<< HEAD
          <select id="school" name="school"  onChange={this.handleChange}>
              <option>Select school</option>
              <option>School of Computer and Information Sciences</option>
          </select><br/>
          <select id="department" name="department"  onChange={this.handleChange}>
              <option>Select Department</option>
              <option>Computer Science</option>
          </select><br/>
          <select id="semester" name="semester"  onChange={this.handleChange}>
              <option>Select Semester</option>
=======
          <select id="school" name="school">
              <option>School of Computer and Information Sciences</option>
          </select><br/>
          <select id="department" name="department">
              <option>Computer Science</option>
          </select><br/>
          <select id="semester" name="semester">
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
          </select><br/>
<<<<<<< HEAD
          <select id="yearofjoin" name="yearOfJoin"  onChange={this.handleChange}>
          <option>Select Year of Join</option>
=======
          <select id="yearofjoin" name="yearOfJoin">
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
              <option>2001</option>
              <option>2012</option>
              <option>2018</option>
          </select><br/>
<<<<<<< HEAD
          <input type="date" id="dateOfBirth" name="dob"  onChange={this.handleChange}></input><br/>
          
          <button type="submit">Submit</button>
          </form>
=======
          <input type="date" id="dateOfBirth" name="dob"></input><br/>
          
          <button type="submit">Submit</button>
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
        </div>
      );
  }
    
}

export default NextRegister;