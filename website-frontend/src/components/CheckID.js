import { Component} from 'react';
// import {Link} from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

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

  componentDidMount(){
    if(localStorage.getItem("userid")){
      window.location.replace('/options');
    }else{
      this.setState({ notLoggedIn: true })
    }
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }
  
  async handleSubmit(e){
    e.preventDefault();
    if(this.state.userid===""){
      alert("ID must not be left blank");
    }else if(/(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)/.test(this.state.userid)){
      let details={
        userid: this.state.userid.toLowerCase()
      }
      try {
        const res = await axios.post('http://localhost:8080/api/checkid',details);
        const data = res.data;
        localStorage.setItem("userid", data.token)
        if(data.success){
          window.location.replace("/options")
        }else{
          // eslint-disable-next-line no-restricted-globals
          if(confirm("ID not found in database, do you wish to register as a new user? Please proceed carefully as this ID will be saved in database and then more details will be registered.")){
            window.location.replace("/basicregister");
          }else{
            if(localStorage.getItem("userid")){
              localStorage.removeItem('userid');
              window.location.replace("/");
            }
          } 
        }
        // console.log(res);
      } catch (error) {
        console.log(error);
      }
    }else{
      alert("Invalid input");
    }
  }
  
  render() {
    let notLoggedIn=this.state.notLoggedIn;
    return (
      <div>
      { notLoggedIn ?
          <div className="form-form">
            <Form>
              <h3 className="form-heading">
                Enter your ID
              </h3>
              <Form.Group controlId="userid">
                <Form.Control type="text" className="item" placeholder="User ID" name="userid" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="checkbutton">
                  <Button type="submit" onClick={this.handleSubmit} className="create-account">Check ID</Button>
              </Form.Group>
            </Form>
            {/* <div className="others">
              <p><Link className='text-link' to="/passwordlogin">CheckPassword</Link></p>
              <p><Link className='text-link' to="/basicregister">Basic Register</Link></p>
              <p><Link className='text-link' to="/faceSignUp">Sign Up with face</Link></p>
            </div> */}
          </div>
        : 
          null
      }
      </div>
    );
  }
    
}

export default CheckID;