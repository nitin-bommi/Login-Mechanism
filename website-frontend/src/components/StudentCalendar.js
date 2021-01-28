import { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment); 

class StudentCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
          eventslist: [] 
        };
        
    }
    componentDidMount(){
       axios.get("http://localhost:8080/calendar/allevents/")
       .then((res)=>{
            console.log(res.data);
            console.log(res.data.events);      
            res.data.events.forEach(element => {
              element.start=new Date(element.start);
              element.end = new Date(element.end);
            })
            this.setState({eventslist: res.data.events})
       }).catch((error)=>{
            console.log(error);
       })
    }

    render() {
        
        return (
            <div className="rbc-calendar">
                <Calendar
                  popup
                  localizer={localizer}
                  events={ this.state.eventslist}
                  startAccessor="start" 
                  endAccessor="end" 
                />
            </div>
        );
      }
}


export default StudentCalendar;