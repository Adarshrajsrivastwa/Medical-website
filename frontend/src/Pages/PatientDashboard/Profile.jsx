import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Weight, Ruler, Droplet, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    gender: "Male",
    dob: "1990-05-15",
    weight: 75,
    height: 175,
    bloodGroup: "O+",
    location: "New York, NY",
    photoUrl: "/api/placeholder/150/150"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedValues, setEditedValues] = useState({
    phone: user.phone,
    weight: user.weight,
    height: user.height
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditedValues({
      phone: user.phone,
      weight: user.weight,
      height: user.height
    });
  };

  const handleSave = () => {
    setUser(prev => ({
      ...prev,
      ...editedValues
    }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedValues({
      phone: user.phone,
      weight: user.weight,
      height: user.height
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
            {/* Info Cards */}
            {[
              { icon: Mail, label: 'Email', value: user.email },
              { icon: Phone, label: 'Phone', value: user.phone, editable: true },
              { icon: User, label: 'Gender', value: user.gender },
              { icon: Calendar, label: 'Date of Birth', value: user.dob },
              { icon: Weight, label: 'Weight(KG)', value: `${user.weight} kg`, editable: true, type: 'number', field: 'weight' },
              { icon: Ruler, label: 'Height(CM)', value: `${user.height} cm`, editable: true, type: 'number', field: 'height' },
              { icon: Droplet, label: 'Blood Group', value: user.bloodGroup },
              { icon: MapPin, label: 'Location', value: user.location }
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
                      value={item.field ? editedValues[item.field] : editedValues[item.label.toLowerCase()]}
                      onChange={(e) => setEditedValues(prev => ({
                        ...prev,
                        [item.field || item.label.toLowerCase()]: item.type === 'number' ? parseFloat(e.target.value) : e.target.value
                      }))}
                      className="text-base font-medium text-[#563393] border border-purple-200 rounded px-2 py-1 w-full focus:outline-none focus:border-[#563393]"
                    />
                  ) : (
                    <p className="text-base font-medium text-[#563393]">{(item.value == null) ? alert("Field can not be empty") : item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Edit Controls */}
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
                  <Check className="w-4 h-4" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-6 py-2 bg-white text-[#563393] border border-[#563393] rounded-lg hover:bg-purple-50 transition-colors"
                >
                  <X className="w-4 h-4" />
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

export default UserProfile;