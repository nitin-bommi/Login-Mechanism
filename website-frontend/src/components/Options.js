import { Component} from 'react';
import {Link} from 'react-router-dom';


class Options extends Component {
  
  render() {  
    return (
        <div className="center">
          <div className="cards"><Link to="/passwordlogin">Login with password</Link></div>
          <div className="cards"><Link to="/faceLogin">Login with Face</Link></div>
        </div>
      );
  }
    
}

export default Options;