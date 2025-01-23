import React, { useState } from "react";
// import { useHistory } from 'react-router-dom';
// const history = useHistory();
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
      const res = await fetch("http://localhost:3000/sign/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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

  const handleSubmit =async (e) => {
    console.log(formData.otp);
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/sign/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });


      if (!res.ok) {
        alert("otp wrong");
      }
    } catch (error) {
      alert(error.message);
  };
}

  return (
    <div className="flex items-center justify-center h-[89vh] bg-teal-400">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center lg:gap-7 shadow-md rounded-xl lg:p-10 bg-white gap-5 p-6"
      >
        <h1 className="text-2xl font-bold text-[#563393]">Sign Up</h1>

        <div className="flex flex-col lg:gap-2 lg:w-80">
          <Label htmlFor="email" className="text-base font-normal">
            Email
          </Label>
          <Input
            type="email"
            placeholder="Enter your Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
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
            <div className="bg-white lg:p-10 rounded-lg shadow-md lg:w-96 p-5">
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
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="otp" className="text-base font-normal">
                    Enter OTP
                  </Label>
                  <div className="flex gap-2">
                    {[...Array(6)].map((_, index) => (
                      <input
                        key={index}
                        type="text"
                        maxLength={1}
                        value={formData.otp[index] || ""}
                        onChange={(e) => {
                          const otpArray = formData.otp.split("");
                          otpArray[index] = e.target.value;
                          setFormData((prevData) => ({
                            ...prevData,
                            otp: otpArray.join(""),
                          }));
                        }}
                        className="otp-slot border rounded w-10 h-10 text-center text-lg"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="role" className="text-base font-normal">
                    Select Your Role
                  </Label>
                  <Select
                    required
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

              <div className="flex items-center justify-end lg:gap-4 mt-4 gap-2">
                <Button
                  type="button"
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