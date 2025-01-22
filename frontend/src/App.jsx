import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/SignUp";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Authentication/Login";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
