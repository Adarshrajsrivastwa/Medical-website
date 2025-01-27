import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Building2,
  Bed,
  DollarSign,
  MapPin,
  Search,
  ArrowRight,
  Stethoscope
} from "lucide-react";
import BookBed from './BookBed';

const BedBooking = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHospital, setSelectedHospital] = useState(null);

  // Sample data with INR prices
  const hospitals = [
    {
      id: 1,
      name: "City General Hospital",
      specializations: ["General Medicine", "Emergency Care"],
      pricePerNight: 2000,
      location: "123 Healthcare Ave, City",
      availableBeds: 5
    },
    {
      id: 2,
      name: "Central Medical Center",
      specializations: ["Surgery", "Pediatrics"],
      pricePerNight: 2500,
      location: "456 Medical Parkway, City",
      availableBeds: 3
    },
  ];

  const filteredHospitals = hospitals.filter((hospital) =>
    `${hospital.name} ${hospital.specializations.join(' ')} ${hospital.location}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleBookBed = (hospital) => {
    setSelectedHospital(hospital);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHospital(null);
  };

  return (
    <div className="p-5" style={{ color: "#563393" }}>
      {/* Rest of the header and search remains the same */}
      <div className="flex items-center mb-6">
        <Bed size={32} color="#563393" className="mr-3" />
        <h1 className="text-3xl font-bold" style={{ color: "#563393" }}>
          Book a Hospital Bed
        </h1>
      </div>

      <div className="relative mb-6">
        <Search size={20} color="#563393" className="absolute left-3 top-1/2 transform -translate-y-1/2" />
        <Input
          placeholder="Search by hospital name, specialization, or location..."
          className="pl-10 border-2"
          value={searchTerm}
          onChange={handleSearchChange}
          style={{ borderColor: "#563393", color: "#563393" }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHospitals.map((hospital) => (
          <Card
            key={hospital.id}
            className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
            style={{ backgroundColor: "white", border: "2px solid #563393" }}
          >
            <CardHeader className="flex flex-row items-center space-x-3">
              <Building2 size={24} color="#563393" />
              <CardTitle className="text-xl" style={{ color: "#563393" }}>
                {hospital.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <p className="text-sm flex items-center" style={{ color: "#563393" }}>
                  <Stethoscope size={16} className="mr-2" />
                  <strong>Specializations:</strong>
                  <span className="ml-1">{hospital.specializations.join(', ')}</span>
                </p>
                <p className="text-sm flex items-center" style={{ color: "#563393" }}>
                  <DollarSign size={16} className="mr-2" />
                  <strong>Price per night:</strong>
                  <span className="ml-1">₹{hospital.pricePerNight}</span>
                </p>
                <p className="text-sm flex items-center" style={{ color: "#563393" }}>
                  <MapPin size={16} className="mr-2" />
                  <strong>Location:</strong>
                  <span className="ml-1">{hospital.location}</span>
                </p>
                <p className="text-sm flex items-center" style={{ color: "#563393" }}>
                  <Bed size={16} className="mr-2" />
                  <strong>Available Beds:</strong>
                  <span className="ml-1">{hospital.availableBeds}</span>
                </p>
              </div>
              <Button
                onClick={() => handleBookBed(hospital)}
                className="w-full flex items-center justify-center hover:bg-[#6F4BA3]"
                style={{ backgroundColor: "#563393", color: "white" }}
              >
                <Bed size={16} className="mr-2" />
                Book Bed
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHospitals.length === 0 && (
        <div className="text-center mt-4 flex flex-col items-center justify-center" style={{ color: "#563393" }}>
          <Search size={48} color="#563393" className="mb-4" />
          <p className="text-lg">No hospitals found matching your search.</p>
        </div>
      )}

      {selectedHospital && (
        <BookBed
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          hospitalName={selectedHospital.name}
          pricePerNight={selectedHospital.pricePerNight}
        />
      )}
    </div>
  );
};

export default BedBooking;