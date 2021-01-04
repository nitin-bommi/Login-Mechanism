import { Component} from 'react';
import axios from "axios";
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
      window.location.replace("/passwordlogin");
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
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
          </select><br/>
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
          <select id="yearofjoin" name="yearOfJoin"  onChange={this.handleChange}>
          <option>Select Year of Join</option>
              <option>2001</option>
              <option>2012</option>
              <option>2018</option>
          </select><br/>
          <input type="date" id="dateOfBirth" name="dob"  onChange={this.handleChange}></input><br/>
          
          <button type="submit">Submit</button>
          </form>
        </div>
      );
  }
    
}

export default NextRegister;