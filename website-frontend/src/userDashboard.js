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
       .then(function(res){
            console.log(res.data);
            console.log(res.data.userDetails.studentid);
            //this.setState({ studentid: "18mcme03" });
            this.setState({ studentid: res.data.userDetails.studentid });
            this.setState({ firstName: res.data.userDetails.firstName });
            this.setState({ lastName: res.data.userDetails.lastName });
            this.setState({ phone: res.data.userDetails.phone });
            this.setState({ email: res.data.userDetails.email });
            this.setState({ gender: res.data.userDetails.gender });
            this.setState({ school: res.data.userDetails.school });
            this.setState({ department: res.data.userDetails.department });
            this.setState({ semester: res.data.userDetails.semester });
            this.setState({ dateOfBirth: res.data.userDetails.dateOfBirth });
            this.setState({ yearOfJoin: res.data.userDetails.yearOfJoin.getFullYear() });
       }).catch(function(error){
            console.log(error);
       })
    }
    render() {
        const logout = ()=>{
            if(localStorage.getItem("studentid")){
                localStorage.removeItem('studentid');
                window.location = "/";
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
