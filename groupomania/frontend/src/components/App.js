//---Importation des differents éléments et fonctionalités---------
import "../styles/App.css";
import React from "react";
import Login from "./Login";
import Signup from "./Signup";
import Post from "../pages/Post";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Modify from "../pages/Modify";
import Loading from "../components/Loading";

//----------------------------------------------------------------

//---Création fonction App qui servira de base pour l'application--

function App() {
  return (
    <div className="app">
    <header> 
      <Loading />
    </header>

   

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
    </div>

  );
}
//----------------------------------------------------------------
export default App;
