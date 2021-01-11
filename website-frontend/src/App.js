import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './CheckID';
import BasicRegister from './BasicRegister';
import PasswordLogin from './PasswordLogin';
import NextRegister from './NextRegister';
import userDashboard from './userDashboard';
import Options from './Options';
import FaceLogin from './FaceLogin';
import FaceSignUp from './FaceSignUp';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/nextregister" component={NextRegister} />
        <Route exact path="/userDashboard" component={userDashboard} />
        <Route exact path="/faceLogin" component={FaceLogin} />
        <Route exact path="/faceSignUp" component={FaceSignUp} />
        <Route exact path="/options" component={Options} />
      </Switch>
    </Router>
  );
}

export default App;
