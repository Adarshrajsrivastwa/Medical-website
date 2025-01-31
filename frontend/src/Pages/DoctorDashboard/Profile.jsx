import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Languages, Stethoscope, Coins, Building2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@healthcare.com",
    phone: "+1 (555) 123-4567",
    gender: "Female",
    specialization: "Cardiologist",
    languages: ["English", "Spanish", "French"],
    consultationFee: 150,
    hospital: "City Medical Center",
    location: "123 Healthcare Ave, New York, NY 10001"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    phone: doctor.phone,
    consultationFee: doctor.consultationFee,
    hospital: doctor.hospital,
    location: doctor.location,
    languages: doctor.languages.join(", ")
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValues({
      phone: doctor.phone,
      consultationFee: doctor.consultationFee,
      hospital: doctor.hospital,
      location: doctor.location,
      languages: doctor.languages.join(", ")
    });
  };

  const handleSave = () => {
    setDoctor(prev => ({
      ...prev,
      ...editedValues,
      languages: editedValues.languages.split(",").map(lang => lang.trim()).filter(lang => lang !== "")
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues({
      phone: doctor.phone,
      consultationFee: doctor.consultationFee,
      hospital: doctor.hospital,
      location: doctor.location,
      languages: doctor.languages.join(", ")
    });
  };

  return (
    <div className="h-fit p-3">
      <Card className="w-full border border-purple-100">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold text-[#563393]">
            Doctor Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {[
              { icon: User, label: 'Name', value: doctor.name },
              { icon: Mail, label: 'Email', value: doctor.email },
              { icon: Phone, label: 'Phone', value: doctor.phone, editable: true },
              { icon: User, label: 'Gender', value: doctor.gender },
              { icon: Stethoscope, label: 'Specialization', value: doctor.specialization },
              { icon: Languages, label: 'Languages', value: doctor.languages.join(", "), editable: true, placeholder: "Enter languages separated by commas" },
              { icon: Coins, label: 'Consultation Fee (₹)', value: `₹${doctor.consultationFee}`, editable: true, type: 'number', field: 'consultationFee' },
              { icon: Building2, label: 'Hospital/Clinic', value: doctor.hospital, editable: true },
              { icon: MapPin, label: 'Location', value: doctor.location, editable: true }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border border-purple-100 shadow-sm hover:border-[#563393] transition-colors">
                <div className="bg-purple-50 p-3 rounded-lg">
                  <item.icon className="w-6 h-6 text-[#563393]" />
                </div>
                <div className="min-w-0 flex-grow">
                  <p className="text-sm font-medium text-purple-400">{item.label}</p>
                  {isEditing && item.editable ? (
                    <input
                      required
                      type={item.type || 'text'}
                      value={item.label === 'Languages' ? editedValues.languages : (item.field ? editedValues[item.field] : editedValues[item.label.toLowerCase()])}
                      onChange={(e) => setEditedValues(prev => ({
                        ...prev,
                        [item.label === 'Languages' ? 'languages' : (item.field || item.label.toLowerCase())]:
                          item.type === 'number' ? parseFloat(e.target.value) : e.target.value
                      }))}
                      placeholder={item.placeholder}
                      className="text-base font-medium text-[#563393] border border-purple-200 rounded px-2 py-1 w-full focus:outline-none focus:border-[#563393]"
                    />
                  ) : (
                    <p className="text-base font-medium text-[#563393]">{(item.value == null) ? alert("Field can not be empty") : item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6 gap-4">
            {!isEditing ? (
              <button
                onClick={handleEdit}
                className="px-6 py-2 bg-[#563393] text-white rounded-lg hover:bg-[#4a2c7d] transition-colors"
              >
                Edit Details
              </button>
            ) : (
              <>
                <button
                  onClick={handleSave}
                  className="flex items-center gap-2 px-6 py-2 bg-[#563393] text-white rounded-lg hover:bg-[#4a2c7d] transition-colors"
                >
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-[#563393] border border-[#563393] rounded-lg hover:bg-purple-50 transition-colors"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DoctorProfile;