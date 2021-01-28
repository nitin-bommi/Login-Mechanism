import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class userDashboard extends React.Component {
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
        semester: null,
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
            const {userid, firstName, lastName, phone, email, gender, school, department, semester, dateOfBirth, yearOfJoin}=res.data.userDetails;
            this.setState({ userid: userid, 
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                gender: gender,
                school: school,
                department: department, 
                semester: semester,
                dateOfBirth: new Date(dateOfBirth),
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
                <div className="heading"><h1>Welcome to User Dashboard</h1>
                    <div className="center">
                        <Button variant="secondary" onClick={logout}>Logout</Button>  
                    </div>
                </div>
                
                <div className="studentdetails center">
                    <h2 className="center-text">Details</h2>
                    <table className="center">
                        <tr>
                            <td>Student ID:</td>
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
                            <td>School:</td>
                            <td>{this.state.school}</td>
                        </tr>
                        <tr>
                            <td>Department:</td>
                            <td>{this.state.department}</td>
                        </tr>
                        <tr>
                            <td>Semester:</td>
                            <td>{this.state.semester}</td>
                        </tr>
                        <tr>
                            <td>Year of Joining:</td>
                            <td>{this.state.yearOfJoin}</td>
                        </tr>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>{this.state.dateOfBirth.toLocaleDateString()}</td>
                        </tr>
                    </table>    
                </div>         
            </div>
        );
    }
}

export default userDashboard
