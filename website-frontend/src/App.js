import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './CheckID';
import BasicRegister from './BasicRegister';
import PasswordLogin from './PasswordLogin';
import NextRegister from './NextRegister';
import userDashboard from './userDashboard';
import FaceRecognition from './FaceRecognition';
import Options from './Options';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/nextregister" component={NextRegister} />
        <Route exact path="/userDashboard" component={userDashboard} />
        <Route exact path="/faceLogin" render={props => <FaceRecognition verify={true} {...props} />} />
        <Route exact path="/faceSignUp"render={props => <FaceRecognition verify={false} {...props} />} />
        <Route exact path="/options" component={Options} />
      </Switch>
    </Router>
  );
}

export default App;
