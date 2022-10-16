import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post/";

function Post() {
  let navigate = useNavigate();
  const [text, setText] = useState("null");
  const [image, setImage] = useState("");
  const id = localStorage.getItem("id");

  const imageInputChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const sendPost = () => {
    const token = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${token}`,
    };

    let formData = new FormData();
    formData.append("text", text);
    formData.append("image", image);
    formData.append("postedBy", id);
    console.log(formData);

    axios
      .post(baseUrl, formData, { headers: headers })
      .then((response) => {
        alert("Message créé avec succès !.");
        console.log(response);
        navigate("/home");
      })
      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  };

  return (
    <div className="login-container">
      <h1>Bienvenue sur la page de création de post !</h1>;
      <Form className="create-form">
        <Form.Field>
          <label>Texte :</label>
          <input
            placeholder="Entrez votre Texte"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>image :</label>
          <input
            type="file"
            accept="image/*"
            placeholder="ajouter une image"
            onChange={imageInputChangeHandler}
          />
          <img src={image}></img>
        </Form.Field>
        <Button onClick={sendPost} type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default Post;
