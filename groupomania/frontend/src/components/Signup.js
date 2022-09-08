import React from "react";
import FormMail from "./FormMail";
import FormPassword from "./FormPassword";
import Validate from "./Validate";

function Signup() {
  return (
    <div className="signup-container">
      <h1>Bienvenue sur la page d'inscription !</h1>;
      <FormMail />
      <FormPassword />
      <Validate />
    </div>
  );
}

export default Signup;
