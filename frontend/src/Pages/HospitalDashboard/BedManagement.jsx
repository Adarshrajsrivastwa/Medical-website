import React, { useState } from 'react';
import { Check, X, Clock, Bed, ExpandIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

const BedManagement = () => {
  const [beds, setBeds] = useState([
    { id: 1, bedNumber: '101', details: 'A comfortable bed in Room 1', status: 'Available', assignedPatient: null },
    { id: 2, bedNumber: '102', details: 'A comfortable bed in Room 2', status: 'Occupied', assignedPatient: 'John Doe' },
    { id: 3, bedNumber: '103', details: 'A comfortable bed in Room 3', status: 'Available', assignedPatient: null },
  ]);
  const [selectedBedDetails, setSelectedBedDetails] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleBedAction = (id, action) => {
    const status = action === 'occupy' ? 'Occupied' : 'Available';
    setBeds(prevBeds =>
      prevBeds.map(bed =>
        bed.id === id
          ? { ...bed, status, assignedPatient: action === 'occupy' ? 'New Patient' : null }
          : bed
      )
    );
    alert(`Bed status updated to ${status}`);
  };

  const truncateText = (text, maxLength = 100) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };

  // Open dialog with full bed details
  const openBedDetailsDialog = (bed) => {
    setSelectedBedDetails(bed.details);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="w-full rounded-none shadow-none">
        <CardHeader>
          <CardTitle className="text-lg font-bold md:text-3xl text-[#563393]">Bed Management</CardTitle>
        </CardHeader>
        <CardContent className="p-2 sm:p-4">
          {beds.map((bed) => (
            <div
              key={bed.id}
              className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border-b hover:bg-[#f4f4f4] transition-colors"
            >
              <div className="flex-grow mb-2 sm:mb-0 w-full sm:w-auto">
                <div className="flex items-center">
                  <Bed className="mr-2 h-5 w-5 text-[#563393]" />
                  <div className="font-bold text-sm sm:text-base">{bed.bedNumber}</div>
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-600 mt-1 relative">
                  {truncateText(bed.details)}
                  {bed.details.length > 100 && (
                    <button
                      onClick={() => openBedDetailsDialog(bed)}
                      className="ml-2 text-[#563393] hover:underline"
                      aria-label="View full bed details"
                    >
                      <ExpandIcon className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
                  <Clock className="mr-2 h-4 w-4" />
                  {bed.assignedPatient ? `Assigned to: ${bed.assignedPatient}` : 'No patient assigned'}
                </div>
                <div
                  className={`text-xs sm:text-sm font-medium mt-1 ${bed.status === 'Available'
                      ? 'text-green-600'
                      : 'text-red-600'
                    }`}
                >
                  {bed.status}
                </div>
              </div>
              {bed.status === 'Available' && (
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-[#563393] border-[#563393] hover:bg-[#cab2f479] hover:text-[#563393]"
                    onClick={() => handleBedAction(bed.id, 'occupy')}
                    aria-label="Occupy bed"
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Occupy
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full sm:w-auto text-red-600 border-red-600 hover:bg-red-50 hover:text-red-500"
                    onClick={() => handleBedAction(bed.id, 'vacate')}
                    aria-label="Vacate bed"
                  >
                    <X className="mr-2 h-4 w-4" />
                    Vacate
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
            <DialogTitle className="text-[#563393]">Full Bed Details</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-gray-700">
            {selectedBedDetails}
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BedManagement;
