import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';

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
      const token = Cookies.get('token');
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
            if(Cookies.get('token')){
                localStorage.removeItem('userid');
                window.location.replace("/");
            }
        }
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/pcalendar">Calendar</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="secondary" onClick={logout}>Logout</Button>
                    </Form>
                </Navbar>
                <div className="heading m-4">
                    <h1>Welcome to Professor Dashboard</h1>
                </div>

                <div className="studentdetails center">
                    <table className="center">
                        <tr>
                            <td><b>Professor ID:</b></td>
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
                            <td><b>Designation:</b></td>
                            <td>{this.state.designation}</td>
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
                            <td><b>Year of Joining:</b></td>
                            <td>{this.state.yearOfJoin}</td>
                        </tr>
                        <tr>
                            <td><b>Date of Birth:</b></td>
                            <td>{this.state.dateOfBirth}</td>
                        </tr>
                    </table>
                </div>
            </div>
        );
    }
}

export default ProfessorDashboard;
