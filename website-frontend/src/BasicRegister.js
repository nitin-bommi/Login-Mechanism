import { Component} from 'react';
import {Link} from 'react-router-dom';

class BasicRegister extends Component {
  render() {
    return (
        <div>
          <input type="text" id="firstname" name="firstName" placeholder="First Name"></input><br/>
          <input type="text" id="lastname" name="lastName" placeholder="Last name"></input><br/>
          <input type="password" id="password" name="password" placeholder="Password"></input><br/>
          <input type="password" id="confirmpassword" name="confirmPassword" placeholder="Confirm Password"></input><br/>
          <input type="email" id="email" name="email" placeholder="Email"></input><br/>
          <Link to="/nextregister"><button type="submit">Next</button></Link>
        </div>
      );
  }
    
}

export default BasicRegister;