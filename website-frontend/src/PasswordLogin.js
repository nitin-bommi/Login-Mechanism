import { Component} from 'react';

class PasswordLogin extends Component {
  constructor(props){
    super(props);
    this.state={
      studentid: "",
      password: ""
    }
  }
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