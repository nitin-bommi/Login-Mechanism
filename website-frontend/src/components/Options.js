import { Component} from 'react';
import {Link} from 'react-router-dom';


class Options extends Component {
  
  render() {  
    return (
        <div className="center">
          <Link className="text-link" to="/passwordlogin"><div className="cards">Login with password</div></Link>
          <Link className="text-link" to="/faceLogin"><div className="cards">Login with Face</div></Link>
        </div>
      );
  }
    
}

export default Options;