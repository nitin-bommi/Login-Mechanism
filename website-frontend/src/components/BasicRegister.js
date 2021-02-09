import axios from 'axios';
import { Component} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {getUserRole} from '../utils';
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
      phoneNumber: "",
      fields: {},
      errors: {}
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleValidation=()=>{ 
    let errors = {};
    let formIsValid = true;

    //First Name
    if(this.state.firstName === ""){
       formIsValid = false;
       errors["firstName"] = "Cannot be empty";
    }else if(typeof this.state.firstName !== "undefined"){
       if(!this.state.firstName.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["firstName"] = "Only letters";
       }        
    }

    //Last Name
    if(this.state.lastName === ""){
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }else if(typeof this.state.lastName !== "undefined"){
        if(!this.state.lastName.match(/^[a-zA-Z]+$/)){
          formIsValid = false;
          errors["lastName"] = "Only letters";
        }        
    }
    //Email
    if(this.state.email === ""){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }else if(typeof this.state.email !== "undefined"){
        // eslint-disable-next-line no-useless-escape
        if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.state.email)) {
          formIsValid = false;
          errors["email"] = "Email is not valid";
        }
    } 

    //Phone number
    if(this.state.phoneNumber === ""){
      formIsValid = false;
      errors["phoneNumber"] = "Cannot be empty";
    }else if(typeof this.state.phoneNumber !== "undefined"){
        // eslint-disable-next-line no-useless-escape
        if (!/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(this.state.phoneNumber)) {
          formIsValid = false;
          errors["phoneNumber"] = "Phone number is not valid";
        }
    } 

    //Password
    if(this.state.password === ""){
      formIsValid = false;
      errors["password"] = "Cannot be empty";
    }else if(typeof this.state.password !== "undefined"){
        if (this.state.password.length<8) {
          formIsValid = false;
          errors["password"] = "Password must be minimum 8 characters";
        }
    } 
    //Confirm Password
    if(this.state.confirmPassword === ""){
      formIsValid = false;
      errors["confirmPassword"] = "Cannot be empty";
    }else if(typeof this.state.confirmPassword !== "undefined"){
        if (this.state.password !== this.state.confirmPassword) {
          formIsValid = false;
          errors["confirmPassword"] = "Password and confirm password must match";
        }
    } 

    this.setState({errors: errors});
    return formIsValid;
  }

  handleChange(e) {
    if(!e.target.value || e.target.value === ""){
      let errors = this.state.errors;
      errors[e.target.name] = "Cannot be empty";        
      this.setState({errors});      
    }else{
      this.setState({[e.target.name]: e.target.value})
    }      
  }

  async handleSubmit(e){
    e.preventDefault();
    // const token = localStorage.getItem("userid");
    const token = await getUserRole();
    if(this.handleValidation()){
      console.log(this.state);
      const {firstName, lastName, password, email, phoneNumber} = this.state;
      let data={
          firstName,
          lastName,
          password,
          email,
          phoneNumber
      }
      console.log(token);

      try {
        const res = await axios.post("http://localhost:8080/api/basic_registration/", data);
        console.log(res.data);
        if(res.data.results.role==='Student')
          window.location.replace('/studentregister');
        else
          window.location.replace('/professorregister');
      }catch(error){
        console.log(error);
        alert(error);
      }
    }else{
      alert("Form has errors");
    }
    
  }
  render() {
    return (
        <div>
          <div className="form-form">
            <Form onSubmit={this.handleSubmit}>
              <h3 className="form-heading">
                Register
              </h3>
              <Form.Group controlId="fname">
                <Form.Control type="text" className="item" name="firstName" placeholder="First Name" onChange={this.handleChange} isInvalid={!!this.state.errors.firstName}/>
                <Form.Control.Feedback type="invalid">{this.state.errors["firstName"]} </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="lname">
                <Form.Control type="text"  className="item" name="lastName" placeholder="Last name" onChange={this.handleChange} isInvalid={!!this.state.errors.lastName} />
                <Form.Control.Feedback type="invalid">{this.state.errors["lastName"]} </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Control type="email" className="item" name="email" placeholder="Email" onChange={this.handleChange} isInvalid={!!this.state.errors.email} />
                <Form.Control.Feedback type="invalid">{this.state.errors["email"]} </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Control type="tel"  className="item" name="phoneNumber" placeholder="Phone number"  onChange={this.handleChange} isInvalid={!!this.state.errors.phoneNumber} />
                <Form.Control.Feedback type="invalid">{this.state.errors["phoneNumber"]} </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password1">
                <Form.Control type="password" className="item" name="password" placeholder="Password" onChange={this.handleChange} isInvalid={!!this.state.errors.password} />
                <Form.Control.Feedback type="invalid">{this.state.errors["password"]} </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Control type="password"  className="item" name="confirmPassword" placeholder="Confirm Password" onChange={this.handleChange} isInvalid={!!this.state.errors.confirmPassword} />
                <Form.Control.Feedback type="invalid">{this.state.errors["confirmPassword"]} </Form.Control.Feedback>
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
