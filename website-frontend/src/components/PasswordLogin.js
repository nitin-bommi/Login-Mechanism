import { Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class PasswordLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
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
    const token = localStorage.getItem("userid");
    const config = {
      headers:{
        "x-access-token":  token
      }
    }
    const res = await axios.post("http://localhost:8080/api/passwordlogin/", {password: this.state.password}, config);
    if(res.data.success){
      console.log(res.data.result.role);
      if(res.data.result.role === 'Student')
        window.location.replace("/studentDashboard");
      else
        window.location.replace("/professorDashboard");
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

          <div className="form-form">
            <Form onSubmit={this.handleSubmit}>
              <h3 className="form-heading">
                Password Login
              </h3>
              <Form.Group controlId="password">
                <Form.Control type="password" className="item" id="password" name="password" placeholder="Enter Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="submitbutton">
                  <Button type="submit" className="create-account">Check Password</Button>
              </Form.Group>
            </Form>
          </div>
        
        </div>
      );
  }
    
}

export default PasswordLogin;