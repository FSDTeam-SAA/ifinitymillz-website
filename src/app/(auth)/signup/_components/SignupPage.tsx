"use client";

import React, { useState, FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import authImage from "@../../../public/images/auth.png";

function SignUpForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!agreeTerms) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }

    try {
      setIsLoading(true);

      // Replace with your actual registration API call
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Account created successfully!");
      router.push("/sign-in");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
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
            <h1 className="text-4xl font-bold text-[#F0C230] mb-2">Create Account</h1>
            <p className="text-[#DDDDDD]">
              Sign up to get started today.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                  required
                />
              </div>
            </div>

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
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="hello@example.com"
                className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                required
              />
            </div>

            {/* Phone Field */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Phone Number <span className="text-[#888]">(optional)</span>
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="+880 1234 567890"
                className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 !rounded-[8px] focus:outline-none focus:ring-2 focus:ring-[#F0C230] focus:border-transparent transition-all bg-[#414141] text-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-white" />
                  ) : (
                    <Eye className="w-5 h-5 text-white" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-[#C3C3C3] mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({ ...formData, confirmPassword: e.target.value })
                  }
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

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 text-[#F0C230] border-gray-300 rounded focus:ring-[#F0C230] cursor-pointer"
              />
              <label htmlFor="terms" className="text-sm text-[#C3C3C3] cursor-pointer">
                I agree to the{" "}
                <a href="#" className="text-[#F0C230] hover:text-[#F0C230]/80 font-medium">
                  Terms & Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-[#F0C230] hover:text-[#F0C230]/80 font-medium">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#E9C349] hover:bg-[#E9C349]/90 text-white font-semibold py-3 rounded-lg transition-colors shadow-md disabled:opacity-70"
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            {/* Sign In Link */}
            <div className="text-center text-sm text-[#C3C3C3]">
              Already have an account?{" "}
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

export default SignUpForm;