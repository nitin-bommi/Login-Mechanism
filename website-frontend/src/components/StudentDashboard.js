import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import {getUserRole, logout} from '../utils.js';



class StudentDashboard extends React.Component {
    constructor(props){
      super(props);
      this.state={
        userid: "",
        firstName: "",
        lastName: "",
        school: "",
        phone: "",
        email: "",
        gender: "",
        department: "",
        course: "",
        semester: null,
        yearOfJoin: null,
        dateOfBirth: null
      }

    }

    getUserData(){
             axios.get("http://localhost:8080/api/userdetails/")
             .then((res)=>{
                  // console.log(res.data);
                  // console.log(res.data.userDetails.userid);
                  const {userid, firstName, lastName, phone, email, gender, course, school, department, semester, dateOfBirth, yearOfJoin}=res.data.userDetails;
                  this.setState({ userid: userid.toUpperCase(),
                      firstName: firstName,
                      lastName: lastName,
                      phone: phone,
                      email: email,
                      gender: gender,
                      school: school,
                      department: department,
                      semester: semester,
                      course: course,
                      dateOfBirth: (new Date(dateOfBirth)).toDateString(),
                      yearOfJoin: yearOfJoin
                  });
             }).catch((error)=>{
                  console.log(error);
             })
    }
    componentDidMount(){
      this.getUserData();
    }
    render() {
        const Logout = async  ()=>{
            if(await getUserRole()){
                logout();
                window.location.replace("/");
            }
        }

        return (

            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/scalendar">Calendar</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="secondary" onClick={Logout}>Logout</Button>
                    </Form>
                </Navbar>
                <div className="heading m-4">
                    <h1>Welcome to Student Dashboard</h1>
                </div>

                <div className="studentdetails center">
                    <table className="center">
                    <tbody>
                        <tr>
                            <td><b>Student ID:</b></td>
                            <td>{this.state.userid}</td>
                        </tr>
                        <tr>
                            <td><b>Name:</b></td>
                            <td>{this.state.firstName} {this.state.lastName}</td>
                        </tr>
                        <tr>
                            <td><b>Phone:</b></td>
                            <td>{this.state.phone}</td>
                        </tr>
                        <tr>
                            <td><b>Email:</b></td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td><b>Gender:</b></td>
                            <td>{this.state.gender}</td>
                        </tr>
                        <tr>
                            <td><b>Course:</b></td>
                            <td>{this.state.course}</td>
                        </tr>
                        <tr>
                            <td><b>School:</b></td>
                            <td>{this.state.school}</td>
                        </tr>
                        <tr>
                            <td><b>Department:</b></td>
                            <td>{this.state.department}</td>
                        </tr>
                        <tr>
                            <td><b>Semester:</b></td>
                            <td>{this.state.semester}</td>
                        </tr>
                        <tr>
                            <td><b>Year of Joining:</b></td>
                            <td>{this.state.yearOfJoin}</td>
                        </tr>
                        <tr>
                            <td><b>Date of Birth:</b></td>
                            <td>{this.state.dateOfBirth}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        );
    }
}

export default StudentDashboard;
