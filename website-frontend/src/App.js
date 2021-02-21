/* jshint esversion: 6 */
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CheckID from "./components/CheckID";
import BasicRegister from "./components/BasicRegister";
import PasswordLogin from "./components/PasswordLogin";
import StudentRegister from "./components/StudentRegister";
import StudentDashboard from "./components/StudentDashboard";
import ProfessorDashboard from "./components/ProfessorDashboard";
import Options from "./components/Options";
import StudentCalendar from "./components/StudentCalendar";
import ProfessorCalendar from "./components/ProfessorCalendar";
import ProfessorRegister from "./components/ProfessorRegister";
import FaceRecognition from "./components/FaceRecognition";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import PageNotFound from "./components/PageNotFound";
import TwoFactor from "./components/TwoFactor";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={CheckID} />
        <Route exact path="/passwordlogin" component={PasswordLogin} />
        <Route exact path="/basicregister" component={BasicRegister} />
        <Route exact path="/studentregister" component={StudentRegister} />
        <Route exact path="/professorregister" component={ProfessorRegister} />
        <Route exact path="/2fa" component={TwoFactor} />
        <Route exact path="/options" component={Options} />
        <Route
          exact
          path="/faceLogin"
          render={(props) => <FaceRecognition login={true} {...props} />}
        />
        <Route
          exact
          path="/faceSignUp"
          render={(props) => <FaceRecognition login={false} {...props} />}
        />
        <ProtectedRoute
          exact
          path="/studentDashboard"
          component={StudentDashboard}
          role="Student"
        />
        <ProtectedRoute
          exact
          path="/professorDashboard"
          component={ProfessorDashboard}
          role="Professor"
        />
        <ProtectedRoute
          exact
          path="/scalendar"
          role="Student"
          component={StudentCalendar}
        />
        <ProtectedRoute
          exact
          path="/pcalendar"
          role="Professor"
          component={ProfessorCalendar}
        />
        <Route exact path="/unauthorized" component={Unauthorized} />
        <Route path="*" component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
