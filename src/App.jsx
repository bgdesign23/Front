import { Route, Routes } from "react-router-dom";
// import Nav from "./components/nav_component/Nav";
import "./App.css";
import Home from "./views/home/Home";
import Details from "./views/details/Details";
import axios from "axios";
import Landing from "./views/landingPage/LandingPage";
import Create from "./views/create/Create";

// import { useState } from "react";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  return (
    <div className="App">
      {/* <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
      </Routes> */}
    </div>
  );
}

export default App;
