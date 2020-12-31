import { Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CheckID extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: ""
    };
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(e){
    e.preventDefault();
    let details={
      studentid: this.state.studentid
    }
    axios.post('http://localhost:5000/checkid',details)
      .then(function (res){
        localStorage.setItem("studentid", res.token)
        if(res.status===200){
          window.location.replace("/passwordlogin")
        }else if(res.status===401){
          window.location="/basicregister"
        }
      })
      .catch(function (error){
        console.log(error);
      })
  }
  componentDidMount(){
    if(localStorage.getItem("studentid")){
      window.location.replace('/passwordlogin');
    }
  }
  

  render() {
    
    return (
        <div>
          <input type="text" id="studentid" name="studentid" pattern="\d{2}[a-zA-Z]{4}\d{2}" onChange={this.handleChange}></input>
          <button type="submit" onClick={this.handleSubmit}>Check ID</button><br/>
          <Link to="/passwordlogin">CheckPassword</Link><br/>
          <Link to="/basicregister"><button>Register</button></Link>
        </div>
      );
  }
    
}

export default CheckID;