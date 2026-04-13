"use client";
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import authImage from "@../../../public/images/auth.png";

function ChangePasswordForm() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      setIsLoading(true);
      // Replace with your actual change password API call
      console.log("Password changed successfully");
      toast.success("Password changed successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to change password";
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
          alt="Change password"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-8 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-[#F0C230] mb-2">Change Password</h1>
            <p className="text-[#DDDDDD]">
              Set a new password for your account.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Create New Password */}
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Create New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm New Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Change Password Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E9C349] hover:bg-[#E9C349]/90 text-white font-semibold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>

            {/* Back to Sign In */}
            <div className="text-center text-sm text-[#C3C3C3]">
              Remember your password?{" "}
              <a
                href="/sign-in"
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

export default ChangePasswordForm;