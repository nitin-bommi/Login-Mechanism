import { Component} from 'react';
import {Link} from 'react-router-dom';
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
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Control type="text" className="item" id="userid" placeholder="User ID" name="userid" pattern="(^\d{2}[a-zA-Z]{4}\d{2}$|^\d{5}$)" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="formBasicEmail">
                  <Button type="submit" onClick={this.handleSubmit} className="create-account">Check ID</Button>
              </Form.Group>
            </Form>
            <div className="others">
              <p><Link className='text-link' to="/passwordlogin">CheckPassword</Link></p>
              <p><Link className='text-link' to="/basicregister">Basic Register</Link></p>
              <p><Link className='text-link' to="/faceSignUp">Sign Up with face</Link></p>
            </div>
          </div>
//           <Form>
//   <Form.Group controlId="formBasicEmail">
//     <Form.Label>Email address</Form.Label>
//     <Form.Control type="email" placeholder="Enter email" />
//     <Form.Text className="text-muted">
//       We'll never share your email with anyone else.
//     </Form.Text>
//   </Form.Group>

//   <Form.Group controlId="formBasicPassword">
//     <Form.Label>Password</Form.Label>
//     <Form.Control type="password" placeholder="Password" />
//   </Form.Group>
//   <Form.Group controlId="formBasicCheckbox">
//     <Form.Check type="checkbox" label="Check me out" />
//   </Form.Group>
//   <Button variant="primary" type="submit">
//     Submit
//   </Button>
// </Form>
        : 
          null
          //<div>Loading ...</div>
      }
      </div>
    );
  }
    
}

export default CheckID;