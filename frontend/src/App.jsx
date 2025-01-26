import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/Authentication/SignUp";
import Login from "./Pages/Authentication/Login";
import DoctorDetails from "./Pages/DetailsForm/DoctorDetails";
import PatientDetails from "./Pages/DetailsForm/PatientDetails";
import HospitalDetails from "./Pages/DetailsForm/HospitalDetails";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Sidebar from "./Components/Sidebar";
import PatientProfile from "./Pages/PatientDashboard/Profile";
import DoctorAppointment from "./Pages/PatientDashboard/DoctorAppointment";
import BedBooking from "./Pages/PatientDashboard/BedBooking";
import OrderMedicine from "./Pages/PatientDashboard/OrderMedicine";
import History from "./Pages/PatientDashboard/History";
import DoctorProfile from "./Pages/DoctorDashboard/Profile";
import AppointmentManagement from "./Pages/DoctorDashboard/AppointmentManagement";

function App() {
  const [userRole, setUserRole] = useState("doctor");

  return (
    <Router>
      <div className="h-screen flex flex-col">
        <Header className="h-16 shrink-0" />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar
            userRole={userRole}
            className="w-64 overflow-y-auto border-r"
          />
          <main className="flex-1 overflow-y-auto relative">
            <div className="">
              <Routes>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                {/* Details Form */}
                <Route path="/doctor-detail-form" element={<DoctorDetails />} />
                <Route path="/patient-detail-form" element={<PatientDetails />} />
                <Route path="/hospital-detail-form" element={<HospitalDetails />} />
                {/* Patient Dashboard */}
                <Route path="/patient-profile" element={<PatientProfile />} />
                <Route path="/doctor-appointment" element={<DoctorAppointment />} />
                <Route path="/bed-booking" element={<BedBooking />} />
                <Route path="/order-medicine" element={<OrderMedicine />} />
                <Route path="/history" element={<History />} />
                {/* Doctor Dashboard */}
                <Route path="/doctor-profile" element={<DoctorProfile />} />
                <Route path="/appointment-management" element={<AppointmentManagement />} />
              </Routes>
            </div>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;