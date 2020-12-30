import { Component} from 'react';

class BasicRegister extends Component {
  render() {
    return (
        <div>
          <input type="text" id="firstname" name="firstName"></input>
          <input type="text" id="lastname" name="lastName"></input>
          <input type="password" id="password" name="password"></input>
          <input type="password" id="confirmpassword" name="confirmPassword"></input>
          <input type="email" id="email" name="email"></input>
          <button type="submit">Next</button>
        </div>
      );
  }
    
}

export default BasicRegister;