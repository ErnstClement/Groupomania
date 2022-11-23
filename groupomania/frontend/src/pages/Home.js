import React, { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/Form.css";
import "../styles/Responsive.css";
import "../styles/Post.css";
import { useNavigate } from "react-router-dom";
const baseUrl = "http://localhost:3000/api/post";

function Home() {
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState("");
  const [like, setLike] = useState("");

  const [checkLike, setCheckLike] = useState(false);
  const [dislikeActive, setDislikeActive] = useState("");

  const logOut = () => {
    localStorage.setItem("token", "");
    navigate("/login");
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
  };

  const likeOne = (id) => {
    var postData = posts;
    console.log(postData);
    const currentPost = postData.find((post) => post._id === id);
    console.log(currentPost);

    if (currentPost.usersLiked.includes(userId)) {
      axios
        .post(baseUrl + "/" + id + "/like", {
          like: -1,
          userId: userId,
          postId: id,
        })
        .then((response) => {
          setLike(-1);
          setCheckLike(false);
          localStorage.setItem(currentPost._id, 0);
        });
    } else {
      axios
        .post(baseUrl + "/" + id + "/like", {
          like: 1,
          userId: userId,
          postId: id,
        })
        .then((response) => {
          setLike(1);
          setCheckLike(true);
          localStorage.setItem(currentPost._id, 1);
        });
    }
  };

  useEffect(() => {
    const currentUserId = localStorage.getItem("id");
    setUserId(JSON.parse(currentUserId));
    axios
      .get(baseUrl)
      .then((response) => {
        var data = response.data;
        console.log(data);
        setPosts(data);
      })

      .catch(({ response }) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.headers);
      });
  }, [like]);

  return (
    <div className="Home-container">
      <h1>Bienvenue sur la page des posts !</h1>
      <div className="main-navigator">
        <div className="main-createPost">
          <Link to="/Post">
            <Button className="createPost" type="submit">
              Creer un message
            </Button>
          </Link>
          <Link to="/login">
            <Button
              className="createPost"
              type="submit"
              onClick={() => logOut()}
            >
              Deconnection
            </Button>
          </Link>
        </div>
      </div>

      <div className="post-container">
        {posts.reverse().map((post, i) => (
          <div key={i} className="post-block">
            <div className="post-user">
              <p className="postedBy" id="id">
                Message envoyé par : {post.userId}
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

                <Button
                  className="post-button"
                  onClick={() => likeOne(post._id, post.userId, post.likes)}
                >
                  Like
                </Button>
              </div>
            </div>
            <div className="post-content">
              <div className="post-header">
                <h4>Message :</h4>
                <h4 id="like">Like : {post.likes}</h4>
              </div>
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
