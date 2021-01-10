import { Component} from 'react';
import axios from 'axios';
class PasswordLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
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
      window.location.replace("/userDashboard");
    }else{
      this.setState({alert: true});
      setTimeout(() => {
        this.setState({alert: false});
      }, 3000);
    }
  }
  render() {  
    return (
        <div>
          {this.state.alert && <h3>Incorrect Password</h3>}
          <form onSubmit={this.handleSubmit}>
            <input type="password" id="password" name="password" onChange={this.handleChange}></input>
            <button type="submit">Check Password</button>
          </form>
        
        </div>
      );
  }
    
}

export default PasswordLogin;