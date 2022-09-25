import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import Home from "../pages/Home";
import Post from "../pages/Post";

function Navbar() {
  return (
    <BrowserRouter>
      <div className="main-navigator">
        <nav>
          <ul>
            <li>
              <Link to="/home">Accueil</Link>
            </li>
            <li>
              <Link to="/signup">Inscription</Link>
            </li>
            <li>
              <Link to="/login">Connexion</Link>
            </li>
          </ul>
        </nav>
      </div>

      <Routes>
        <Route exact path="/home" element=<Home /> />
        <Route exact path="/login" element=<Login /> />
        <Route exact path="/signup" element=<Signup /> />
        <Route exact path="/Post" element=<Post /> />
      </Routes>
    </BrowserRouter>
  );
}

export default Navbar;
