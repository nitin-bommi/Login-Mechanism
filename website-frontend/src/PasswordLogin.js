import { Component} from 'react';
<<<<<<< HEAD
import axios from 'axios';
=======

>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
class PasswordLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
<<<<<<< HEAD
      password: "",
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
    const token = localStorage.getItem("studentid");
    const config = {
      headers:{
        "x-access-token":  token
      }
    }
    const res = await axios.post("http://localhost:5000/api/passwordlogin/", {password: this.state.password}, config);
    if(res.data.success){
      window.location = "/userDashboard";
    }else{
      this.setState({alert: true});
      setTimeout(() => {
        this.setState({alert: false});
      }, 3000);
=======
      password: ""
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
    }
  }
  render() {  
    return (
        <div>
<<<<<<< HEAD
          {this.state.alert && <h3>Incorrect Password</h3>}
          <form onSubmit={this.handleSubmit}>
            <input type="password" id="password" name="password" onChange={this.handleChange}></input>
            <button type="submit">Check Password</button>
          </form>
        
=======
          <input type="password" id="password" name="password"></input>
          <button type="submit">Check Password</button>
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
        </div>
      );
  }
    
}

export default PasswordLogin;