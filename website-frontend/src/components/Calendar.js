import { Component} from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = BigCalendar.momentLocalizer(moment) 

class Calendar extends Component {
    constructor(props){
        super(props);
        this.state={
          
        };
        
    }
    render() {
        return (
            <div>
                <BigCalendar
                  localizer={localizer}
                  //events={}
                  startAccessor="start"
                  endAccessor="end"
                />
            </div>
        );
      }


}


export default Calendar;