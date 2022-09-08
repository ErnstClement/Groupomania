import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import "../styles/App.css";
import "../styles/Auth.css";
import "../styles/Form.css";
import FormMail from "./FormMail";
import FormPassword from "./FormPassword";
import Loading from "./Loading";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Loading />
        <div className="form-data">
          <ul>
            <li>
              <Link to="/"> Accueil</Link>
            </li>
            <li>
              <Link to="/login"> Se connecter</Link>
            </li>
            <li>
              <Link to="/signup"> Inscription</Link>
            </li>
          </ul>
        </div>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
