import { Component} from 'react';
import {Link} from 'react-router-dom';
class Options extends Component {
  
  render() {  
    return (
        <div>
          <Link to="/passwordlogin">Login with password</Link>
          <Link to="/faceLogin">Login with Face</Link>
        </div>
      );
  }
    
}

export default Options;