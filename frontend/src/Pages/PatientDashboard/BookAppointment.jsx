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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Calendar, Clock, FileText } from "lucide-react";

const BookAppointment = ({
    isOpen,
    onClose,
    doctorName,
    specialization
}) => {
    const [formData, setFormData] = useState({
        issue: "",
        date: "",
        timeSlot: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleTimeSlotChange = (value) => {
        setFormData(prev => ({
            ...prev,
            timeSlot: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Booking submitted:", formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle className="text-2xl flex items-center text-[#563393]">
                        <Calendar className="mr-2 text-[#7A51B3]" />
                        <span className="text-[#563393]">Book Appointment</span>
                    </DialogTitle>
                    <DialogDescription className="text-[#7A51B3]">
                        Schedule with {doctorName} - {specialization}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="issue"
                            className="flex items-center mb-2 text-[#563393]"
                        >
                            <FileText size={16} className="mr-2 text-[#7A51B3]" />
                            <span>Issue</span>
                        </label>
                        <Input
                            id="issue"
                            name="issue"
                            value={formData.issue}
                            onChange={handleInputChange}
                            placeholder="Describe your health concern"
                            required
                            className="border-[#7A51B3] text-[#563393] focus:border-[#563393]"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label
                                htmlFor="date"
                                className="flex items-center mb-2 text-[#563393]"
                            >
                                <Calendar size={16} className="mr-2 text-[#7A51B3]" />
                                <span>Date</span>
                            </label>
                            <Input
                                id="date"
                                name="date"
                                type="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                required
                                className="border-[#7A51B3] text-[#563393] focus:border-[#563393]"
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="timeSlot"
                                className="flex items-center mb-2 text-[#563393]"
                            >
                                <Clock size={16} className="mr-2 text-[#7A51B3]" />
                                <span>Time Slot</span>
                            </label>
                            <Select
                                onValueChange={handleTimeSlotChange}
                                value={formData.timeSlot}
                            >
                                <SelectTrigger className="w-full border-[#7A51B3] text-[#563393] focus:border-[#563393]">
                                    <SelectValue placeholder="Select Time Slot" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="morning" className="focus:bg-[#E6D6F7]">Morning (8 AM - 12 PM)</SelectItem>
                                    <SelectItem value="evening" className="focus:bg-[#E6D6F7]">Evening (4 PM - 8 PM)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
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

export default BookAppointment;