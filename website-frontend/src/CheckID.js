import { Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class CheckID extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
      NotLoggedIn: null
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
        window.location.replace("/passwordlogin")
        // console.log("TRUE");
      }else{
        window.location="/basicregister"
        // console.log("FALSE");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    
    
  }
  componentDidMount(){
    if(localStorage.getItem("studentid")){
      window.location.replace('/passwordlogin');
    }else{
      this.setState({ NotLoggedIn: true })
    }
  }
  

  render() {
    let notLoggedIn=this.state.NotLoggedIn;
    return (
      <div>
      { notLoggedIn ?
          <div>
            <input type="text" id="studentid" name="studentid" pattern="\d{2}[a-zA-Z]{4}\d{2}" onChange={this.handleChange}></input>
            <button type="submit" onClick={this.handleSubmit}>Check ID</button><br/>
            <Link to="/passwordlogin">CheckPassword</Link><br/>
            <Link to="/basicregister"><button>Register</button></Link>
          </div>
        : 
          <div>Loading ...</div>
      }
      </div>
    );
  }
    
}

export default CheckID;