import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import CheckID from './components/CheckID';
import BasicRegister from './components/BasicRegister';
import PasswordLogin from './components/PasswordLogin';
import StudentRegister from './components/StudentRegister';
import StudentDashboard from './components/StudentDashboard';
import ProfessorDashboard from './components/ProfessorDashboard';
import Options from './components/Options';
import StudentCalendar from './components/StudentCalendar';
import ProfessorCalendar from './components/ProfessorCalendar';
import ProfessorRegister from './components/ProfessorRegister';
import FaceRecognition from './components/FaceRecognition';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/studentregister" component={StudentRegister} />
        <Route exact path="/professorregister" component={ProfessorRegister} />
        <Route exact path="/studentDashboard" component={StudentDashboard} />
        <Route exact path="/professorDashboard" component={ProfessorDashboard} />    
        <Route exact path="/options" component={Options} />
        <Route exact path="/scalendar" component={StudentCalendar} />
        <Route exact path="/pcalendar" component={ProfessorCalendar} />
        <Route exact path="/faceLogin" render={(props) => <FaceRecognition login={true} {...props} />} />
        <Route exact path="/faceSignUp" render={(props) => <FaceRecognition login={false} {...props} />} />
      </Switch>
    </Router>
  );
}

export default App;
