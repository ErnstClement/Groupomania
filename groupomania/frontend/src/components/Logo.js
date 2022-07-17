import "../styles/header.css";
import "../styles/logo.css";
import logo from "../assets/icon-left-font-monochrome-black.png";

function Logo() {
  return (
    <div className="g-header">
      <img src={logo} alt="groupomania" className="g-logo" />
    </div>
  );
}

export default Logo;
