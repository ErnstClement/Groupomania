import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Delete from "../components/Delete";
import Post from "./Post";
import axios from "axios";
import "../styles/Form.css";
import "../styles/Post.css";

const baseUrl = "http://localhost:3000/api/post";

function Home() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        console.log(response);
        var data = response.data;
        setPosts(data);
        console.log("posts", posts);
        console.log("data", data);
      })

      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  }, []);

  return (
    <div className="Home-container">
      <h1>Bienvenue sur la page de Home !</h1>;
      <div className="main-navigator">
        <Link to="/Post">
          <Button className="createPost" type="submit">
            Creer un post
          </Button>
        </Link>
      </div>
      <div className="post-container">
        {posts.reverse().map((post, i) => (
          <div key={i} className="post-block">
            <div className="post-user">
              <p id="id">{post._id}</p>
              <div className="post-button">
                <Button type="submit">Edit</Button>
                <Button onClick={() => Delete(post._id)}>Suppression</Button>
              </div>
            </div>
            <div className="post-content">
              <h4>Message :</h4>
              <div className="post-text">
                <p>{post.text}</p>
              </div>
              <div className="post-img">
                <img src={post.imageUrl}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
