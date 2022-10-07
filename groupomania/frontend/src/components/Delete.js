import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post";

function Delete(id) {
  axios.delete(baseUrl + "/" + id).then((response) => {
    alert("Post supprimé.");
    Navigate("/home");
  });
}

export default Delete;
