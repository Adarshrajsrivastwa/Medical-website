import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bed, FileText } from "lucide-react";

const BookBedModal = ({
    isOpen,
    onClose,
    hospitalName,
    pricePerNight
}) => {
    const [formData, setFormData] = useState({
        patientName: "",
        reason: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking details:", formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center text-[#563393]">
                        <Bed className="mr-2 text-[#7A51B3]" />
                        <span className="text-[#563393]">Book Hospital Bed</span>
                    </DialogTitle>
                    <DialogDescription className="text-[#7A51B3]">
                        Book a bed at {hospitalName} - ₹{pricePerNight}/night
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="patientName"
                            className="flex items-center mb-2 text-[#563393]"
                        >
                            <FileText size={16} className="mr-2 text-[#7A51B3]" />
                            <span>Patient Name</span>
                        </label>
                        <Input
                            id="patientName"
                            name="patientName"
                            value={formData.patientName}
                            onChange={handleInputChange}
                            placeholder="Enter patient's full name"
                            required
                            className="border-[#7A51B3] text-[#563393] focus:border-[#563393]"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="reason"
                            className="flex items-center mb-2 text-[#563393]"
                        >
                            <FileText size={16} className="mr-2 text-[#7A51B3]" />
                            <span>Reason for Admission</span>
                        </label>
                        <Input
                            id="reason"
                            name="reason"
                            value={formData.reason}
                            onChange={handleInputChange}
                            placeholder="Describe the reason for admission"
                            required
                            className="border-[#7A51B3] text-[#563393] focus:border-[#563393]"
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full mt-4 bg-[#563393] text-white hover:bg-[#7A51B3]"
                    >
                        Pay Now
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default BookBedModal;