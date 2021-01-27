import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './components/CheckID';
import BasicRegister from './components/BasicRegister';
import PasswordLogin from './components/PasswordLogin';
import NextRegister from './components/NextRegister';
import userDashboard from './components/userDashboard';
import Options from './components/Options';
import FaceLogin from './components/FaceLogin';
import FaceSignUp from './components/FaceSignUp';
import MyCalendar from './components/MyCalendar';
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
        <Route exact path="/calendar" component={MyCalendar} />
      </Switch>
    </Router>
  );
}

export default App;
