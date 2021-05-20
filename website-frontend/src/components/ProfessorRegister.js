import { Component} from 'react';
import axios from "axios";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {getUserRole} from '../utils.js';

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
      alert: false,
      notLoggedIn: false,
      schoolsList:[
        'School of Mathematics and Statistics',
        'School of Physics',
        'School of Chemistry',
        'School of Life Sciences',
        'School of Computer and Information Sciences',
        'School of Social Sciences',
        'School of Humanities',
        'School of Engg. Sciences and Technology',
        'School of Management Studies',
        'Sarojini Naidu School of Arts and Communication',
        'School of Economics',
        'School of Medical Sciences'
      ],
      departmentsList:[
        'School of Mathematics and Statistics',
        'School of Physics',
        'School of Chemistry',
        'Department of Biochemistry',
        'Department of Plant Sciences',
        'Department of Animal Biology',
        'Department of Biotechnology and Bioinformatics',
        'Department of Systems and Computational Biology',
        'School of Computer and Information Sciences',
        'Department of History',
        'Department of Sociology',
        'Department of Political Science',
        'Department of Anthrolpology',
        'Department of Education and Education Technology',
        'Department of English',
        'Department of Philosophy',
        'Department of Hindi',
        'Department of Telugu',
        'Department of Urdu',
        'Department of Sanskrit Studies',
        'School of Engg. Sciences and Technology',
        'School of Management Studies',
        'Department of Communication',
        'Department of Dance',
        'Department of Fine Arts',
        'Department of Theatre Arts',
        'Department of Music',
        'School of Economics',
        'School of Medical Sciences'
      ],
      designationsList:[
        'Professor',
        'Senior Professor',
        'Assistant Professor',
        'Associate Professor',
        'Professor and Dean',
        'Dean',
        'Emeritus Professor',
        'Adhoc/Guest Faculty',
        'Adjunct Faculty/Visiting Faculty',
        'Honorary Professor',
        'Re-employed',
        'Head of Department'
      ]
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  async componentDidMount(){
    const role = await getUserRole();
      if(role === "Student"){
          window.location.replace('/studentDashboard');
      }else if(role === "Professor"){
        window.location.replace('/professorDashboard');
    }else{
      this.setState({ notLoggedIn: true })
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e){
    e.preventDefault();

    const { gender, school, department, designation, yearOfJoin, dob} = this.state;
    let data={
      gender, school, department, designation, dob,  yearOfJoin
    }
  

    try {
     const res = await axios.post("http://localhost:8080/api/professor_registration/", data);
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
    let notLoggedIn = this.state.notLoggedIn;
    return (
        <div>
          { notLoggedIn ?
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
                    {
                      this.state.designationsList.map((item)=>{
                        return(
                          <option>{item}</option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="school">
                  <Form.Control as="select" id="school" className="item-2" name="school" onChange={this.handleChange}>
                    <option>Select School</option>
                    {
                      this.state.schoolsList.map((item)=>{
                        return(
                          <option>{item}</option>
                        )
                      })
                    }
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="department">
                  <Form.Control as="select" id="department" className="item-2" name="department" onChange={this.handleChange}>
                    <option>Select Department</option>
                    {
                      this.state.departmentsList.map((item)=>{
                        return(
                          <option>{item}</option>
                        )
                      })
                    }
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
          : 
            null
        }
        </div>
      );
  }

}

export default ProfessorRegister;
