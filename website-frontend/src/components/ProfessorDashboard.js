import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';

class ProfessorDashboard extends React.Component {
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
        designation: "",
        yearOfJoin: null,
        dateOfBirth: null
      }
      
    }
    
    componentDidMount(){
      const token = localStorage.getItem("userid");
      console.log(this.state);
      console.log(token);
      const config = {
        headers:{
          "x-access-token":  token
        }
      }
       axios.get("http://localhost:8080/api/userdetails/", config)
       .then((res)=>{
            console.log(res.data);
            console.log(res.data.userDetails.userid);
            const {userid, firstName, lastName, phone, email, gender, designation, school, department, dateOfBirth, yearOfJoin}=res.data.userDetails;
            this.setState({ userid: userid, 
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                gender: gender,
                school: school,
                department: department, 
                designation: designation,
                dateOfBirth: (new Date(dateOfBirth)).toLocaleDateString(),
                yearOfJoin: yearOfJoin 
            });
       }).catch((error)=>{
            console.log(error);
       })
    }
    render() {
        const logout = ()=>{
            if(localStorage.getItem("userid")){
                localStorage.removeItem('userid');
                window.location.replace("/");
            }
        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/pcalendar">Calender</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="secondary" onClick={logout}>Logout</Button>
                    </Form>
                </Navbar>
                <div className="heading">
                    <h1>Welcome to Professor Dashboard</h1>
                </div>
                
                <div className="studentdetails center">
                    <h2 className="center-text">Professor Details</h2>
                    <table className="center">
                        <tr>
                            <td>Professor ID:</td>
                            <td>{this.state.userid}</td>
                        </tr>
                        <tr>
                            <td>Name:</td>
                            <td>{this.state.firstName} {this.state.lastName}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>{this.state.phone}</td>
                        </tr>
                        <tr>
                            <td>Phone:</td>
                            <td>{this.state.phone}</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{this.state.email}</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{this.state.gender}</td>
                        </tr>
                        <tr>
                            <td>Designation:</td>
                            <td>{this.state.designation}</td>
                        </tr>
                        <tr>
                            <td>School:</td>
                            <td>{this.state.school}</td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>{this.state.department}</td>
                        </tr>
                        <tr>
                            <td>Year of Joining:</td>
                            <td>{this.state.yearOfJoin}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>{this.state.dateOfBirth}</td>
                        </tr>
                    </table>    
                </div>         
            </div>
        );
    }
}

export default ProfessorDashboard;