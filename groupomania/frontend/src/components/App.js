import "../styles/App.css";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Loading from "./Loading";
import Post from "../pages/Post";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";

import Home from "../pages/Home";

function App() {
  return (
    <BrowserRouter>
      <div className="main">
        <Loading />
        <h1>Bienvenue sur le service de messagerie de Groupomania</h1>

        <div className="navbar">
          <Link to="/login">
            <Button className="btnLogin" type="submit">
              Se connecter
            </Button>
          </Link>
          <Link to="/signup">
            <Button className="btnSignup" type="submit">
              S'inscrire
            </Button>
          </Link>
        </div>
      </div>
      <Routes>
        <Route exact path="/login" element=<Login /> />
        <Route exact path="/signup" element=<Signup /> />
        <Route exact path="/home" element=<Home /> />
        <Route exact path="/post" element=<Post /> />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
