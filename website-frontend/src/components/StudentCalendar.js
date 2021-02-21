import { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { getUserRole, logout } from "../utils.js";
import Navigation from "./Navigation";

// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment);

class StudentCalendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventslist: [],
    };
  }
  componentDidMount() {
    axios
      .get("http://localhost:8080/calendar/allevents/")
      .then((res) => {
        console.log(res.data);
        console.log(res.data.events);
        res.data.events.forEach((element) => {
          element.start = new Date(element.start);
          element.end = new Date(element.end);
        });
        this.setState({ eventslist: res.data.events });
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
        <Navigation />
        <div className="rbc-calendar">
          <Calendar
            popup
            localizer={localizer}
            events={this.state.eventslist}
            startAccessor="start"
            endAccessor="end"
            style={{}}
          />
        </div>
      </div>
    );
  }
}

export default StudentCalendar;
