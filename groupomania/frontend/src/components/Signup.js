import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import { Link } from "react-router-dom";

const baseUrl = "http://localhost:3000/api/auth/signup";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    console.log(postData);
    console.log("email: " + email);
    console.log("password: " + password);
    axios
      .post(baseUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
      })
      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  };

  return (
    <div className="signup-container">
      <div className="login-container">
        <div className="main">
          <h1>Bienvenue sur la page d'inscription !</h1>          
        </div>
      </div>
      <Form className="create-form">
        <Form.Field>
          <label>Email :</label>
          <input
            placeholder="Entrez votre Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Mot de passe :</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={postData} type="submit">
          Valider
        </Button>
        </Form.Field>
        
      </Form>
      <div className="already-signup">
        <p>Déjà inscrit ?</p>
        <Link to="/login">              
                Connectez vous !
        </Link>
      </div>
    </div>
  );
}

export default Signup;
