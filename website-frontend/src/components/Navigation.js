import React from "react";
import axios from "axios";
import { Component } from "react";
import { getUserRole, logout } from "../utils.js";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
    };
  }

  async componentDidMount() {
    const tokenRole = await getUserRole();
    //   const role = await getUserRole();
    this.setState({ role: tokenRole });
    // if (role === "Student") {
    //   window.location.replace("/studentDashboard");
    // } else if (role === "Professor") {
    //   window.location.replace("/professorDashboard");
    // } else {
    //   this.setState({ notLoggedIn: true });
    // }
  }
  render() {
    const Logout = async () => {
      if (await getUserRole()) {
        logout();
        window.location.replace("/");
      }
    };
    return (
      <div>
        <Navbar bg="dark" variant="dark">
          {console.log(this.state.role)}
          {this.state.role === "Student" && (
            <>
              <Nav className="">
                <Nav.Link href="/scalendar">Calendar</Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link href="/studentDashboard">Dashboard</Nav.Link>
              </Nav>
            </>
          )}

          {this.state.role === "Professor" && (
            <>
              <Nav className="">
                <Nav.Link href="/pcalendar">Calendar</Nav.Link>
              </Nav>
              <Nav className="mr-auto">
                <Nav.Link href="/professorDashboard">Dashboard</Nav.Link>
              </Nav>
            </>
          )}

          <Form inline>
            <Button variant="secondary" onClick={Logout}>
              Logout
            </Button>
          </Form>
        </Navbar>
      </div>
    );
  }
}

export default Navigation;
