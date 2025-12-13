import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Common/Header";
import Home from "./Pages/Home";
import RegistrationUsingHook from "./Pages/RegistrationUsingHook";
import RegistrationWithoutHook from "./Pages/RegistationWithoutHook";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register-hook" element={<RegistrationUsingHook />} />
        <Route path="/register-no-hook" element={<RegistrationWithoutHook />} />
      </Routes>
    </div>
  );
}

export default App;
