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
import { Link } from "react-router-dom"; // Add the Link import for routing

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false); // Tracks whether modal is visible

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }
    console.log("OTP sent to:", formData.email);
    setShowModal(true); // Show modal
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setShowModal(false); // Close modal on submit
  };

  return (
    <div className="flex items-center justify-center h-[85vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 shadow-md rounded-lg p-6 bg-white"
      >
        <h1 className="text-xl font-bold text-[#563393]">Sign Up</h1>

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

        <Button
          type="button"
          onClick={handleSendOtp}
          className="w-40"
          variant="ours"
        >
          Send OTP
        </Button>

        {/* Already have an account link */}
        <div className="mt-4 text-sm">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-[#7f53cb] hover:underline">
              Login here
            </Link>
          </p>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-lg font-bold mb-4 text-[#563393]">Verify OTP</h2>

              <div className="flex flex-col gap-3">
                <div>
                  <Label htmlFor="name" className="text-base font-normal">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Enter your Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
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

                <div className="flex flex-col gap-1">
                  <Label htmlFor="role" className="text-base font-normal">
                    Select Your Role
                  </Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prevData) => ({ ...prevData, role: value }))
                    }
                  >
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
              </div>

              <div className="flex items-center justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="ours">
                  Continue
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default SignUp;
