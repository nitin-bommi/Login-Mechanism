import { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { getUserRole, logout } from "../utils.js";

class PasswordLogin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: "",
      counter: 0,
      notLoggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    const tokenRole = await getUserRole();
    const role = await getUserRole();
    if (role === "Student") {
      window.location.replace("/studentDashboard");
    } else if (role === "Professor") {
      window.location.replace("/professorDashboard");
    } else {
      this.setState({ notLoggedIn: true });
    }
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    if (this.state.counter < 3) {
      if (this.state.password !== "") {
        const res = await axios.post(
          "http://localhost:8080/api/passwordlogin/",
          { password: this.state.password }
        );
        if (res.data.success) {
          //If token is not found in cookie and server throws an error
          //Then redirect to checkid page
          if (res.data.error === "token") {
            window.location.replace("/");
          }
          if (res.data.result.role === "Student") {
            window.location.replace("/studentDashboard");
          } else {
            // this.props.handleLogin("professor");
            window.location.replace("/professorDashboard");
          }
        } else {
          alert(res.data.message);
          this.setState({ counter: this.state.counter + 1 });
        }
      } else {
        alert("Password must not be blank");
      }
    } else {
      alert("Incorrect password entered too many times, please enter ID again");
      if (await getUserRole()) {
        logout();
        window.location.replace("/");
      }
    }
  }

  render() {
    let notLoggedIn = this.state.notLoggedIn;
    return (
      <div>
        {notLoggedIn ? (
          <div className="form-form">
            <Form onSubmit={this.handleSubmit}>
              <Form.Group controlId="password">
                <Form.Control
                  type="password"
                  className="item"
                  name="password"
                  placeholder="Enter Password"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="submitbutton">
                <Button type="submit" className="create-account">
                  Login
                </Button>
              </Form.Group>
            </Form>
          </div>
        ) : null}
      </div>
    );
  }
}

export default PasswordLogin;
