import React, { useState } from 'react';
import { Search, User, Calendar, Clock, Stethoscope, FileText, X } from 'lucide-react';

// Sample patient data with prescription details
const initialPatients = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    appointmentDate: "2024-03-15",
    appointmentTime: "10:30 AM",
    doctorName: "Dr. Emily Smith",
    issue: "Routine Check-up",
    prescription: {
      doctorNotes: "Patient shows signs of mild vitamin deficiency. Recommended dietary changes and supplements.",
      medications: [
        {
          name: "Multivitamin Supplement",
          dosage: "1 tablet daily",
          startDate: "2024-03-15",
          endDate: "2024-04-15"
        },
        {
          name: "Vitamin D3",
          dosage: "2000 IU once daily",
          startDate: "2024-03-15",
          endDate: "2024-04-15"
        }
      ]
    }
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    appointmentDate: "2024-03-10",
    appointmentTime: "02:45 PM",
    doctorName: "Dr. Michael Johnson",
    issue: "Respiratory Infection",
    prescription: {
      doctorNotes: "Acute bronchitis detected. Prescribed antibiotics and rest.",
      medications: [
        {
          name: "Azithromycin",
          dosage: "500mg once daily",
          startDate: "2024-03-10",
          endDate: "2024-03-15"
        },
        {
          name: "Cough Syrup",
          dosage: "10ml thrice daily",
          startDate: "2024-03-10",
          endDate: "2024-03-20"
        }
      ]
    }
  }
];

const PatientHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [patients, setPatients] = useState(initialPatients);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  // Filter patients based on email search
  const filteredPatients = patients.filter(patient =>
    patient.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle prescription modal
  const openPrescriptionModal = (prescription) => {
    setSelectedPrescription(prescription);
  };

  const closePrescriptionModal = () => {
    setSelectedPrescription(null);
  };

  // Prescription Modal Component
  const PrescriptionModal = ({ prescription, onClose }) => {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-purple-600 hover:text-purple-800"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-purple-800 mb-4">Prescription Details</h2>

          <div className="mb-4">
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Doctor's Notes</h3>
            <p className="text-purple-600">{prescription.doctorNotes}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">Medications</h3>
            <div className="space-y-3">
              {prescription.medications.map((med, index) => (
                <div
                  key={index}
                  className="bg-purple-50 p-3 rounded-md border border-purple-100"
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-purple-800">{med.name}</p>
                      <p className="text-purple-600 text-sm">Dosage: {med.dosage}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-purple-600">
                        {med.startDate} to {med.endDate}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="Search by patient email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 pl-10 border-2 border-purple-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <Search className="absolute left-3 top-3.5 text-purple-500" />
        </div>

        {/* Patient Cards - Only show when search term is not empty */}
        {searchTerm && (
          <div className="space-y-4">
            {filteredPatients.length > 0 ? (
              filteredPatients.map(patient => (
                <div
                  key={patient.id}
                  className="bg-white shadow-md rounded-lg p-5 border border-purple-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <User className="text-purple-600" />
                      <h2 className="text-xl font-semibold text-purple-800">{patient.name}</h2>
                    </div>
                    <button
                      onClick={() => openPrescriptionModal(patient.prescription)}
                      className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition-colors flex items-center space-x-2"
                    >
                      <FileText size={18} />
                      <span>Prescription</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-purple-700">
                    <div className="flex items-center space-x-2">
                      <Calendar size={18} className="text-purple-500" />
                      <span>{patient.appointmentDate}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock size={18} className="text-purple-500" />
                      <span>{patient.appointmentTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Stethoscope size={18} className="text-purple-500" />
                      <span>{patient.doctorName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <User size={18} className="text-purple-500" />
                      <span>{patient.email}</span>
                    </div>
                  </div>

                  <div className="mt-4 bg-purple-50 p-3 rounded-md">
                    <h3 className="text-purple-700 font-medium">Issue: {patient.issue}</h3>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-purple-600 py-10">
                No patients found matching your search.
              </div>
            )}
          </div>
        )}

        {/* Initial State - When no search has been performed */}
        {!searchTerm && (
          <div className="text-center text-purple-600 py-10">
            <p>Start typing an email to search for patient records</p>
          </div>
        )}

        {/* Prescription Modal */}
        {selectedPrescription && (
          <PrescriptionModal
            prescription={selectedPrescription}
            onClose={closePrescriptionModal}
          />
        )}
      </div>
    </div>
  );
};

export default PatientHistory;