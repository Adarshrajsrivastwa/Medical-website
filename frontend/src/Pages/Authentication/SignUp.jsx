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
import { Link } from "react-router-dom"; 

function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    otp: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false); // To show loading during OTP request

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }
    
    setLoading(true);
    try {
      const res = await fetch('/sign-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      if (!res.ok) {
        throw new Error("Failed to send OTP");
      }

      setShowModal(true); 
    } catch (error) {
      alert(error.message); 
    } finally {
      setLoading(false); 
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData);
    setShowModal(false); 
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form method="POST" onSubmit={handleSubmit} className="mb-52 flex flex-col items-center gap-5 shadow-md rounded-lg p-6 bg-white">
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
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
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
                      {[0, 1, 2].map((index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      {[3, 4, 5].map((index) => (
                        <InputOTPSlot key={index} index={index} />
                      ))}
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
