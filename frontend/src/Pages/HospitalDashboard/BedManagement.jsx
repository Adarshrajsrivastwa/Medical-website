import React, { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const BedManagement = () => {
  const [beds, setBeds] = useState([
    {
      id: 1,
      patientName: 'Sarah Johnson',
      issue: 'Acute Appendicitis',
      status: 'Pending'
    },
    {
      id: 2,
      patientName: 'John Doe',
      issue: 'Fractured Leg',
      status: 'Pending'
    },
    {
      id: 3,
      patientName: 'Mary Smith',
      issue: 'Pneumonia',
      status: 'Pending'
    },
  ]);

  const handleAction = (id, action) => {
    setBeds(prevBeds =>
      prevBeds.map(bed => {
        if (bed.id === id) {
          return {
            ...bed,
            status: action === 'accept' ? 'Accepted' : 'Declined'
          };
        }
        return bed;
      })
    );
  };

  return (
    <Card className="w-full rounded-none shadow-none bg-white">
      <CardHeader className="bg-white">
        <CardTitle className="text-lg font-bold md:text-3xl text-[#563393]">Bed Management</CardTitle>
      </CardHeader>
      <CardContent className="p-1 bg-white">
        {beds.map((bed) => (
          <div
            key={bed.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b border-[#563393]/20 hover:bg-[#563393]/5 transition-colors bg-white"
          >
            <div className="flex-grow mb-2 sm:mb-0">
              <div className="text-sm font-medium text-[#563393]">
                Patient: {bed.patientName}
              </div>
              <div className="text-sm text-[#563393]/70">
                Issue: {bed.issue}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              {bed.status === 'Pending' && (
                <>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white text-[#563393] border-[#563393] hover:bg-[#563393]/10 hover:text-[#563393]"
                    onClick={() => handleAction(bed.id, 'accept')}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto bg-white text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={() => handleAction(bed.id, 'decline')}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default BedManagement;