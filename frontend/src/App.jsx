import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import DoctorDetails from "./Pages/DetailsForm/DoctorDetails";
import PatientDetails from "./Pages/DetailsForm/PatientDetails";
import HospitalDetails from "./Pages/DetailsForm/HospitalDetails";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Pages/Sidebar";
import Profile from "./Pages/PatientDashboard/Profile";
import DoctorAppointment from "./Pages/PatientDashboard/DoctorAppointment";
import BedBooking from "./Pages/PatientDashboard/BedBooking";
import OrderMedicine from "./Pages/PatientDashboard/OrderMedicine";
import History from "./Pages/PatientDashboard/History";

function App() {
  const [userRole, setUserRole] = useState("patient");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar userRole={userRole} />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
              <Route path="/doctor-detail-form" element={<DoctorDetails />} />
              <Route path="/patient-detail-form" element={<PatientDetails />} />
              <Route path="/hospital-detail-form" element={<HospitalDetails />} />
              <Route path="/patient-detail" element={<Profile />} />
              <Route path="/doctor-appointment" element={<DoctorAppointment />} />
              <Route path="/bed-booking" element={<BedBooking />} />
              <Route path="/order-medicine" element={<OrderMedicine />} />
              <Route path="/history" element={<History />} />

            </Routes>
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;