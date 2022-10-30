import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import Loading from "./Loading";
import { useNavigate, Link } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/auth/login";

function Login() {
  let navigate = useNavigate();
  /* Création des variables vides pour remplissage via les useState */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const postData = () => {
    /* Envoi Requete Post via Axios*/
    axios
      /* Envoi des variables email et password */
      .post(baseUrl, {
        email: email,
        password: password,
      })
      .then((response) => {
        var data = response.data;
        var id = response.data.userId;
        var token = data.token;
        console.log("token", token);
        navigate("/home");
        /* Stockage du token et du userId pour démonstration */
        localStorage.setItem("token", JSON.stringify(token));
        localStorage.setItem("id", JSON.stringify(id));
      })
      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  };

  return (
    <div className="login-container">
      <div className="main">
        <Loading />
        <h1>Bienvenue sur le service de messagerie de Groupomania</h1>

        <div className="navbar">
          <Link to="/signup">
            <Button className="btnSignup" type="submit">
              S'inscrire
            </Button>
          </Link>
        </div>
      </div>
      <Form className="create-form">
        <Form.Field>
          <label>Email :</label>
          <input
            placeholder="Entrez votre Email"
            onChange={(e) =>
              setEmail(e.target.value)
            } /* On récupère les données de l'email au changement, la même chose sera effectué pour le MDP */
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
        {/* execution de la fonction "postData" au click du bouton */}
        <Button onClick={postData} type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default Login;
