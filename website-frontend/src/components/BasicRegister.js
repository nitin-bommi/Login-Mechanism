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
    const token = localStorage.getItem("userid");
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
      window.location.replace('/nextregister');
    }catch(error){
      console.log(error);
    }
  }
  render() {
    return (
        <div className="bgimage">
          <div className="form-form">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="fname">
                <Form.Control type="text" id="firstname" name="firstName" placeholder="First Name" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Control type="text" id="lastname" name="lastName" placeholder="Last name" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password1">
                <Form.Control type="password" id="password" name="password" placeholder="Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Control type="password" id="confirmpassword" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control type="email" id="email" name="email" placeholder="Email" onChange={this.handleChange} />
              </Form.Group>
              
              <Form.Group controlId="submitbutton">
                <Button type="submit" className="create-account">Next</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }
    
}

export default BasicRegister;