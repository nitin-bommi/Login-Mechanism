import { Component} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
// import Col from 'react-bootstrap/Col';
import face from '../images/face.png';
import passwordimage from '../images/password.png';


class Options extends Component {

  render() {
    return (
        <div>
          <div className="heading">
            <h1>Select Mode of Login</h1>
          </div>
          <table className="table-center">
            <tbody>
            <tr>
              <td>
                <Link className="text-link d-inline p-2" to="/passwordlogin">
                  <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src= {passwordimage} />
                    <Card.Body>
                      <Card.Title>Login with password</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </td>
              <td>
                <Link className="text-link d-inline p-2" to="/faceLogin">
                  <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src={face} />
                    <Card.Body>
                      <Card.Title>Login with Face</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      );
  }

}

export default Options;
