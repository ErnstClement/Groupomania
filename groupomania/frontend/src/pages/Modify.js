import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post/";

function Post() {
  const userId = localStorage.getItem("id");
  const { id } = useParams();
  const token = localStorage.getItem("token");
  console.log(token);

  axios.get(baseUrl + "/" + id).then((response) => {
    var data = response.data;
    console.log(data);
  });

  let navigate = useNavigate();
  const [text, setText] = useState("");
  const [image, setImage] = useState("");

  const imageInputChangeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const back = () => {
    navigate("/home");
  };

  const sendPost = () => {
    if (text === "") {
      alert("Impossible d'envoyer un message vide !");
    } else {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      let formData = new FormData();
      formData.append("text", text);
      formData.append("image", image);
      formData.append("postedBy", userId);

      axios
        .put(baseUrl + "/" + id, formData, { headers: headers })
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
      <h1>Bienvenue sur la page de création de post !</h1>;
      <Form className="create-form">
        <Form.Field>
          <label>Veuillez entrer votre message :</label>
          <input placeholder="ici" onChange={(e) => setText(e.target.value)} />
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
        <Button onClick={back} type="submit">
          Retour
        </Button>
      </Form>
    </div>
  );
}

export default Post;
