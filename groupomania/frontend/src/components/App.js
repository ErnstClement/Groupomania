//---Importation des differents éléments et fonctionalités---------
import "../styles/App.css";
import React, { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import Post from "../pages/Post";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Button, Checkbox, Form } from "semantic-ui-react";
import Home from "../pages/Home";
import Modify from "../pages/Modify";
//----------------------------------------------------------------

//---Création fonction App qui servira de base pour l'application--

function App() {
  return (
    <BrowserRouter>
      
       {/* Paramétrages des routes des liens vers les différentes pages*/}
      <Routes>
        <Route exact path="/login" element=<Login /> />
        <Route exact path="/signup" element=<Signup /> />
        <Route exact path="/home" element=<Home /> />
        <Route exact path="/post" element=<Post /> />
        <Route exact path="/postModify/:id" element=<Modify /> />

      </Routes>
    </BrowserRouter>
  );
}
//----------------------------------------------------------------
export default App;
