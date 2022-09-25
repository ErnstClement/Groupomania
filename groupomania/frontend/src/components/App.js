import "../styles/App.css";
import "../styles/Navigator.css";
import Login from "./Login";
import Signup from "./Signup";
import Loading from "./Loading";
import Navbar from "./Navbar";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "../pages/Home";

function App() {
  return (
    <div className="main">
      <Loading />
      <Navbar />
    </div>
  );
}

export default App;
