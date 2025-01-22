import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/SignUp";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Login from "./Pages/Authentication/Login";
import DoctorDetails from "./Pages/Details/DoctorDetails";
import PatientDetails from "./Pages/Details/PatientDetails";
import HospitalDetails from "./Pages/Details/HospitalDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor-detail" element={<DoctorDetails />} />
        <Route path="/patient-detail" element={<PatientDetails />} />
        <Route path="/hospital-detail" element={<HospitalDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
