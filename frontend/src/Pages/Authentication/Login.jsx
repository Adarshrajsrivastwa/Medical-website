import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/Components/ui/input-otp";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";

import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Button } from "@/Components/ui/button";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    role: "",
  });

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  // =========================
  // Handle Input Change
  // =========================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // =========================
  // Handle OTP Change
  // =========================
  const handleOtpChange = (otpValue) => {
    setFormData((prevData) => ({
      ...prevData,
      otp: otpValue,
    }));
  };

  // =========================
  // Send OTP
  // =========================
  const handleSendOtp = async () => {
    console.log("Send OTP clicked");
    console.log("Email:", formData.email);
    console.log("Role:", formData.role);
    console.log("Backend URL:", backendURL);

    // Check email
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }

    // Check role
    if (!formData.role) {
      alert("Please select your role!");
      return;
    }

    // Check backend URL
    if (!backendURL) {
      alert("Backend URL is not configured!");

      console.error(
        "VITE_BACKEND_URL is missing from environment variables."
      );

      return;
    }

    setLoading(true);

    try {
      console.log("Sending OTP request...");

      const response = await axios.post(
        `${backendURL}/sign/signin`,
        {
          email: formData.email,
          role: formData.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("OTP Response:", response.data);
      console.log("Status:", response.status);

      if (response.status === 200) {
        // Save email
        Cookies.set("email", formData.email, {
          expires: 1 / 24,
        });

        // Open OTP modal
        setShowModal(true);

        alert("OTP sent successfully!");
      }
    } catch (error) {
      console.error("Send OTP Error:", error);

      console.error(
        "Backend Response:",
        error.response?.data
      );

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to send OTP";

      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // Login / Verify OTP
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Login started");
    console.log("Form Data:", formData);

    // Check email
    if (!formData.email) {
      alert("Please enter your email!");
      return;
    }

    // Check role
    if (!formData.role) {
      alert("Please select your role!");
      return;
    }

    // Check OTP
    if (!formData.otp || formData.otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP!");
      return;
    }

    if (!backendURL) {
      alert("Backend URL is not configured!");
      return;
    }

    setLoginLoading(true);

    try {
      const response = await axios.post(
        `${backendURL}/sign/login`,
        {
          email: formData.email,
          otp: formData.otp,
          role: formData.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Response:", response.data);
      console.log("Login Status:", response.status);

      if (response.status === 200) {
        // =========================
        // Save User Information
        // =========================

        Cookies.set("city", response.data.city || "");
        Cookies.set("state", response.data.state || "");
        Cookies.set("country", response.data.country || "");

        Cookies.set("isLoggedIn", "true");
        Cookies.set("name", response.data.name || "");
        Cookies.set("role", formData.role);
        Cookies.set("email", formData.email);

        alert("OTP verified successfully!");

        // Close OTP modal
        setShowModal(false);

        // =========================
        // Role Based Navigation
        // =========================

        if (formData.role === "patient") {
          navigate("/patient-profile");
          window.location.reload();
        }

        else if (formData.role === "doctor") {
          navigate("/doctor-profile");
          window.location.reload();
        }

        else if (formData.role === "admin") {
          navigate("/doctor-management");
          window.location.reload();
        }

        else if (formData.role === "hospital") {
          navigate("/hospital-profile");
          window.location.reload();
        }
      }
    } catch (error) {
      console.error("Login Error:", error);

      console.error(
        "Backend Response:",
        error.response?.data
      );

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "OTP verification failed";

      alert(errorMessage);
    } finally {
      setLoginLoading(false);
    }
  };

  // =========================
  // Cancel OTP Modal
  // =========================
  const handleCancel = () => {
    setShowModal(false);

    setFormData((prevData) => ({
      ...prevData,
      otp: "",
    }));
  };

  return (
    <div className="flex items-center justify-center h-[89vh] bg-gray-100">

      {/* =========================
          Login Form
      ========================= */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center lg:gap-7 shadow-md rounded-xl lg:p-10 bg-white gap-5 p-6"
      >

        {/* Heading */}
        <h1 className="text-2xl font-bold text-[#563393]">
          Login
        </h1>

        {/* =========================
            Email
        ========================= */}

        <div className="flex flex-col lg:gap-2 lg:w-80">
          <Label
            htmlFor="email"
            className="text-base font-normal"
          >
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

        {/* =========================
            Role
        ========================= */}

        <div className="flex flex-col gap-1">
          <Label
            htmlFor="role"
            className="text-base font-normal"
          >
            Select Your Role
          </Label>

          <Select
            value={formData.role}
            onValueChange={(value) =>
              setFormData((prevData) => ({
                ...prevData,
                role: value,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Your Role" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="doctor">
                Doctor
              </SelectItem>

              <SelectItem value="patient">
                Patient
              </SelectItem>

              <SelectItem value="hospital">
                Hospital
              </SelectItem>

              <SelectItem value="admin">
                Admin
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* =========================
            Send OTP Button
        ========================= */}

        <Button
          type="button"
          onClick={handleSendOtp}
          className="w-40"
          variant="ours"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send OTP"}
        </Button>

        {/* =========================
            Signup Link
        ========================= */}

        <div className="mt-4 text-sm">
          <p>
            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-[#7f53cb] hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </div>

        {/* =========================
            OTP Modal
        ========================= */}

        {showModal && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
            aria-modal="true"
            role="dialog"
          >

            <div className="bg-white lg:p-10 rounded-lg shadow-md lg:w-96 p-5">

              {/* Modal Heading */}

              <h2 className="lg:text-xl text-lg font-bold lg:mb-4 text-[#563393] mb-3">
                Verify OTP
              </h2>

              {/* OTP */}

              <div>
                <Label
                  htmlFor="otp"
                  className="text-base font-normal"
                >
                  Enter OTP
                </Label>

                <InputOTP
                  maxLength={6}
                  value={formData.otp}
                  onChange={handleOtpChange}
                  required
                >

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

              {/* Buttons */}

              <div className="flex items-center justify-end lg:gap-4 mt-4 gap-2">

                {/* Cancel */}

                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="destructive"
                  disabled={loginLoading}
                >
                  Cancel
                </Button>

                {/* Submit */}

                <Button
                  type="submit"
                  variant="ours"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Verifying..." : "Submit"}
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