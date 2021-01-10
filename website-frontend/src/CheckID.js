import { Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CheckID extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
      notLoggedIn: false
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  async handleSubmit(e){
    e.preventDefault();
    let details={
      studentid: this.state.studentid
    }
    try {
      const res = await axios.post('http://localhost:5000/api/checkid',details);
      const data = res.data;
      localStorage.setItem("studentid", data.token)
      if(data.success){
        window.location.replace("/options")
        // console.log("TRUE");
      }else{
        window.location.replace("/faceSignUp");
        // console.log("FALSE");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    
    
  }
  componentDidMount(){
    if(localStorage.getItem("studentid")){
      window.location.replace('/options');
    }else{
      this.setState({ notLoggedIn: true })
    }
  }
  

  render() {
    let notLoggedIn=this.state.notLoggedIn;
    return (
      <div>
      { notLoggedIn ?
          // <div className="form-form">
          //   <div className="form">
          //     <div className="form-group">
          //         <input type="text" className="item" name="username" id="username" placeholder="Username" required></input>
          //     </div>
          //     <span className="help-block" id="txtHint"></span>
          //     <div className="form-group">
          //         <input type="password" className="item" name="password" id="password" placeholder="Password" required></input>
          //     </div>
          //     <div className="form-group">
          //         <input type="submit" name="login" value="Login" className="create-account"></input>
          //     </div>
          //   </div>
          // </div>
          <div className="center">
            <input type="text" id="studentid" name="studentid" pattern="\d{2}[a-zA-Z]{4}\d{2}" onChange={this.handleChange}></input>
            <button type="submit" onClick={this.handleSubmit}>Check ID</button><br/>
            <Link to="/passwordlogin">CheckPassword</Link><br/>
            <Link to="/faceSignUp"><button>Register</button></Link>
          </div>
        : 
          null
          //<div>Loading ...</div>
      }
      </div>
    );
  }
    
}

export default CheckID;