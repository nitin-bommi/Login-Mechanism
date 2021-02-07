import { Component} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie';

class PasswordLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      userid: "",
      password: "",
      counter: 0,
    }
    this.handleChange=this.handleChange.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
  }

  async handleSubmit(e){
    e.preventDefault();
    if(this.state.counter < 3){
      const token = Cookies.get('token');
      const config = {
        headers:{
          "x-access-token":  token
        }
      }
      if(this.state.password!==""){
        const res = await axios.post("http://localhost:8080/api/passwordlogin/", {password: this.state.password}, config);
        if(res.data.success){
          console.log(res.data.result.role);
          if(res.data.result.role === 'Student'){

                window.location.replace("/studentDashboard");

          }else{
            // this.props.handleLogin("professor");
            window.location.replace("/professorDashboard");
          }

        }else{
          alert(res.data.message);
          this.setState({ counter: this.state.counter + 1 });
        }
      }else{
        alert("Password must not be blank")
      }
    }else{
      alert("Incorrect password entered too many times, please enter ID again");
      if(Cookies.get('token')){
        Cookies.remove('token');
        window.location.replace("/");
      }
    }
  }

  render() {
    return (
        <div>
          <div className="form-form">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="password">
                <Form.Control type="password" className="item" id="password" name="password"  placeholder="Enter Password" onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="submitbutton">
                  <Button type="submit" className="create-account">Login</Button>
              </Form.Group>
            </Form>
          </div>

        </div>
      );
  }

}

export default PasswordLogin;
