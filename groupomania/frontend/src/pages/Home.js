import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Post from "./Post";
import axios from "axios";
import "../styles/Form.css";

const baseUrl = "http://localhost:3000/api/post";

function Home() {
  axios
    .get(baseUrl, { responseType: "json" })
    .then((response) => {
      console.log(response);
    })

    .catch(({ response }) => {
      console.log(response.data);
      console.log(response.status);
      console.log(response.headers);
    });

  return (
    <div className="Home-container">
      <h1>Bienvenue sur la page de Home !</h1>;
      <div className="main-navigator">
        <Link to="/Post">
          <Button className="createPost" type="submit">
            Creer un post
          </Button>
        </Link>
      </div>
      <div className="post-container">
        <p></p>
      </div>
    </div>
  );
}

export default Home;
