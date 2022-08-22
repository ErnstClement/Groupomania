import "../styles/Loading.css";
import logo from "../assets/logo-black.png";

function Loading() {
  return (
    <div className="Loading">
      <img src={logo} alt="Banniere Groupomania" className="g-logo" />
    </div>
  );
}

export default Loading;
