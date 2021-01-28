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
          show: false,
          start: null,
          end: null,
          newevent: ""
        };       
    }
    handleChange=(e)=> {
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
    handleClose = () => this.setState({show: false});
    handleShow = ({start, end}) => this.setState({start: start, end: end, show: true});
    handleAdd = async() => {
        if(this.state.start && this.state.end && this.state.newevent){
            let data = {
                start: this.state.start,
                end: this.state.end,
                title: this.state.newevent
            }
            try {
                const res = await axios.post("http://localhost:8080/calendar/addevent",  data);
                this.state.eventslist.push(data)
                this.handleClose(); 
                console.log(res.data);
               
            }catch(error){
                console.log(error);
            } 
        }else{
            console.log("Nothing works, tee-hee!");
        }
        
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
                  onSelectSlot={this.handleShow} 
                />
                <Modal centered show={this.state.show} onHide={this.handleClose}> 
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
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.handleAdd}>
                        Add Event
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        );
      }
}


export default ProfessorCalendar;