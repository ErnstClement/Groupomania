import axios from "axios";
const baseUrl = "http://localhost:3000/api/post";

function Delete(id) {
  /*let navigate = useNavigate();*/
  axios.delete(baseUrl + "/" + id).then((response) => {
    alert("Post supprimé.");
  });
}

export default Delete;
