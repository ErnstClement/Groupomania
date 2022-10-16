import axios from "axios";
const baseUrl = "http://localhost:3000/api/post";

function Delete(id) {
  console.log(id);
  /*let navigate = useNavigate();*/
  axios.delete(baseUrl + "/" + id).then((response) => {
    console.log(response);
    alert("Post supprimé.");
    /*navigate("/home");*/
  });
}

export default Delete;
