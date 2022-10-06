import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/auth/login";

function Login() {
  let navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    console.log(postData);

    axios
      .post(baseUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        var data = response.data;
        var token = data.token;
        console.log("token", token);
        navigate("/home");
        localStorage.setItem("token", JSON.stringify(token));
      })
      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  };

  return (
    <div className="login-container">
      <h1>Bienvenue sur la page de connexion !</h1>;
      <Form className="create-form">
        <Form.Field>
          <label>Email :</label>
          <input
            placeholder="Entrez votre Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>password :</label>
          <input
            type="password"
            placeholder="Entrez votre mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default Login;
