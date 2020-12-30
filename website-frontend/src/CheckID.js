import { Component} from 'react';
import {Link} from 'react-router-dom';

class CheckID extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: ""
    }
  }
  render() {
    return (
        <div>
          <input type="text" id="studentid" name="studentid" pattern="\d{2}[a-zA-Z]{4}\d{2}"></input>
          <button type="submit">Check ID</button><br/>
          <Link to="/passwordlogin">CheckPassword</Link><br/>
          <Link to="/basicregister"><button>Register</button></Link>
        </div>
      );
  }
    
}

export default CheckID;