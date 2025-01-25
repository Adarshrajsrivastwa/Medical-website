import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MapPin,
  Stethoscope,
  DollarSign,
  Search,
  User,
  Calendar,
  ArrowRight
} from "lucide-react";
import BookAppointmentModal from "./BookAppointment";

const doctors = [
  {
    id: 1,
    name: "Dr. John Doe",
    charges: "₹500",
    specialization: "Cardiologist",
    location: "Bhopal",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    charges: "₹300",
    specialization: "Dermatologist",
    location: "Indore",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    charges: "₹700",
    specialization: "Orthopedic",
    location: "Mumbai",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    charges: "₹700",
    specialization: "Orthopedic",
    location: "Mumbai",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    charges: "₹700",
    specialization: "Orthopedic",
    location: "Mumbai",
  },
  {
    id: 3,
    name: "Dr. Rajesh Kumar",
    charges: "₹700",
    specialization: "Orthopedic",
    location: "Mumbai",
  },
  {
    id: 4,
    name: "Dr. Priya Patel",
    charges: "₹450",
    specialization: "Pediatrician",
    location: "Delhi",
  },
  {
    id: 5,
    name: "Dr. Amit Sharma",
    charges: "₹600",
    specialization: "Neurologist",
    location: "Pune",
  }
];

const DoctorAppointment = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredDoctors = doctors.filter((doctor) =>
    `${doctor.name} ${doctor.specialization} ${doctor.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleBookNow = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  return (
    <div
      className="p-2"
      style={{
        backgroundColor: 'white',
        color: '#563393'
      }}
    >
      <div className="flex items-center mb-6">
        <User size={32} color="#563393" className="mr-3" />
        <h1
          className="text-3xl font-bold"
          style={{ color: '#563393' }}
        >
          Book a Doctor Appointment
        </h1>
      </div>

      <div className="relative mb-6">
        <Search
          size={20}
          color="#563393"
          className="absolute left-3 top-1/2 transform -translate-y-1/2"
        />
        <Input
          placeholder="Search by name, specialization, or location..."
          className="pl-10 border-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderColor: '#563393',
            color: '#563393',
          }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{
              backgroundColor: 'white',
              border: '2px solid #563393'
            }}
          >
            <CardHeader className="flex flex-row items-center space-x-3">
              <Stethoscope size={24} color="#563393" />
              <CardTitle
                className="text-xl"
                style={{ color: '#563393' }}
              >
                {doctor.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p
                  className="text-sm flex items-center"
                  style={{ color: '#563393' }}
                >
                  <Stethoscope size={16} className="mr-2" />
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p
                  className="text-sm flex items-center"
                  style={{ color: '#563393' }}
                >
                  <DollarSign size={16} className="mr-2" />
                  <strong>Charges:</strong> {doctor.charges}
                </p>
                <p
                  className="text-sm flex items-center"
                  style={{ color: '#563393' }}
                >
                  <MapPin size={16} className="mr-2" />
                  <strong>Location:</strong> {doctor.location}
                </p>
              </div>
              <Button
                onClick={() => handleBookNow(doctor)}
                className="w-full flex items-center justify-center"
                style={{
                  backgroundColor: '#563393',
                  color: 'white',
                  hover: { backgroundColor: '#6F4BA3' }
                }}
              >
                <Calendar size={16} className="mr-2" />
                Book Now
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div
          className="text-center mt-4 flex flex-col items-center justify-center"
          style={{ color: '#563393' }}
        >
          <Search size={48} color="#563393" className="mb-4" />
          <p className="text-lg">No doctors found matching your search.</p>
        </div>
      )}

      {/* Render the Booking Modal */}
      {selectedDoctor && (
        <BookAppointmentModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          doctorName={selectedDoctor.name}
          specialization={selectedDoctor.specialization}
        />
      )}
    </div>
  );
};

export default DoctorAppointment;