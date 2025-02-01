import React, { useState,useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X, FileText, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from 'axios';

function DoctorManagement() {
  const [isLoading, setIsLoading] = useState(false);
   const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
     const [doctors, setdoctors] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/admin/doctor",
          {},
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
        setdoctors(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching the appointments.");
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) return <div className="loading">Loading appointments...</div>;
  if (error) return <div className="error">{error}</div>;

  const handleDocumentLoad = () => {
    setIsLoading(false);
  };

  const handleDocumentError = () => {
    setIsLoading(false);
    // Handle error - you might want to show an error message
  };

  const handleApprove = async(doctorId) => {
    let approval='confirmed';
    let  unique=doctors[0]._id;

     const response = await axios.post(
      "http://localhost:3000/admin/update",
      { unique,approval },
      { headers: { "Content-Type": "application/json" } }
    );
    if(response.status==200)
      alert("Appointment status updated successfully");
    else
    alert("Failed to update appointment status");
  };

  const handleReject = (doctorId) => {
    console.log(`Rejected doctor with ID: ${doctorId}`);
  };

  return (
    <div className="p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6 text-[#563393]">Doctor Approval Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.map((doctor) => (
          <Card key={doctor.id} className="w-full border border-[#563393]/20 shadow-sm">
            <CardHeader className="border-b border-[#563393]/10">
              <CardTitle className="text-lg text-[#563393]">{doctor.name}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-[#563393]/70 mb-4">{doctor.specialization}</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full border-[#563393] text-[#563393] hover:bg-[#563393]/10"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    View Documents
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl h-[80vh]">
                  <DialogHeader>
                    <DialogTitle className="text-[#563393]">Medical Documents - {doctor.name}</DialogTitle>
                  </DialogHeader>
                  {/* <div className="mt-4 h-full">
                    {isLoading ? (
                      <div className="flex items-center justify-center h-full">
                        <Loader2 className="w-8 h-8 animate-spin text-[#563393]" />
                      </div>
                    ) : (
                      <iframe
                        src={doctor.documents.certificate}
                        className="w-full h-full rounded-lg"
                        onLoad={handleDocumentLoad}
                        onError={handleDocumentError}
                      />
                    )}
                  </div> */}
                </DialogContent>
              </Dialog>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button
                className="flex-1 bg-[#563393] hover:bg-[#563393]/90 text-white"
                onClick={() => handleApprove(doctor.id)}
              >
                <Check className="w-4 h-4 mr-2" />
                Approve
              </Button>
              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleReject(doctor.id)}
              >
                <X className="w-4 h-4 mr-2" />
                Reject
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default DoctorManagement;