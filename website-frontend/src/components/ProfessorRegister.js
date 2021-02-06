import { Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
class ProfessorRegister extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
      gender: "",
      school:"",
      department: "",
      designation: null,
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
    const token = localStorage.getItem("userid");
    // console.log(this.state);
    const { gender, school, department, designation, yearOfJoin, dob} = this.state;
    let data={
      gender, school, department, designation, dob,  yearOfJoin
    }
    console.log(token);
    const config = {
      headers:{
        "x-access-token":  token
      }
    }
    try {
     const res = await axios.post("http://localhost:8080/api/professor_registration/", data,config);
    console.log(res.data);
    if(res.data.success){
      this.setState({alert: true});
      window.location.replace("/faceSignUp");
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
          <div className="form-form">
            {this.state.alert && <p>User data saved successfully</p>}
            <Form onSubmit={this.handleSubmit}>
              <h4 className="form-heading">
                Professor Additional Information
              </h4>
              <Form.Group controlId="gender">
                <Form.Control as="select" id="gender" className="item-2" name="gender" onChange={this.handleChange}>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="designation">
                <Form.Control as="select" id="designation" className="item-2" name="designation" onChange={this.handleChange}>
                  <option>Select Designation</option>
                  <option>Assistant Professor</option>
                  <option>Associate Professor</option>
                  <option>Professor</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="school">
                <Form.Control as="select" id="school" className="item-2" name="school" onChange={this.handleChange}>
                  <option>Select School</option>
                  <option>School of Computer and Information Sciences</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="department">
                <Form.Control as="select" id="department" className="item-2" name="department" onChange={this.handleChange}>
                  <option>Select Department</option>
                  <option>Computer Science</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="yearOfJoin">
                <Form.Control as="select" id="yearOfJoin" className="item-2" name="yearOfJoin" onChange={this.handleChange}>
                  <option>Select Year of Join</option>
                  <option>2001</option>
                  <option>2012</option>
                  <option>2018</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="date">
                <Form.Control type="date" id="dateOfBirth" className="item-2" name="dob" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="submitbutton">
                <Button type="submit" className="create-account">Submit</Button>
              </Form.Group>
            </Form>
          </div>
        </div>
      );
  }

}

export default ProfessorRegister;
