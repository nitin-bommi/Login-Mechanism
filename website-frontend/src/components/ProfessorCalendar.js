import { Component} from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// Setup the localizer by providing the moments Object
// to the correct localizer.
const localizer = momentLocalizer(moment); 

class ProfessorCalendar extends Component {
    constructor(props){
        super(props);
        this.state={
          eventslist: [],
          show: true,
          newevent: {}
        };       
    }
    handleChange(e) {
        this.setState({[e.target.name]: e.target.value})
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
    
    handleSelect = ( { start, end }) => {
        const handleClose = () => this.setState({show: false}); 
        const handleAdd = ({start, end}) => {
            let newevent= {
                start: start,
                end: end,
                title: this.state.newevent
            }
            this.state.eventslist.push(newevent);
        }   
        return(
            <Modal centered show={this.state.show} onHide={handleClose}> 
                <Modal.Header closeButton>
                    <Modal.Title>Add new Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="text" id="newevent" name="newevent" placeholder="Enter new event name" onChange={this.handleChange} />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleAdd(start,end)}>
                        Add Event
                    </Button>
                </Modal.Footer>
            </Modal>
        )
        
        
      }

    render() {
        
        return (
            <div className="rbc-calendar">
                <Calendar
                  selectable
                  popup
                  localizer={localizer}
                  events={ this.state.eventslist}
                  startAccessor="start" 
                  endAccessor="end"
                  onSelectSlot={this.handleSelect} 
                />
            </div>
        );
      }
}


export default ProfessorCalendar;