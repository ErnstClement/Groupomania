import "../styles/App.css";
import "../styles/Auth.css";
import "../styles/Form.css";
import Login from "./Login";
import Signup from "./Signup";
import Loading from "./Loading";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="main">
      <Loading />

      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element=<Login /> />
          <Route exact path="/signup" element=<Signup /> />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
