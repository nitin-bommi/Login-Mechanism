import axios from 'axios';
import { Component} from 'react';
import {Link} from 'react-router-dom';

class BasicRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: ""
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
    console.log(this.state);
    const {firstName, lastName, password, email} = this.state;
    let data={
        firstName,
        lastName,
        password,
        email
    }
    console.log(token);
    const config = {
      headers:{
        "x-access-token":  token
      }
    }
    try {
     const res = await axios.post("http://localhost:8080/api/basic_registration/", data,config);
      console.log(res.data);
    
  }catch(error){
    console.log(error);
  }
  }
  render() {
    return (
        <div>
         <form onSubmit={this.handleSubmit}>
         <input type="text" id="firstname" name="firstName" placeholder="First Name" onChange={this.handleChange}></input><br/>
          <input type="text" id="lastname" name="lastName" placeholder="Last name" onChange={this.handleChange}></input><br/>
          <input type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange}></input><br/>
          <input type="password" id="confirmpassword" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange}></input><br/>
          <input type="email" id="email" name="email" placeholder="Email" onChange={this.handleChange}></input><br/>
          
          <button type="submit" >Submit</button>
          
          <Link to="/nextregister"><button type="submit">Next</button></Link>
         </form>
        </div>
      );
  }
    
}

export default BasicRegister;