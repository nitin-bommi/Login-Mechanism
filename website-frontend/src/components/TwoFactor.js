import { Component } from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import { getUserRole, getAscii, getUserID } from "../utils.js";
import axios from "axios";

class TwoFactor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: "",
      userid: "",
      ascii: "",
      otp: "",
      error: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount() {
    //const tokenRole = await getUserRole();
    const role = await getUserRole();
    const userid = await getUserID();
    const ascii = await getAscii();
    this.setState({
      role,
      userid,
      ascii,
    });
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  async handleSubmit(e) {
    e.preventDefault();
    const res = await axios.post("http://localhost:8080/api/2fa/", {
      ascii: this.state.ascii,
      otp: this.state.otp,
    });
    if (res.data.authenticated === true) {
      const role = await getUserRole();
      if (role === "Student") {
        window.location.replace("/studentDashboard");
      } else {
        window.location.replace("/professorDashboard");
      }
    } else {
      //Authentication failed
      this.setState({ error: "Invalid OTP" });
    }
  }
  render() {
    const image = this.state.userid + ".png";
    return (
      <div>
        <h1> Scan this QR code: </h1>
        {this.state.error !== "" && <h3>{this.state.error}</h3>}
        <img src={image} alt="User QR code"/>

        <form onSubmit={this.handleSubmit}>
          <label for="otp">Enter OTP: </label>
          <input
            type="text"
            name="otp"
            id="otp"
            placeholder="Enter OTP after scanning"
            onChange={this.handleChange}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default TwoFactor;
