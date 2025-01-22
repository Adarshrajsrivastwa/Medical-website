import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prevData) => ({
      ...prevData,
      role,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 shadow-md rounded-lg p-6 bg-white"
      >
        <h1 className="text-xl font-bold text-[#5f3f96]">Sign Up</h1>

        <div className="flex flex-col gap-1 w-80">
          <Label htmlFor="name" className="text-base font-normal">
            Full Name
          </Label>
          <Input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 w-80">
          <Label htmlFor="email" className="text-base font-normal">
            Email
          </Label>
          <Input
            type="text"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-1 w-80">
          <Label htmlFor="otp" className="text-base font-normal">
            Enter OTP
          </Label>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>

        <div className="flex flex-col gap-1 w-80">
          <Label htmlFor="role" className="text-base font-normal">
            Select Your Role
          </Label>
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select Your Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="doctor">Doctor</SelectItem>
              <SelectItem value="patient">Patient</SelectItem>
              <SelectItem value="hospital">Hospital</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button type="submit" variant="ours" className="w-40">
          Continue
        </Button>
      </form>
    </div>
  );
}

export default SignUp;