import { Component} from 'react';

class CheckID extends Component {
  render() {
    return (
        <div>
          <input type="text" id="studentid" name="studentid"></input>
          <button type="submit">Check ID</button>
        </div>
      );
  }
    
}

export default CheckID;