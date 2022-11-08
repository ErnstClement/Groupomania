import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import Loading from "../components/Loading";

import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post/";

function Post() {
  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageView, setImageView] = useState("");

  const id = localStorage.getItem("id");

  const imageInputChangeHandler = (event) => {
    setImage(event.target.files[0]);
    setImageView(URL.createObjectURL(event.target.files[0]));
  };
  console.log(image, "image");

  const imagePreview = (event) => {
    setImage(URL.createObjectURL(event.target.files[0]));
  };

  const back = () => {
    navigate("/home");
  };

  const sendPost = () => {
    if (text === "") {
      alert("Impossible d'envoyer un message vide !");
    } else {
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
          alert("Message créé avec succès !");
          console.log(response);
          navigate("/home");
        })
        .catch(({ response }) => {
          console.log(response.data);
          console.log(response.status);
          console.log(response.headers);
        });
    }
  };

  return (
    <div className="login-container">
      <Loading />
      <h1>Bienvenue sur la page de création de post !</h1>;
      <Form className="create-form">
        <Form.Field>
          <label>Ecrivez votre message :</label>
          <textarea
            multiline
            rows="5"
            placeholder="Entrez votre message"
            onChange={(e) => setText(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Ajouter une image :</label>
          <input
            type="file"
            id="file"
            className="inputFile"
            accept="image/*"
            placeholder="ajouter une image"
            onChange={imageInputChangeHandler}
          />
          <label id="addFile" for="file">
            +
          </label>
          <img src={imageView} alt={imageView}></img>

          <Button onClick={sendPost} type="submit">
            Valider
          </Button>
          <Button onClick={back} type="submit">
            Retour
          </Button>
        </Form.Field>
      </Form>
    </div>
  );
}

export default Post;
