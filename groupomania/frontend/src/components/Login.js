import React from "react";
import Validate from "./Validate";
import FormMail from "./FormMail";
import FormPassword from "./FormPassword";

function Login() {
  return (
    <div className="login-container">
      <h1>Bienvenue sur la page de connexion !</h1>;
      <FormMail />
      <FormPassword />
      <Validate />
    </div>
  );
}

export default Login;
