import { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment); 

class MyCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
          eventslist: [] 
        };
        
    }
    componentDidMount(){
      const token = localStorage.getItem("userid");
      console.log(this.state);
      console.log(token);
      const config = {
        headers:{
          "x-access-token":  token
        }
      }
       axios.get("http://localhost:8080/calendar/allevents/",config)
       .then((res)=>{
            console.log(res.data);
            console.log(res.data.events);
            this.setState({ eventslist: res.data.events });
       }).catch((error)=>{
            console.log(error);
       })
    }

    render() {
        // const dummyEvents = [
        //     {
        //       allDay: false,
        //       end: new Date('January 10, 2021 11:13:00'),
        //       start: new Date('January 09, 2021 11:13:00'),
        //       title: 'hi',
        //     },
        //     {
        //       allDay: true,
        //       end: new Date('January 09, 2021 11:13:00'),
        //       start: new Date('January 09, 2021 11:13:00'),
        //       title: 'All Day Event',
        //     },
        //   ];
        return (
            <div className="rbc-calendar">
                <Calendar
                  localizer={localizer}
                  events={ this.state.eventslist}
                  startAccessor="start"
                  endAccessor="end"
                />
            </div>
        );
      }


}


export default MyCalendar;