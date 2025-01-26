import React, { useState } from 'react';
import { Check, X, Clock, UserPlus, ExpandIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: 'John Doe',
      issue: 'Comprehensive periodic health check-up including full body screening, detailed blood work analysis, cardiovascular risk assessment, and holistic wellness consultation. Patient requires thorough examination of recent symptoms and comprehensive preventive health strategy.',
      date: '2024-02-15',
      timeSlot: 'Morning',
      status: 'Pending'
    },
    {
      id: 2,
      patientName: 'Jane Smith',
      issue: 'Dental Consultation',
      date: '2024-02-16',
      timeSlot: 'Evening',
      status: 'Pending'
    }
  ]);

  const [selectedIssue, setSelectedIssue] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAppointmentAction = (id, action) => {
    setAppointments(appointments.map(appointment =>
      appointment.id === id
        ? { ...appointment, status: action === 'accept' ? 'Confirmed' : 'Declined' }
        : appointment
    ));
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  const openIssueDialog = (issue) => {
    setSelectedIssue(issue);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold md:text-3xl text-[#563393]">Appointment Management</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {appointments.map((appointment) => (
            <div
              key={appointment.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b hover:bg-[#f4f4f4] transition-colors"
            >
              <div className="flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
                <div className="flex items-center">
                  <UserPlus className="mr-2 h-5 w-5 text-[#563393]" />
                  <div className="font-bold text-sm sm:text-base">{appointment.patientName}</div>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-1 relative">
                  {truncateText(appointment.issue)}
                  {appointment.issue.length > 100 && (
                    <button
                      onClick={() => openIssueDialog(appointment.issue)}
                      className="ml-2 text-[#563393] hover:underline"
                    >
                      <ExpandIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
                  <Clock className="mr-2 h-4 w-4" />
                  {appointment.date} | {appointment.timeSlot} Slot
                </div>
                <div className={`text-xs sm:text-sm font-medium mt-1
                  ${appointment.status === 'Pending' ? 'text-yellow-600' :
                    appointment.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}
                `}>
                  {appointment.status}
                </div>
              </div>
              {appointment.status === 'Pending' && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-[#563393] border-[#563393] hover:bg-[#cab2f479] hover:text-[#563393]"
                    onClick={() => handleAppointmentAction(appointment.id, 'accept')}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Accept
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50 hover:text-red-500"
                    onClick={() => handleAppointmentAction(appointment.id, 'decline')}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Decline
                  </Button>
                </div>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="w-[80vw] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[#563393]">Full Issue Description</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700">
            {selectedIssue}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppointmentManagement;