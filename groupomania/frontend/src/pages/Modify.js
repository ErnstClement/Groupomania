import React, { useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import axios from "axios";
import "../styles/Form.css";
import Loading from "../components/Loading";
import { useNavigate, useParams } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post/";

function Post() {
  /* Mise en place des useState */
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [imageView, setImageView] = useState("");
  /* Récupération de l'ID et du token bearer */
  const userId = localStorage.getItem("id");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  /* Récupération des données du message */

  useEffect(() => {
    axios.get(baseUrl + "/" + id).then((response) => {
      const data = response.data;
      console.log("data -------", data);
      setData(data);
      setText(data.text);
      setImageView(data.imageUrl);
    });
  }, []);

  console.log("text", text);
  console.log("image", image);

  const imageInputChangeHandler = (event) => {
    setImageView(URL.createObjectURL(event.target.files[0]));
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
          alert("Message modifié avec succès !");
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
      <Form className="create-form">
        <Form.Field>
          <label>Ecrivez votre message :</label>
          <textarea
            multiline
            rows="5"
            type="text"
            defaultValue={data.text}
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
