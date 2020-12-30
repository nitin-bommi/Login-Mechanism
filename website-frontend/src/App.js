import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './CheckID';
import BasicRegister from './BasicRegister';
import PasswordLogin from './PasswordLogin';
import NextRegister from './NextRegister';
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/nextregister" component={NextRegister} />
      </Switch>
    </Router>
  );
}

export default App;
