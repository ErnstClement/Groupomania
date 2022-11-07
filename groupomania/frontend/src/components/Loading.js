import "../styles/Loading.css";
import logo from "../assets/icon-left-font-monochrome-white-mini.png";

function Loading() {
  return (
    <div className="Loading">
      <img src={logo} alt="Banniere Groupomania" className="g-logo" />
    </div>
  );
}

export default Loading;
