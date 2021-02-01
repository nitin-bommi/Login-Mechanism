import { Component} from 'react';
import {Link} from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';


class Options extends Component {
  
  render() {  
    return (
        <div>
          <table>
            <tr>
              <td>
                <Link className="text-link d-inline p-2" to="/passwordlogin">
                  <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src="/../images/face.png" />
                    <Card.Body>
                      <Card.Title>Login with password</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </td>
              <td>
                <Link className="text-link d-inline p-2" to="/faceLogin">
                  <Card style={{ width: '18rem' }} className="text-center">
                    <Card.Img variant="top" src="/../images/password.jpg" />
                    <Card.Body>
                      <Card.Title>Login with Face</Card.Title>
                    </Card.Body>
                  </Card>
                </Link>
              </td>
            </tr>
          </table>
        </div>
      );
  }
    
}

export default Options;