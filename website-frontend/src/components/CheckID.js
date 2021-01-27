import { Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

class CheckID extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
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
      userid: this.state.userid
    }
    try {
      const res = await axios.post('http://localhost:8080/api/checkid',details);
      const data = res.data;
      localStorage.setItem("userid", data.token)
      if(data.success){
        window.location.replace("/options")
        // console.log("TRUE");
      }else{
        // eslint-disable-next-line no-restricted-globals
        if(confirm("ID not found in database, do you wish to register as a new user? Please proceed carefully as this ID will be saved in database and then more details will be registered.")){
          window.location.replace("/basicregister");
        }
        // console.log("FALSE");
      }
      // console.log(res);
    } catch (error) {
      console.log(error);
    }
    
    
  }
  componentDidMount(){
    if(localStorage.getItem("userid")){
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
          <div className="form-form">
            <div className="form">
              <div className="form-group">
                <input type="text" className="item" id="userid" placeholder="User ID" name="userid" pattern="(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)" onChange={this.handleChange}></input>
              </div>
              <div className="form-group">
                  <Button type="submit" onClick={this.handleSubmit} className="create-account">Check ID</Button>
              </div>
            </div>
            <div className="others">
              <h4><Link to="/passwordlogin">CheckPassword</Link></h4>
              <h4><Link to="/basicregister">Basic Register</Link></h4>
              <h4><Link to="/faceSignUp">Sign Up with face</Link></h4>
            </div>
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