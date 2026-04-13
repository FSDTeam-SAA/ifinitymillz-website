"use client";

import React, { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import authImage from "@../../../public/images/auth.png";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required");
      return;
    }

    try {
      setIsLoading(true);

      // Replace with your actual OTP sending API call
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to send OTP");
      }

      toast.success("OTP sent to your email!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send OTP";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-[#181715]">
      {/* Left Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          width={400}
          height={400}
          src={authImage}
          alt="Food distribution"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#F0C230] mb-2">
              Forgot Password?
            </h1>
            <p className="text-[#DDDDDD]">
              Enter your email and well send you an OTP to reset your password.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                required
              />
            </div>

            {/* Send OTP Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E9C349] hover:bg-[#E9C349]/90 text-white font-semibold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {isLoading ? "Sending OTP..." : "Send OTP"}
            </button>

            {/* Back to Sign In */}
            <div className="text-center text-sm text-[#C3C3C3]">
              Remember your password?{" "}
              <a
                href="/signin"
                className="text-[#F0C230] hover:text-[#F0C230]/80 font-semibold"
              >
                Sign In
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordForm;