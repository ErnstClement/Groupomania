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

  const sendPost = () => {
    console.log(sendPost);
    console.log("text: " + text);
    console.log("image: " + image);
    axios
      .post(baseUrl, {
        text: text,
        /*imageUrl: image,*/
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
            onChange={(e) => setImage(e.target.value)}
          />
          <img
            src={image}
            style={{
              maxWidth: "100%",
              maxHeight: 150,
            }}
          />
        </Form.Field>
        <Button onClick={sendPost} type="submit">
          Valider
        </Button>
      </Form>
    </div>
  );
}

export default Post;
