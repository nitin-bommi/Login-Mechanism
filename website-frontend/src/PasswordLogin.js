import { Component} from 'react';

class PasswordLogin extends Component {
  render() {
    return (
        <div>
          <input type="password" id="password" name="password"></input>
          <button type="submit">Check Password</button>
        </div>
      );
  }
    
}

export default PasswordLogin;