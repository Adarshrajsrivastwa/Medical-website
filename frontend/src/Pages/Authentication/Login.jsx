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
import { Link } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleOtpChange = (otpValue) => {
    setFormData((prevData) => ({
      ...prevData,
      otp: otpValue,
    }));
  };

  const handleSendOtp = () => {
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }
    console.log("OTP sent to:", formData.email);
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.otp.length < 6) {
      alert("Please enter the complete 6-digit OTP.");
      return;
    }
    console.log("Form submitted with data:", formData);
    setShowModal(false); // Close modal after submission
  };

  return (
    <div className="flex items-center justify-center h-[85vh] bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-5 shadow-md rounded-lg p-6 bg-white"
      >
        <h1 className="text-xl font-bold text-[#563393]">Login</h1>

        <div className="flex flex-col gap-1 w-80">
          <Label htmlFor="email" className="text-base font-normal">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your Email"
            value={formData.email}
            onChange={handleChange}
            required
            aria-label="Email input field"
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

        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#7f53cb] hover:underline">
              Sign up here
            </Link>
          </p>
        </div>

        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
          >
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-lg font-bold mb-4 text-[#563393]">Verify OTP</h2>

              <div>
                <Label htmlFor="otp" className="text-base font-normal">
                  Enter OTP
                </Label>
                <InputOTP maxLength={6} onChange={handleOtpChange}>
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

              <div className="flex items-center justify-end gap-3 mt-4">
                <Button
                  type="button"
                  onClick={() => setShowModal(false)}
                  variant="destructive"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="ours">
                  Submit
                </Button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Login;