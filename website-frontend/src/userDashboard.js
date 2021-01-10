import React from 'react';
import axios from 'axios';

class userDashboard extends React.Component {
    constructor(props){
      super(props);
      this.state={
        studentid: "",
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
      const token = localStorage.getItem("studentid");
      console.log(this.state);
      console.log(token);
      const config = {
        headers:{
          "x-access-token":  token
        }
      }
       axios.get("http://localhost:5000/api/userdetails/", config)
       .then((res)=>{
            console.log(res.data);
            console.log(res.data.userDetails.studentid);
            const {studentid, firstName, lastName, phone, email, gender, school, department, semester, dateOfBirth, yearOfJoin}=res.data.userDetails;
            this.setState({ studentid: studentid, 
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email,
                gender: gender,
                school: school,
                department: department, 
                semester: semester,
                dateOfBirth: dateOfBirth.slice(0,10),
                yearOfJoin: yearOfJoin 
            });
       }).catch((error)=>{
            console.log(error);
       })
    }
    render() {
        const logout = ()=>{
            if(localStorage.getItem("studentid")){
                localStorage.removeItem('studentid');
                window.location.replace("/");
            }
        }
      return (
          <div>
              <h1>Welcome to User Dashboard</h1>
              <div>
                    {this.state.studentid}
              </div>
              <div>
                  {this.state.firstName}
              </div>
              <div>
                  {this.state.lastName}
              </div>
              <div>
                  {this.state.phone}
              </div>
              <div>
                  {this.state.email}
              </div>
              <div>
                  {this.state.gender}
              </div>
              <div>
                  {this.state.school}
              </div>
              <div>
                  {this.state.department}
              </div>
              <div>
                  {this.state.semester}
              </div>
              <div>
                  {this.state.yearOfJoin}
              </div>
              <div>
                  {this.state.dateOfBirth}
              </div>
               <button onClick={logout}>Logout</button>           
          </div>
        );
    }
      
  }

export default userDashboard
