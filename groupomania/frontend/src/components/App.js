import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "../styles/App.css";
import "../styles/Auth.css";
import "../styles/Form.css";
import Loading from "./Loading";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <div className="main">
        <Loading />
        <div className="form-data">
          <ul>
            <li>
              <Link to="/login">Se connecter</Link>
            </li>
            <li>
              <Link to="/inscription">Inscription</Link>
            </li>
          </ul>
        </div>
      </div>
    </Router>
  );
}

export default App;
