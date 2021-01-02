import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './CheckID';
import BasicRegister from './BasicRegister';
import PasswordLogin from './PasswordLogin';
import NextRegister from './NextRegister';
<<<<<<< HEAD
import userDashboard from './userDashboard';
=======
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/nextregister" component={NextRegister} />
<<<<<<< HEAD
        <Route exact path="/userDashboard" component={userDashboard} />
=======
>>>>>>> 68a4504e63352868459e6f7b16a9607f5be09b46
      </Switch>
    </Router>
  );
}

export default App;
