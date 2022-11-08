import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";
import axios from "axios";
import "../styles/Form.css";
import "../styles/Responsive.css";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaCommentAlt } from "react-icons/fa";
const baseUrl = "http://localhost:3000/api/post";

function Home() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const back = () => {
    navigate("/home");
  };

  const deleteOnePost = (id) => {
    axios.delete(baseUrl + "/" + id).then((response) => {
      alert("Message supprimé.");
      navigate(0);
    });
  };

  const modifyOne = (id) => {
    axios.get(baseUrl + "/" + id).then((response) => {
      navigate("/postModify/" + id);
    });

    /*alert("Message modifié !")*/
  };
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        var data = response.data;
        setPosts(data);
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
      <Loading />
      <h1>Bienvenue sur la page des posts !</h1>;
      <div className="main-navigator">
        <Link to="/Post">
          <Button className="createPost" type="submit">
            <div className="icon">
              <FaCommentAlt />
            </div>
          </Button>
        </Link>
      </div>
      
      <div className="post-container">
        {posts.reverse().map((post, i) => (
          <div key={i} className="post-block">
            <div className="post-user">
              <p className="postedBy" id="id">
                Message envoyé par : {post.postedBy}
              </p>
              <div className="post-button-main">
                <Button
                  className="post-button"
                  onClick={() => modifyOne(post._id)}
                >
                  Modifier
                </Button>

                <Button
                  className="post-button"
                  onClick={() => deleteOnePost(post._id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
            <div className="post-content">
              <h4>Message :</h4>
              <div className="post-text">
                <p>{post.text}</p>
              </div>
              <div className="post-img">
                <img src={post.imageUrl} alt={post.imageUrl}></img>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
