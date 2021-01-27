import { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment); 

class MyCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
          
        };
        
    }
    render() {
        const dummyEvents = [
            {
              allDay: false,
              end: new Date('January 10, 2021 11:13:00'),
              start: new Date('January 09, 2021 11:13:00'),
              title: 'hi',
            },
            {
              allDay: true,
              end: new Date('January 09, 2021 11:13:00'),
              start: new Date('January 09, 2021 11:13:00'),
              title: 'All Day Event',
            },
          ];
        return (
            <div className="rbc-calendar">
                <Calendar
                  localizer={localizer}
                  events={dummyEvents}
                  startAccessor="start"
                  endAccessor="end"
                />
            </div>
        );
      }


}


export default MyCalendar;