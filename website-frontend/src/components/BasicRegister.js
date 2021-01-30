import axios from 'axios';
import { Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class BasicRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
      firstName: "",
      lastName: "",
      password: "",
      confirmPassword: "",
      email: "", 
      phonenumber: ""
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e){
    e.preventDefault();
    const token = localStorage.getItem("userid");
    console.log(this.state);
    const {firstName, lastName, password, email, phonenumber} = this.state;
    let data={
        firstName,
        lastName,
        password,
        email,
        phonenumber
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
      if(res.data.results.role==='Student')
        window.location.replace('/studentregister');
      else
        window.location.replace('/professorregister');
    }catch(error){
      console.log(error);
    }
  }
  render() {
    return (
        <div>
          <div className="form-form">
            <Form>
              <h3 className="form-heading">
                Register
              </h3>
              <Form.Group controlId="fname">
                <Form.Control type="text" id="firstname" className="item" name="firstName" placeholder="First Name" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Control type="text" id="lastname" className="item" name="lastName" placeholder="Last name" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password1">
                <Form.Control type="password" id="password" className="item" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Control type="password" id="confirmpassword" className="item" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control type="email" id="email" className="item" name="email" placeholder="Email" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Control type="tel" id="phone" className="item" name="phonenumber" pattern="^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$" placeholder="Phone number"  onChange={this.handleChange} />
              </Form.Group>
              
              <Form.Group controlId="submitbutton">
                <Button type="submit" onClick={this.handleSubmit} className="create-account">Next</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }
    
}

export default BasicRegister;