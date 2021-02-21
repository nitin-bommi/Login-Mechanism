import React from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { getUserRole, logout } from "../utils";
import Navigation from "./Navigation";

class ProfessorDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      firstName: "",
      lastName: "",
      school: "",
      phone: "",
      email: "",
      gender: "",
      department: "",
      designation: "",
      yearOfJoin: null,
      dateOfBirth: null,
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:8080/api/userdetails/")
      .then((res) => {
        const {
          userid,
          firstName,
          lastName,
          phone,
          email,
          gender,
          designation,
          school,
          department,
          dateOfBirth,
          yearOfJoin,
        } = res.data.userDetails;
        this.setState({
          userid: userid,
          firstName: firstName,
          lastName: lastName,
          phone: phone,
          email: email,
          gender: gender,
          school: school,
          department: department,
          designation: designation,
          dateOfBirth: new Date(dateOfBirth).toDateString(),
          yearOfJoin: yearOfJoin,
        });
      })
      .catch((error) => {
        console.log(error);
      });
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
        {/* <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/pcalendar">Calendar</Nav.Link>
                    </Nav>
                    <Form inline>
                        <Button variant="secondary" onClick={Logout}>Logout</Button>
                    </Form>
                </Navbar> */}
        <Navigation />
        <div className="heading m-4">
          <h1>Welcome to Professor Dashboard</h1>
        </div>

        <div className="studentdetails center">
          <table className="center">
            <tbody>
              <tr>
                <td>
                  <b>Professor ID:</b>
                </td>
                <td>{this.state.userid}</td>
              </tr>
              <tr>
                <td>
                  <b>Name:</b>
                </td>
                <td>
                  {this.state.firstName} {this.state.lastName}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Phone:</b>
                </td>
                <td>{this.state.phone}</td>
              </tr>
              <tr>
                <td>
                  <b>Email:</b>
                </td>
                <td>{this.state.email}</td>
              </tr>
              <tr>
                <td>
                  <b>Gender:</b>
                </td>
                <td>{this.state.gender}</td>
              </tr>
              <tr>
                <td>
                  <b>Designation:</b>
                </td>
                <td>{this.state.designation}</td>
              </tr>
              <tr>
                <td>
                  <b>School:</b>
                </td>
                <td>{this.state.school}</td>
              </tr>
              <tr>
                <td>
                  <b>Department:</b>
                </td>
                <td>{this.state.department}</td>
              </tr>
              <tr>
                <td>
                  <b>Year of Joining:</b>
                </td>
                <td>{this.state.yearOfJoin}</td>
              </tr>
              <tr>
                <td>
                  <b>Date of Birth:</b>
                </td>
                <td>{this.state.dateOfBirth}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ProfessorDashboard;
