import React, { useState } from 'react';
import { Building2, Mail, Phone, MapPin, Stethoscope, Bed, LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Profile = () => {
  const [hospital, setHospital] = useState({
    name: "City Care Hospital",
    email: "contact@citycarehosp.com",
    phone: "+91 98765 43210",
    website: "www.citycarehosp.com",
    bedCharges: 2500,
    specializations: ["Cardiology", "Orthopedics", "Neurology", "Pediatrics", "General Surgery"],
    location: "123 Healthcare Avenue, Mumbai, Maharashtra - 400001"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    phone: hospital.phone,
    website: hospital.website,
    bedCharges: hospital.bedCharges,
    specializations: hospital.specializations.join(", "),
    location: hospital.location
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValues({
      phone: hospital.phone,
      website: hospital.website,
      bedCharges: hospital.bedCharges,
      specializations: hospital.specializations.join(", "),
      location: hospital.location
    });
  };

  const handleSave = () => {
    setHospital(prev => ({
      ...prev,
      ...editedValues,
      specializations: editedValues.specializations.split(",").map(spec => spec.trim()).filter(spec => spec !== "")
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues({
      phone: hospital.phone,
      website: hospital.website,
      bedCharges: hospital.bedCharges,
      specializations: hospital.specializations.join(", "),
      location: hospital.location
    });
  };

  return (
    <div className="h-fit p-3">
      <Card className="w-full border border-purple-100">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-3xl font-bold text-[#563393]">
            My Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 py-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {[
              { icon: Building2, label: 'Name', value: hospital.name },
              { icon: Mail, label: 'Email', value: hospital.email },
              { icon: Phone, label: 'Phone', value: hospital.phone, editable: true },
              { icon: LinkIcon, label: 'Website', value: hospital.website, editable: true },
              { icon: Bed, label: 'Bed Charges (₹/day)', value: `₹${hospital.bedCharges}`, editable: true, type: 'number', field: 'bedCharges' },
              { icon: Stethoscope, label: 'Specializations', value: hospital.specializations.join(", "), editable: true, placeholder: "Enter specializations separated by commas" },
              { icon: MapPin, label: 'Location', value: hospital.location, editable: true }
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
                      value={item.label === 'Specializations' ? editedValues.specializations :
                        (item.field ? editedValues[item.field] : editedValues[item.label.toLowerCase()])}
                      onChange={(e) => setEditedValues(prev => ({
                        ...prev,
                        [item.label === 'Specializations' ? 'specializations' : (item.field || item.label.toLowerCase())]:
                          item.type === 'number' ? parseFloat(e.target.value) : e.target.value
                      }))}
                      placeholder={item.placeholder}
                      className="text-base font-medium text-[#563393] border border-purple-200 rounded px-2 py-1 w-full focus:outline-none focus:border-[#563393]"
                    />
                  ) : (
                    <p className="text-base font-medium text-[#563393]">{item.value}</p>
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

export default Profile;